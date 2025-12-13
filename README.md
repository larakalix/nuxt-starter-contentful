# NUXT-CT-STARTER

A production-ready **monorepo starter** built with **Turborepo + pnpm**, designed for CMS-driven applications using **Nuxt**, **Astro**, and **Storybook**, with shared UI and configuration packages.

This repository is structured for **scalability**, **clean separation of concerns**, and **smooth CI/CD on Vercel**.

---

## ✨ What’s Included

- **Nuxt app** – primary web application
- **Astro app** – static / content-focused site
- **Storybook app** – UI development and documentation
- **Shared packages**
  - UI components
  - Content models (Contentful-ready)
  - ESLint config
  - Tailwind config
  - TypeScript config
- **Turborepo** for task orchestration and caching
- **pnpm workspaces** for fast, deterministic installs

---

## 📁 Repository Structure

├── apps/
│ ├── nuxt/ # Nuxt application
│ ├── astro/ # Astro application
│ └── sb/ # Storybook application
│
├── packages/
│ ├── ui/ # Shared UI components
│ ├── content/ # Content models / CMS types
│ ├── eslint-config/ # Shared ESLint configuration
│ ├── tailwind-config/ # Shared Tailwind configuration
│ └── tsconfig/ # Shared TypeScript configs
│
├── turbo.json
├── pnpm-workspace.yaml
├── pnpm-lock.yaml
├── package.json
└── README.md

---

## ⚙️ Requirements

- **Node.js**: `22.x` (recommended and tested)
- **pnpm**: `10.x`

This project uses **Corepack** to manage pnpm versions.

---

## 🚀 Getting Started

### Install dependencies

From the repository root:

```bash
corepack enable
pnpm install
```

