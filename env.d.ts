/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_LOCATION_ORIGIN: string
    readonly VITE_API_URL: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}

declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component;
}
