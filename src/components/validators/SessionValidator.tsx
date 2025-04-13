"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SessionValidator() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (
      session?.error === "SessionExpired" ||
      (status === "authenticated" && !session.user?.accessToken)
    ) {
      signOut({
        redirect: false,
        callbackUrl: "/?session_expired=true",
      }).then(() => {
        router.push("/?session_expired=true");
        router.refresh();
      });
    }
  }, [session, status, router]);

  return null;
}
