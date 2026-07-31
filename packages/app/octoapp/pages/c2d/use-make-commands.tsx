import { useCommand, type CommandOption } from "@/context/command"
import { useLanguage } from "@/context/language"
import { useNavigate } from "@solidjs/router"
import { onCleanup } from "solid-js"

const withCategory = (category: string) => {
  return (option: Omit<CommandOption, "category">): CommandOption => ({
    ...option,
    category,
  })
}

export function useC2dCommands() {
  const command = useCommand()
  const language = useLanguage()
  const navigate = useNavigate()

  const sessionCommand = withCategory(language.t("command.category.session"))

  const commands = () => [
    sessionCommand({
      id: "c2d.new",
      title: language.t("command.session.new"),
      slash: "new",
      onSelect: () => navigate("/c2d"),
    }),

    sessionCommand({
      id: "c2d.undo",
      title: language.t("command.session.undo"),
      slash: "undo",
      onSelect: () => {
      },
    }),

    sessionCommand({
      id: "c2d.redo",
      title: language.t("command.session.redo"),
      slash: "redo",
      onSelect: () => {
      },
    }),

    sessionCommand({
      id: "c2d.compact",
      title: language.t("command.session.compact"),
      slash: "compact",
      onSelect: () => {
      },
    }),

    sessionCommand({
      id: "c2d.agent",
      title: language.t("command.agent.choose"),
      slash: "agent",
      onSelect: () => {
      },
    }),

    sessionCommand({
      id: "c2d.mcp",
      title: language.t("command.mcp.settings"),
      slash: "mcp",
      onSelect: () => {
      },
    }),
  ]

  command.register("c2d", commands)
}
