type Command = 'exit' | 'help';

type CLICommand = {
  name: string;
  description: string;
  callback: (commands: Record<Command, CLICommand>) => void;
}

export type { CLICommand, Command };
