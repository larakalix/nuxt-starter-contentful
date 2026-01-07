import { HttpStatus } from '@nestjs/common';

export const ERRORS = {
  postgres: {
    // Exclusion constraint (overlapping time ranges)
    '23P01': {
      no_overlapping_availability_blocks: {
        statusCode: HttpStatus.CONFLICT,
        error: 'BOOKING_CONFLICT',
        message:
          'The selected date and time are no longer available. Please choose a different time or try again later.',
        event: 'DB_AVAILABILITY_CONFLICT',
      },
      default: {
        statusCode: HttpStatus.CONFLICT,
        error: 'EXCLUSION_VIOLATION',
        message:
          'The operation violates an exclusion constraint. Please check your input or try again later.',
        event: 'DB_EXCLUSION_VIOLATION',
      },
    },

    // Unique constraint
    '23505': {
      default: {
        statusCode: HttpStatus.CONFLICT,
        error: 'DUPLICATE_RESOURCE',
        message: 'This resource already exists.',
        event: 'DB_UNIQUE_VIOLATION',
      },
    },

    // Foreign key
    '23503': {
      default: {
        statusCode: HttpStatus.BAD_REQUEST,
        error: 'FOREIGN_KEY_VIOLATION',
        message: 'Invalid reference.',
        event: 'DB_FOREIGN_KEY_VIOLATION',
      },
    },
  },
} as const;
