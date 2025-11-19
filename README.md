## Hatx Service

TypeScript wrapper for the Hatx REST API (`/v1`).

### Installation

From a private GitHub repo:

```bash
pnpm add git+ssh://git@github.com:igen-info/igen-hatx-ts.git
```

The `prepare` script runs the build automatically on install. If you clone manually, run `pnpm install && pnpm build`.

### Usage

```ts
import { HatxService } from "@igen/hatx";

const hatx = new HatxService({
    baseURL: "https://api.example.com",
});

const beads = await hatx.getBeadByAllele("A*01:01");
```

See `src/hatx-service.ts` for the full list of available methods.
