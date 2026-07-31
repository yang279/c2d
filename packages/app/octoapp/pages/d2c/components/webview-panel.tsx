import { createSignal, onMount, onCleanup, Show, type JSX } from "solid-js"

export interface WebviewPanelRef {
  postMessage: (data: unknown) => void
}

interface WebviewPanelProps {
  url: string
  onMessage?: (data: unknown) => void
  class?: string
  style?: JSX.CSSProperties
  ref?: (el: WebviewPanelRef) => void
}

const IPC_CHANNEL = "d2c-bridge"

export function WebviewPanel(props: WebviewPanelProps) {
  let webviewEl: HTMLElement | undefined
  const [loading, setLoading] = createSignal(true)

  onMount(() => {
    if (!webviewEl) return

    webviewEl.addEventListener("ipc-message", (e: Event) => {
      const evt = e as unknown as { channel: string; args: unknown[] }
      if (evt.channel !== IPC_CHANNEL) return
      props.onMessage?.(evt.args[0])
    })

    webviewEl.addEventListener("did-finish-load", () => {
      setLoading(false)
    })
  })

  const ref: WebviewPanelRef = {
    postMessage: (data: unknown) => {
      ;(webviewEl as any)?.send?.(IPC_CHANNEL, data)
    },
  }

  props.ref?.(ref)

  return (
    <div class={props.class} style={{ position: "relative", ...props.style }}>
      <Show when={loading()}>
        <div
          class="absolute inset-0 flex items-center justify-center"
          style={{ background: "#fff", "z-index": "1" }}
        >
          <div class="octo-spinner" />
        </div>
      </Show>
      <webview
        ref={webviewEl!}
        src={props.url || "about:blank"}
        style={{ width: "100%", height: "100%", border: "none" }}
        allowpopups
      />
    </div>
  )
}
