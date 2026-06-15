# trippie-shared

The single source of shared TypeScript domain types and API contracts (DTOs)
for **Trippie**, a vacation planner / manager web app. It is consumed by both
sides of the stack:

- **`trippie-api`** — Node.js Lambda backend (AWS serverless)
- **`trippie-web`** — React + Vite frontend

Keeping the domain model and the request/response shapes in one place means the
API and the web app cannot drift out of sync: a contract change is a single PR
here, then a version bump in each consumer.

This package ships **types only** — there are no runtime values, so importing it
adds nothing to your bundle. It compiles to ESM JavaScript plus `.d.ts`
declaration files.

## What's inside

- **Domain types**: `User`, `Trip`, `Segment` (a discriminated union keyed on
  `type`), `FlightTripSegment`, `FlightSegment` (booking record),
  `FlightEnrichment` (separately-refreshed live flight data).
- **Unions**: `SegmentType`, `TripStatus`, `FlightStatus`.
- **API DTOs**: create trip, list trips (split upcoming / past), get trip
  detail, add flight segment — each with request and response shapes.

See `src/index.ts` for the full export surface.

## Installing in a consumer

This package is **not published to npm**. Consumers install it as a versioned
GitHub dependency, pinned to a release tag:

```bash
npm i github:NextWebApps/trippie-shared#v0.1.0
```

This adds the following to the consumer's `package.json`:

```json
{
  "dependencies": {
    "trippie-shared": "github:NextWebApps/trippie-shared#v0.1.0"
  }
}
```

On install, npm runs this package's `prepare` script, which runs `npm run build`
(`tsc`) to produce `dist/`. That means the consumer always gets freshly compiled
`.js` + `.d.ts` straight from the git checkout — no committed build artifacts
required (`dist/` is gitignored).

### Using it

```ts
import type { Trip, CreateTripRequest, FlightStatus } from "trippie-shared";
```

## Developing

```bash
npm install   # installs typescript (and runs prepare -> build)
npm run build # compile src/ -> dist/ with declarations
```

`tsconfig.json` is strict, targets ES2022, and uses `NodeNext` module
resolution. The build must complete with zero TypeScript errors.

## Releasing a new version

Consumers pin to a git tag, so cutting a release is: bump the version, tag it,
push the tag.

1. Make your type/contract changes on a branch and merge to `main`.
2. Bump the version in `package.json` following semver:
   - **patch** — additive/clarifying, no breaking change to existing shapes
   - **minor** — new types or optional fields
   - **major** — breaking change to an existing type or DTO
   ```bash
   npm version 0.2.0 --no-git-tag-version
   ```
3. Commit the bump, then tag it `vX.Y.Z` (the tag is what consumers reference):
   ```bash
   git commit -am "Release v0.2.0"
   git tag v0.2.0
   git push origin main --tags
   ```
4. In each consumer (`trippie-api`, `trippie-web`), bump the dependency ref:
   ```bash
   npm i github:NextWebApps/trippie-shared#v0.2.0
   ```

> Tip: keep the `package.json` `version` and the git tag in lockstep
> (`0.2.0` ⇄ `v0.2.0`) so it's obvious which commit a consumer is pinned to.
