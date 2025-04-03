import { useSession } from "next-auth/react";

import { redirect } from "next/navigation";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = useSession();

  if (session.status === "unauthenticated") redirect("/login");

  return (
    <div className="flex h-screen bg-white">
      <div className="overflow-y-auto" style={{ scrollbarWidth: "none" }}></div>
      <div id="main" className="flex-1 overflow-auto px-4">
        <div className="grow">{children}</div>
      </div>
    </div>
  );
}
