// Exports router modules for serverless env that doesn't support the dynamic import.
// This module will be updated automaticlly in develoment mode, do NOT edit it manually.

import * as $0 from "./_404.tsx";
import * as $1 from "./_app.tsx";
import * as $2 from "./index.tsx";
import * as $3 from "./old/index-orig.tsx";
import * as $4 from "./new/index.tsx";

export default {
  "/_404": $0,
  "/_app": $1,
  "/": $2,
  "/old/index-orig": $3,
  "/new/index": $4,
};
