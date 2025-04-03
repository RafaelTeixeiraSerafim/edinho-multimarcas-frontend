"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const recoverPasswordSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

type RecoverPasswordFormData = z.infer<typeof recoverPasswordSchema>;

export default function RecuperarSenha() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<RecoverPasswordFormData>({
    resolver: zodResolver(recoverPasswordSchema),
  });

  const onSubmit = async (data: RecoverPasswordFormData) => {
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (result?.error) {
      setError("root", { message: result.error });
    } else {
      router.push("/");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}></form>
    </div>
  );
}
