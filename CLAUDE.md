# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Install dependencies
pnpm install

# Start development server (localhost:3000)
pnpm run dev

# Build for production
pnpm run build

# Preview production build locally
pnpm run preview

# Generate static site
pnpm run generate

# Test production build
pnpm build && node .output/server/index.mjs

# Pre-warm Redis cache (run before deploy or after Storyblok content changes)
pnpm sb:cache:all
```

## Architecture Overview

This is a **Nuxt 3** personal website with **Storyblok CMS** integration, featuring:

- **Content Management**: Storyblok headless CMS for dynamic content (journals, works/projects)
- **Internationalization**: English (`en`) and Indonesian (`id`) locales with `id` as default
- **State Management**: Pinia stores for Storyblok content versioning and toast notifications
- **UI Components**: Nuxt UI v4 (`@nuxt/ui`) for buttons, inputs, and interactive elements
- **Styling**: Tailwind CSS with custom main.css, Google Fonts (Roboto, Open Sans)
- **SEO**: Comprehensive meta tags, structured data (Person schema), sitemap generation
- **Image Optimization**: Nuxt Image with Storyblok integration

## Key Technical Patterns

### Storyblok Integration
- **All content fetching goes through cached server API routes** (`server/api/storyblok/`), never direct Storyblok SDK calls at runtime
- Server routes use Redis-first strategy (Upstash Redis) with Storyblok API as fallback
- Cache is pre-warmed via scripts: `pnpm sb:cache:all` (runs `sb:cache`, `sb:cache:works`, `sb:cache:posts`)
- Content version (cv) cached in Redis, initialized by `plugins/init.server.ts`
- Redis key prefix: `com_yudhawijaya:storyblok:cache`
- Storyblok access token configured via `NUXT_STORYBLOK_ACCESS_TOKEN` environment variable
- Images served from `https://a.storyblok.com` domain

### File Structure Conventions
- **Components**: Organized by feature/type (e.g., `Card/`, `Navigation/`, `Works/`)
- **Pages**: File-based routing with dynamic `[slug].vue` routes for CMS content
- **Stores**: Pinia stores in `stores/` directory with auto-imports enabled
- **Utils**: Shared constants, types, and helpers in `utils/` directory

### Content Architecture
- **Journal entries**: Accessible at `/jurnal/[slug]` (ID) and `/en/journals/[slug]` (EN)
- **Work/project pages**: Accessible at `/karya/[slug]` (ID) and `/en/works/[slug]` (EN)
- **Static pages**: Contact (`/kontak`, `/en/contact`), home pages

### Environment Configuration
- `NUXT_PUBLIC_BASE_URL`: Site base URL for SEO and i18n
- `NUXT_PUBLIC_APP_NAME`: Application name used in meta tags
- `NUXT_STORYBLOK_ACCESS_TOKEN`: Storyblok API access token
- `UPSTASH_REDIS_REST_URL`: Upstash Redis REST endpoint for content caching
- `UPSTASH_REDIS_REST_TOKEN`: Upstash Redis auth token

## Important Development Guidelines

### Core Principles
- Do what has been asked; nothing more, nothing less
- NEVER create files unless absolutely necessary for achieving your goal
- ALWAYS prefer editing an existing file to creating a new one
- NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User

### Code Quality Guidelines

#### File Size Limits
- **Maximum lines per file: 300 lines**
- Files exceeding 300 lines should be refactored into smaller components or composables
- Use Vue 3 composables pattern for reusable logic
- Split large components into focused sub-components

#### Component Organization
- Keep components focused on a single responsibility
- Use descriptive names for components and files
- Organize related components in dedicated folders
- Extract reusable logic into composables (`composables/` directory)

#### Refactoring Guidelines
- When a Vue component exceeds 300 lines:
  1. Extract composables for business logic
  2. Split template into smaller components
  3. Move related components to organized subfolders
  4. Keep the main components folder clean and well-structured

### Code Style (from `.cursor/rules/`)
- **Code Style**: Use TypeScript throughout, Composition API with `<script setup>`, avoid Options API
- **Naming**: PascalCase for components, camelCase for composables, lowercase-with-dashes for directories
- **Architecture**: Prefer types over interfaces, avoid enums (use const objects), leverage auto-imports
- **UI**: Nuxt UI v4 (`@nuxt/ui`) for interactive components (buttons, inputs, etc.). Use `UButton` instead of hand-styled `<button>`/`<a>`/`<NuxtLink>` for actions. Use `color="neutral"` for primary buttons, `variant="outline"` for secondary. Mobile-first Tailwind CSS for layout and custom styling. Optimize for Web Vitals
- **Data Fetching**: Use `useFetch`/`useAsyncData` with internal `/api/storyblok/` routes for CMS content. Never call `useStoryblokApi()` directly in components — always go through the cached server API routes

## Robots Configuration
- Blocks AI bots and non-SEO bots (`robots.blockAiBots: true`)
- Sitemap generated at `/sitemap.xml` with dynamic content from `/api/__sitemap__/urls`