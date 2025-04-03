import type { Meta, StoryObj } from "@storybook/react";

import Header from "./Header";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

const meta = {
  component: Header,
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

const mockSession: Session = {
  user: {
    id: "user-id",
    name: "John Doe",
    email: "john@example.com",
    accessToken: "access-token",
    refreshToken: "refresh-token",
    tokenExpiry: 1000,
  },
  expires: "2025-01-01T00:00:00.000Z",
};

export const LoggedOut: Story = {
  name: "Não autenticado",
  render: () => (
    <SessionProvider session={null}>
      <Header />
    </SessionProvider>
  ),
};

export const LoggedIn: Story = {
  name: "Autenticado",
  render: () => (
    <SessionProvider session={mockSession}>
      <Header />
    </SessionProvider>
  ),
};
