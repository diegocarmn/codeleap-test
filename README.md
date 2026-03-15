<h1 class="flex ">
  <img src="./public/favicon.svg" width="28" style="vertical-align: -4px; margin-right:8px;" />
  CodeLeap Network — Frontend Challenge
</h1>

<p>
  <img src="https://img.shields.io/badge/Next.js-16-black" />
  <img src="https://img.shields.io/badge/React-19-149eca" />
  <img src="https://img.shields.io/badge/TypeScript-Strict-blue" />
  <img src="https://img.shields.io/badge/Tailwind-v4-38bdf8" />
  <img src="https://img.shields.io/badge/ReactQuery-TanStack-ff4154" />
</p>

Frontend application built as part of the CodeLeap engineering challenge.

The project implements a small social feed where users can create, edit, and delete posts, with infinite scrolling and smooth UI interactions, consuming CodeLeap's public API.

🔗 **Live:** https://codeleap-test-diegocarmona.vercel.app/  
📂 **Repository:** https://github.com/diegocarmn/codeleap-test

## 📖 Overview

This project was built with focus on:

- **Component-driven architecture** with clear separation of concerns
- **Server-state management** using React Query (queries, mutations, cache)
- **Infinite scrolling feed** with IntersectionObserver
- **Reusable UI components** for buttons, modals, and animations
- **Type-safe API integration** with TypeScript
- **Responsive design** following the provided Figma layout


## 📸 Preview

<p align="center">
  <img src="./public/screenshot.png" width="1000"/>
</p>

  _Desktop screen layout. Following the <a href="https://www.figma.com/design/0OQWLQmU14SF2cDhHPJ2sx/CodeLeap-Engineering-Test?node-id=29005-195&t=mU3fFudikiGZBk93-0">provided Figma design.</a>_


## ✨ Features

- **Local username authentication** with login/logout persisted in localStorage
- **Post creation** with title and content
- **Post feed sorted by newest first**
- **Infinite scroll** powered by IntersectionObserver
- **Post editing and deletion** restricted to the post owner
- **Expandable post cards** with smooth *Read more / Read less* interaction
- **Loading and error states** with visual feedback
- **Motion-based UI animations** for smoother interactions
- **Responsive layout** for mobile and desktop

## 🧰 Tech Stack

### Core

- Next.js 16 (App Router)
- React 19
- TypeScript (strict mode)

### Data and State

- @tanstack/react-query for caching, mutations, and invalidation
- Fetch API for HTTP integration with CodeLeap endpoint

### UI and Styling

- Tailwind CSS v4
- Motion (motion/react) for declarative animations
- next/font for optimized font loading

### Quality

- ESLint with Next.js Core Web Vitals + TypeScript configuration

## 📈 Architecture and Decisions

### 1) Separation of concerns

- app/lib/api: API communication layer
- app/hooks: data hooks (queries and mutations)
- app/features: domain-level rules and UI (auth and posts)
- app/components: reusable base components (Button, Modal, Animate)

### 2) Remote state with React Query

- useInfiniteQuery for post pagination
- useMutation for create, update, and delete
- invalidateQueries on success to keep feed consistency

### 3) User experience

- Username persisted locally to avoid repeated login
- Infinite scroll with visual prefetch at the bottom of the list
- Sensitive actions protected by confirmation modals
- Smooth Read more/less animation for long content

### 4) Scalability

Structure prepared for future evolution, for example:

- feed filters
- profile page
- real authentication (token/session)
- automated tests

## 📁 Project Structure

```text
app/
├── components/
│   ├── Animate.tsx               # Reusable animation wrapper variants
│   ├── Button.tsx                # Reusable button component
│   ├── IconButton.tsx            # Icon-only button component
│   └── Modal.tsx                 # Portal-based modal with backdrop and ESC close
├── features/
│   ├── auth/
│   │   └── UsernameModal.tsx     # Username entry modal (local auth)
│   └── posts/
│       ├── CreatePostForm.tsx    # New post form
│       ├── DeletePostModal.tsx   # Delete confirmation modal
│       ├── EditPostModal.tsx     # Post editing modal
│       ├── PostCard.tsx          # Post item with owner actions and read more/less
│       └── PostList.tsx          # Feed rendering with infinite scroll trigger
├── hooks/
│   ├── useCreatePost.ts          # Create mutation + cache invalidation
│   ├── useDeletePost.ts          # Delete mutation + cache invalidation
│   ├── usePosts.ts               # Infinite query and feed normalization
│   └── useUpdatePost.ts          # Update mutation + cache invalidation
├── lib/
│   └── api/
│       └── posts.ts              # API client functions for posts endpoints
├── providers/
│   └── ReactQueryProvider.tsx    # QueryClient provider wrapper
├── types/
│   └── post.ts                   # Post and payload TypeScript types
├── globals.css                   # Theme tokens and utility styles
├── layout.tsx                    # Root layout, metadata, fonts, providers
└── page.tsx                      # Main page composition and username session flow
public/
├── bx_bx-edit.svg                # Edit action icon
├── favicon.svg                   # App favicon
├── delete.svg                    # Delete action icon
├── logout.svg                    # Logout icon
└── refresh.svg                   # Loading spinner icon
eslint.config.mjs                 # ESLint configuration (Next.js + TypeScript)
next.config.ts                    # Next.js runtime configuration
package.json                      # Scripts and dependencies
postcss.config.mjs                # PostCSS setup
tsconfig.json                     # TypeScript compiler configuration
```

## 🔌 API Integration

Base URL:

```text
https://dev.codeleap.co.uk/careers/
```

Implemented operations:

- GET paginated posts
- POST new post
- PATCH existing post
- DELETE post

## 💻 Local Development

### Requirements

- Node.js 18+
- npm 9+

### Installation

```bash
git clone https://github.com/diegocarmn/codeleap-test.git
cd codeleap-test
npm install
```

### Development

```bash
npm run dev
```

Application runs at:

```text
http://localhost:3000
```

### Production Build

```bash
npm run build
npm run start
```

### Lint

```bash
npm run lint
```

## ⚙️ Scripts

- npm run dev: starts development environment
- npm run build: creates production build
- npm run start: runs the production build
- npm run lint: runs ESLint checks

## ♿ Accessibility and UX

- Form fields with associated labels
- Modals that close on ESC and backdrop click
- Loading and error states with visual feedback
- Layout with clear readability and information hierarchy

## 🚀 Deployment

<a href="https://codeleap-test-diegocarmona.vercel.app/">Deployed on Vercel</a> with automatic deployments from GitHub:

```bash
# Push to main branch triggers deployment
git push origin main
```

**Benefits:**

- Zero-config deployment
- Automatic SSL
- Edge caching

## 🔮 Future Improvements

- Add tests (unit, integration, and E2E)
- Add toast notifications for mutation success/error
- Improve error handling by failure type (network, timeout, API)
- Implement internationalization
- Improve accessibility coverage (focus trap and keyboard navigation in modals)

## 👤 Author

Diego Carmona - Software Developer

- Portfolio: https://diegocarmona.me/
- GitHub: https://github.com/diegocarmn
- LinkedIn: https://linkedin.com/in/diegocarmn

## 📄 License

This project was developed for technical evaluation purposes.
