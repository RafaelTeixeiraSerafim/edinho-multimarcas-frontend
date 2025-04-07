"use client";
import Button from "@/components/buttons/Button";
import Container from "@/components/containers/Container";
import Input from "@/components/inputs/Input";
import { BackLink } from "@/components/links/BackLink";
import Link from "@/components/links/Link";
import Logo from "@/components/logos/Logo";
import Text from "@/components/texts/Text";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  FiLock,
  FiMail,
} from "react-icons/fi";
import { z } from "zod";
import BgAbstractVideo from "../components/videos/BgAbstractVideo";

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
      });

      if (result?.error) {
        setError("root", { message: result.error });
      } else {
        window.location.href = "/";
      }
    } catch (error) {
      console.log(error);
      setError("root", { message: "Ocorreu um erro inesperado" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="relative flex overflow-hidden h-full w-8/10">
      <BgAbstractVideo />
      <form
        className="relative h-full w-1/2 flex flex-col justify-center gap-26 bg-white px-24"
        onSubmit={handleSubmit(onSubmit)}
      >
        <BackLink />
        <Logo />
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-6">
            <Input
              placeholder="Email"
              startIcon={<FiMail className="text-black/50" />}
              error={errors.email?.message}
              {...register("email")}
            />
            <Input
              variant="password"
              placeholder="Senha"
              error={errors.password?.message}
              startIcon={<FiLock className="text-black/50" />}
              {...register("password")}
            />
          </div>
          <Link href="/alterar-senha" className="self-start">
            Esqueceu sua senha?
          </Link>
        </div>
        <div className="flex flex-col gap-2">
          <Button type="submit" variant={isLoading ? "loading" : "default"}>
            Entrar
          </Button>
          <Text>
            Não tem uma conta?&nbsp;
            <Link href="/signup">Cadastrar-se</Link>
          </Text>
        </div>
        {errors.root && (
          <Text color="error" className="mt-2">{errors.root.message}</Text>
        )}
      </form>
    </Container>
  );
}
