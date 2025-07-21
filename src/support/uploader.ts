import uploader from 'astro-uploader'
import type { AstroIntegration } from 'astro'
import { Settings } from './../config.ts'

const NullAstroIntegration = { name: 'null', hooks: {} } as AstroIntegration

export function uploadAssetsToS3(): AstroIntegration {
    if (!Settings.Assets.uploadAssetsToS3) {
        return NullAstroIntegration
    }

    return uploader(Settings.Assets.config)
}
