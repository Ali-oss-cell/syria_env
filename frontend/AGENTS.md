<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

## Project rules

- Avoid introducing `undefined` as an intentional domain value in app state, API payloads, and component props.
- Prefer explicit defaults or `null` for empty values.
- Keep SSR/client first render deterministic for client components (avoid browser-dependent values during initial render to prevent hydration mismatch warnings).
<!-- END:nextjs-agent-rules -->
