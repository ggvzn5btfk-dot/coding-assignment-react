# Dog Breed Swipe App

A dog breed discovery app with swipeable cards and detailed breed information.

## Setup

1. Install dependencies:
```bash
pnpm install
```

2. Start development server:
```bash
pnpm dev
```

## Scripts

- `pnpm dev` - Start dev server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build locally
- `pnpm test` - Run tests

## Tech Stack

- **React 19** + **TypeScript** - Main framework
- **TanStack Router** - Type-safe file-based routing
- **TanStack Query** - Server state management
- **Tailwind CSS** - Styling
- **@dnd-kit/core** - Drag and drop for swipe functionality
- **Vite** - Build tool

## Why These Libraries?

- **TanStack Router** - Better TypeScript support
- **TanStack Query** - Handles API fetching and loading, error states automatically
- **@dnd-kit** - Mobile touch support
- **Tailwind** - Faster styling with utility classes

## Project Structure

```
src/
├── assets/          # Static assets (images, icons)
├── components/      # UI components (BreedCard, StatCard, Tag)
├── hooks/           # Custom hooks for data fetching
├── routes/          # File-based pages
├── services/        # API calls
├── types/           # TypeScript definitions
├── utils.ts         # Utility functions
└── constants.ts     # App constants
...
```
