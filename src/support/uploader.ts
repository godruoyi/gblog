import type { AstroIntegration } from 'astro'
import { Settings } from './../config.ts'

const NullAstroIntegration: AstroIntegration = {
  name: 'null',
  hooks: {},
}

// export async function uploadAssetsToS3(): Promise<AstroIntegration> {
//   if (!Settings.Assets.uploadAssetsToS3) {
//     return NullAstroIntegration
//   }

//   const mod = await import('astro-uploader')
//   const uploader = mod.default

//   return uploader(Settings.Assets.config)
// }