/// <parameter name="reference" types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SLIDEV_PASSWORD?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
