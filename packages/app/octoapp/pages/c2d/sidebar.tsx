import { createEffect, createSignal } from "solid-js"
import { useLocation } from "@solidjs/router"
import { Icon } from "@opencode-ai/ui/icon"
import { useGlobalSync } from "@/context/global-sync"
import { useProjectDir } from "@/hooks/use-project-dir"
import { AgentSidebar } from "@/components/agent-sidebar"
import type { Session } from "@opencode-ai/sdk/v2/client"

export function C2dSidebar() {
  const location = useLocation()
  const globalSync = useGlobalSync()
  const projectDir = useProjectDir()

  const [resolvedDir, setResolvedDir] = createSignal<string>()

  createEffect(() => {
    const d = projectDir()
    if (d) setResolvedDir(d)
  })

  createEffect(() => {
    if (!globalSync.data.ready) {
      const d = projectDir()
      if (d) setResolvedDir(d)
    }
  })

  return (
    <AgentSidebar
      directory={resolvedDir()}
      agentFilter="octo_c2d"
      buildSessionRoute={(s: Session) => `/c2d/${s.id}`}
      buildNewRoute={() => "/c2d"}
      buildDeleteFallback={() => "/c2d"}
      activeSessionId={() => {
        const m = location.pathname.match(/^\/c2d\/(.+)$/)
        return m?.[1]
      }}
      sectionTitle="Octo C2D"
      sectionIcon={() => (
        <span style={{ "--icon-base": "#0a59f7", display: "inline-flex" }}>
          <Icon name="tab-c2d" size="normal" />
        </span>
      )}
      newButtonText="新建对话"
      trackerModule="c2d"
      sidebarSourceKey="c2d"
    />
  )
}
