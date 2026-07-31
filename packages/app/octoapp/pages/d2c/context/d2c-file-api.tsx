import { createSimpleContext } from "@opencode-ai/ui/context"
import { useSDK } from "@/context/sdk"
import type { FileContent } from "@opencode-ai/sdk/v2/client"

export interface D2cFileApi {
  saveD2cFile: (sessionId: string, filename: string, content: string) => Promise<void>
  readD2cFile: (sessionId: string, filename: string) => Promise<string | null>
}

export const { use: useD2cFileApi, provider: D2cFileApiProvider } = createSimpleContext({
  name: "D2cFileApi",
  init: () => {
    const sdk = useSDK()

    const saveD2cFile: D2cFileApi["saveD2cFile"] = async (sessionId, filename, content) => {
      const relPath = `.octo/${sessionId}/d2c/${filename}`
      await sdk.client.file.write({ path: relPath, content })
    }

    const readD2cFile: D2cFileApi["readD2cFile"] = async (sessionId, filename) => {
      const relPath = `.octo/${sessionId}/d2c/${filename}`
      try {
        const result = await sdk.client.file.read({ path: relPath })
        const data = (result as { data?: FileContent }).data
        return data?.content ?? null
      } catch {
        return null
      }
    }

    return { saveD2cFile, readD2cFile }
  },
})
