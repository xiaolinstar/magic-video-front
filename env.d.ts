/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly NODE_ENV: string
    readonly VITE_USE_MOCK: string
    readonly VITE_API_BASE_URL: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}

declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component;
}
