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

export function useD2cCommands() {
  const command = useCommand()
  const language = useLanguage()
  const navigate = useNavigate()

  const sessionCommand = withCategory(language.t("command.category.session"))

  const commands = () => [
    sessionCommand({
      id: "d2c.new",
      title: language.t("command.session.new"),
      slash: "new",
      onSelect: () => navigate("/d2c"),
    }),

    sessionCommand({
      id: "d2c.undo",
      title: language.t("command.session.undo"),
      slash: "undo",
      onSelect: () => {
      },
    }),

    sessionCommand({
      id: "d2c.redo",
      title: language.t("command.session.redo"),
      slash: "redo",
      onSelect: () => {
      },
    }),

    sessionCommand({
      id: "d2c.compact",
      title: language.t("command.session.compact"),
      slash: "compact",
      onSelect: () => {
      },
    }),

    sessionCommand({
      id: "d2c.agent",
      title: language.t("command.agent.choose"),
      slash: "agent",
      onSelect: () => {
      },
    }),

    sessionCommand({
      id: "d2c.mcp",
      title: language.t("command.mcp.settings"),
      slash: "mcp",
      onSelect: () => {
      },
    }),
  ]

  command.register("d2c", commands)
}
