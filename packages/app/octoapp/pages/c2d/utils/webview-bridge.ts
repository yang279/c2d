import type { WebviewPanelRef } from "../components/webview-panel"

export type C2dToWebviewMessage =
  | { type: "session-update"; sessionId: string }
  | { type: "artifact-update"; data: unknown }
  | { type: "command"; command: string; payload?: unknown }

export type WebviewToC2dMessage =
  | { type: "action-result"; data: unknown }
  | { type: "request-info"; data: unknown }
  | { type: "send-message"; text: string; payload?: unknown }

export function postToWebview(ref: WebviewPanelRef | null | undefined, data: C2dToWebviewMessage) {
  if (!ref) return
  ref.postMessage(data)
}

export type WebviewMessageHandler = (msg: WebviewToC2dMessage) => void

export function createWebviewListener(
  iframeRef: () => HTMLIFrameElement | undefined,
  handler: WebviewMessageHandler,
) {
  function onMessage(e: MessageEvent) {
    const iframe = iframeRef()
    if (!iframe || e.source !== iframe.contentWindow) return
    handler(e.data as WebviewToC2dMessage)
  }

  window.addEventListener("message", onMessage)
  return () => window.removeEventListener("message", onMessage)
}
