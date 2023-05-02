/// <reference no-default-lib="true" />

import { start } from '$fresh/server.ts';
import manifest from './fresh.gen.ts';

import twindPlugin from '$fresh/plugins/twind.ts';
import twindConfig from './tailwind.config.ts';

await start(manifest, { plugins: [twindPlugin(twindConfig)] });
