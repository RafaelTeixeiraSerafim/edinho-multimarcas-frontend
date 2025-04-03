import type { Meta, StoryObj } from "@storybook/react";

import { FiLock } from "react-icons/fi";
import Input from "./Input";

const meta = {
  component: Input,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Padrão",
  args: {
    variant: "default",
  },
};

export const Password: Story = {
  name: "Senha",
  args: {
    variant: "password",
    placeholder: "Digite sua senha...",
  },
};

export const IconPassword: Story = {
  name: "Senha com ícone",
  args: {
    ...Password.args,
    startIcon: <FiLock />,
  },
};
