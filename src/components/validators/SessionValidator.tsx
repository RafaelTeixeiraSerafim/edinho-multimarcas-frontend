"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SessionValidator() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    // Check for session error or missing tokens
    if (
      session?.error === "SessionExpired" ||
      (status === "authenticated" && !session.user?.accessToken)
    ) {
      // Force complete sign out
      signOut({
        redirect: false,
        callbackUrl: "/?session_expired=true",
      }).then(() => {
        router.push("/?session_expired=true");
        router.refresh(); // Clear client cache
      });
    }
  }, [session, status, router]);

  return null;
}
