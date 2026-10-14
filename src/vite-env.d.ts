/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FORM_ENDPOINT?: string
  readonly VITE_CONTACT_EMAIL?: string
}

// The `shaders` package is used as-is; loosen typing so a version difference
// in its published types can never break the production build.
declare module 'shaders/react'
