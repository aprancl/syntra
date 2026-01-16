Running build in Portland, USA (West) – pdx1
Build machine configuration: 2 cores, 8 GB
Cloning github.com/aprancl/syntra (Branch: main, Commit: a64267f)
Previous build caches not available.
Cloning completed: 632.000ms
Running "vercel build"
Vercel CLI 50.1.6
Installing dependencies...

> syntra@0.1.0 postinstall
> prisma generate
> Prisma schema loaded from prisma/schema.prisma
> ✔ Generated Prisma Client (v5.22.0) to ./node_modules/@prisma/client in 30ms
> Start by importing your Prisma Client (See: https://pris.ly/d/importing-client)
> Tip: Easily identify and fix slow SQL queries in your app. Optimize helps you enhance your visibility: https://pris.ly/--optimize
> syntra@0.1.0 prepare
> husky
> added 499 packages in 17s

180 packages are looking for funding
run `npm fund` for details
Detected Next.js version: 16.1.1
Running "npm run build"

> syntra@0.1.0 build
> prisma generate && next build
> Prisma schema loaded from prisma/schema.prisma
> ✔ Generated Prisma Client (v5.22.0) to ./node_modules/@prisma/client in 32ms
> Start by importing your Prisma Client (See: https://pris.ly/d/importing-client)
> Tip: Easily identify and fix slow SQL queries in your app. Optimize helps you enhance your visibility: https://pris.ly/--optimize

┌─────────────────────────────────────────────────────────┐
│ Update available 5.22.0 -> 7.2.0 │
│ │
│ This is a major update - please follow the guide at │
│ https://pris.ly/d/major-version-upgrade │
│ │
│ Run the following to update │
│ npm i --save-dev prisma@latest │
│ npm i @prisma/client@latest │
└─────────────────────────────────────────────────────────┘
Attention: Next.js now collects completely anonymous telemetry regarding usage.
This information is used to shape Next.js' roadmap and prioritize features.
You can learn more, including how to opt-out if you'd not like to participate in this anonymous program, by visiting the following URL:
https://nextjs.org/telemetry
▲ Next.js 16.1.1 (Turbopack)

Creating an optimized production build ...
✓ Compiled successfully in 11.5s
Running TypeScript ...
Collecting page data using 1 worker ...
Generating static pages using 1 worker (0/6) ...
Error occurred prerendering page "/\_not-found". Read more: https://nextjs.org/docs/messages/prerender-error
Error: @clerk/clerk-react: Missing publishableKey. You can get your key at https://dashboard.clerk.com/last-active?path=api-keys.
at ignore-listed frames {
digest: '2700826859'
}
Export encountered an error on /\_not-found/page: /\_not-found, exiting the build.
⨯ Next.js build worker exited with code: 1 and signal: null
Error: Command "npm run build" exited with 1
