# Copilot Instructions for islombek-bakery-divider

## Project Overview
This is a React + TypeScript + Vite monorepo for a bakery management tablet app. The codebase is modular, with clear separation between UI components, business logic, API integrations, and utility functions. TailwindCSS is used for styling, and Vite handles builds and HMR.

## Key Architectural Patterns
- **Component Structure:**
  - UI components are in `src/components/ui/` (e.g., `button.tsx`, `input.tsx`).
  - Common, reusable logic is in `src/components/common/`.
  - Page-level UI and logic are in `src/page-ui/` (e.g., `parkash-home/`, `profile/`).
- **App Structure:**
  - Feature modules are under `src/app/` (e.g., `auth/`, `home/`, `notification/`).
  - Each feature typically has its own types, API calls, and UI.
- **API Integration:**
  - All API logic is centralized in `src/integration/api/`.
  - Each API domain (e.g., `authApi`, `bakeryApi`) has its own folder with `index.ts`, `types.d.ts`, and endpoint/path definitions.
  - Cross-feature data flows use Redux slices in `src/integration/slice/`.
- **Utilities:**
  - Shared utilities are in `src/utils/` (e.g., `money-formatter.ts`, `socket.ts`).
  - Offline and storage logic is in `src/utils/offline/` and `src/utils/storage/`.

## Developer Workflows
- **Build:**
  - Use `npm run build` for production builds.
  - Use `npm run dev` for local development with HMR.
- **Linting:**
  - ESLint config is in `eslint.config.js`. Type-aware linting is recommended (see README for details).
- **Styling:**
  - Tailwind config is in `tailwind.config.js`.
  - Use utility classes in JSX; avoid custom CSS unless necessary.
- **TypeScript:**
  - Multiple tsconfig files: `tsconfig.app.json` (app), `tsconfig.node.json` (node), `tsconfig.json` (base).

## Project-Specific Conventions
- **API Pattern:**
  - Each API domain uses a consistent pattern: `index.ts` for main logic, `types.d.ts` for types, and `paths.ts`/`path.ts` for endpoint definitions.
- **Component Exports:**
  - Use `index.ts` files for barrel exports in component and feature folders.
- **Redux Usage:**
  - Slices are in `src/integration/slice/` (e.g., `employeeSlice.ts`).
- **File Naming:**
  - Use kebab-case for folders, PascalCase for React components, and camelCase for functions/variables.

## Integration Points
- **External APIs:**
  - All external communication is abstracted via the API integration layer.
- **Assets:**
  - Static assets are in `public/`.
- **Service Workers:**
  - Offline support via `public/sw.js` and related utils.

## Example Patterns
- To add a new API domain, copy the structure from an existing domain in `src/integration/api/`.
- To add a new page, create a folder in `src/page-ui/` and follow the pattern in `parkash-home/` or `profile/`.
- For new UI components, add to `src/components/ui/` and export via `index.ts`.

---

If any section is unclear or missing, please provide feedback for further refinement.
