/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly PUBLIC_WEBSOCKET_URL: string;
  readonly PUBLIC_FORMSPREE_FORM: string;
  readonly PUBLIC_SPOTIFY_CLIENT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}