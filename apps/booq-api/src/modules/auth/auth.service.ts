import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcryptjs';
import { envConfig } from './../../config/env.config';
import { RegisterDto, RegisterInTenantDto } from './dto/register.dto';
import { DrizzleDB } from 'src/db/types/drizzle';
import { DRIZZLE } from 'src/db/drizzle.module';
import { users } from 'src/db/schema/schema';
import { generateSlug } from 'src/utils/string.utils';
import { TenantsService } from 'src/modules/tenants/tenants.service';
import { UsersService } from '../users/users.service';
import { Role } from './types/auth.types';

@Injectable()
export class AuthService {
  constructor(
    @Inject(DRIZZLE) private db: DrizzleDB,
    private readonly jwtService: JwtService,
    private readonly tenantService: TenantsService,
    private readonly userService: UsersService,
  ) {}

  async login(
    email: string,
    password: string,
  ): Promise<{ accessToken: string } | null> {
    const [user] = await this.userService.findByEmail(email);
    const passwordMatch = await compare(password, `${user.passwordHash}`);

    if (!user || !passwordMatch)
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);

    const payload = {
      sub: user.id,
      email: user.email,
      tenantId: user.tenantId,
      role: user.role ?? 'user',
    } as const;

    return {
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: envConfig.jwtExpiresIn,
        secret: envConfig.jwtSecret,
        algorithm: 'HS256',
      }),
    };
  }

  async register({ email, password, name, tenant }: RegisterDto) {
    const [newTenant, newUser] = await this.db.transaction(async (tx) => {
      const slug = generateSlug(tenant.name);
      const existingTenant = await this.tenantService.findBySlug(slug, tx);
      const existingUser = await this.userService.findByEmail(email, tx);

      if (existingTenant) {
        throw new HttpException(
          'A tenant with this name already exists',
          HttpStatus.CONFLICT,
        );
      }

      if (existingUser.length > 0)
        throw new HttpException(
          'User with this email already exists',
          HttpStatus.BAD_REQUEST,
        );

      const [tx_tenant] = await this.tenantService.create({
        name: tenant.name,
        slug,
        country: tenant.country || 'US',
        domain: '',
        email,
        timeZone: 'America/New_York',
      });

      if (!tx_tenant)
        throw new HttpException(
          'Failed to create tenant',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );

      const hashedPassword = await hash(password, 10);
      const user = {
        email,
        name,
        password_hash: hashedPassword,
        role: 'admin' as Role,
        tenantId: tx_tenant.id,
      };

      const [tx_user] = await tx.insert(users).values(user).returning({
        id: users.id,
        email: users.email,
        name: users.name,
        role: users.role,
        tenantId: users.tenantId,
      });

      return [tx_tenant, tx_user];
    });

    return {
      ...newUser,
      tenant: newTenant,
    };
  }

  async registerInTenant({
    email,
    password,
    name,
    tenantId,
  }: RegisterInTenantDto) {
    if (!tenantId) {
      throw new HttpException('Tenant ID is required', HttpStatus.BAD_REQUEST);
    }

    const [newUser] = await this.db.transaction(async (tx) => {
      const existingTenant = await this.tenantService.findBySlug(tenantId, tx);

      if (existingTenant) {
        throw new HttpException(
          'A tenant with this name already exists',
          HttpStatus.CONFLICT,
        );
      }

      const existingUser = await this.userService.findByEmail(email, tx);

      if (existingUser.length > 0)
        throw new HttpException(
          'User with this email already exists',
          HttpStatus.BAD_REQUEST,
        );

      const passwordHash = await hash(password, 10);
      const [user] = await tx
        .insert(users)
        .values({
          email,
          name,
          passwordHash,
          role: 'admin',
          tenantId,
        })
        .returning({
          id: users.id,
          email: users.email,
          name: users.name,
          role: users.role,
          tenantId: users.tenantId,
        });

      if (!user) {
        throw new HttpException(
          'Failed to create user',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      return [user];
    });

    return {
      ...newUser,
    };
  }
}
