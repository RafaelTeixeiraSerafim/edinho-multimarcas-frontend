"use client";
import Button from "@/components/buttons/Button";
import Container from "@/components/containers/Container";
import Input from "@/components/inputs/Input";
import { BackLink } from "@/components/links/BackLink";
import Logo from "@/components/logos/Logo";
import Text from "@/components/texts/Text";
import { http } from "@/lib/apiClient";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { FiLock, FiMail, FiUser } from "react-icons/fi";
import { z } from "zod";
import BgAbstractVideo from "../components/videos/BgAbstractVideo";

const signUpSchema = z.object({
  name: z.string().min(1, "Nome não pode estar vazio"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

type SignUpFormData = z.infer<typeof signUpSchema>;

export default function SignUp() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpFormData) => {
    try {
      await http.post("/users", {
        email: data.email,
        password: data.password,
        name: data.name,
      });

      router.push("/login");
    } catch (err: any) {
      setError("root", { message: err.message });
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
        <div className="flex flex-col gap-6">
          <Input
            placeholder="Nome"
            error={errors.name?.message}
            startIcon={<FiUser className="text-black/50" />}
            {...register("name")}
          />
          <Input
            placeholder="Email"
            error={errors.email?.message}
            startIcon={<FiMail className="text-black/50" />}
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
        <div className="flex flex-col gap-2">
          <Button type="submit" variant={isSubmitting ? "loading" : "default"}>
            Cadastrar
          </Button>
          <Text>
            Já tem uma conta?&nbsp;
            <Link href="/login" className="text-primary-light">
              Entrar
            </Link>
          </Text>
        </div>
        {errors.root && (
          <Text color="error" className="mt-2">
            {errors.root.message}
          </Text>
        )}
      </form>
    </Container>
  );
}
