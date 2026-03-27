import { configureAllowedScripts } from '@ministryofjustice/hmpps-npm-script-allowlist'

export default configureAllowedScripts({
   allowlist: {
   // Needed by esbuild for watching files during development
   "node_modules/@parcel/watcher@2.5.6": "ALLOW",
   // Optional native DTrace bindings; fails gracefully; transitive dependency of Cypress; required for E2E tests.
   "node_modules/dtrace-provider@0.8.8": "ALLOW",
   // Direct devDependency — the project's primary JavaScript/TypeScript bundler (see esbuild/ directory). Install script downloads the correct pre-compiled platform binary from the official esbuild release.
   "node_modules/esbuild@0.27.4": "ALLOW",
   // macOS native file events; standard transitive dependency.
   "node_modules/fsevents@2.3.3": "ALLOW",
   // Protocol Buffers runtime library. Transitive dependency of '@aws-sdk/client-sqs' or 'applicationinsights'. Install script fetches minimal native components — a widely used, reputable package.
   "node_modules/protobufjs@7.5.4": "ALLOW",
   // Rust-based Node.js module resolver. Transitive dependency of 'eslint-import-resolver-typescript'. Install script downloads pre-compiled Rust binaries for the target platform — no source compilation or network requests beyond the official release assets.
   "node_modules/unrs-resolver@1.11.1": "ALLOW"
   },
})
