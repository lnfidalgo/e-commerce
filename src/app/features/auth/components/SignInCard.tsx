import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { FaCheck } from "react-icons/fa";
import { toast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { SignInFlow } from "../types";
import { verifyLogin } from "@/src/services/baserow.service";

interface SignInCardProps {
  setState: (state: SignInFlow) => void;
}

export default function SignInCard({ setState }: SignInCardProps) {
  const formSchema = z.object({
    email: z.string().email({ message: "Email inválido." }),
    password: z.string().min(6, { message: "Senha inválida." }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const payload = {
      email: data.email,
      password: data.password,
    };

    try {
      verifyLogin(payload)
        .then((result) => {
          if (result.status) {
            toast({
              title: "Login realizado!",
              description: "Bem vindo!",
              style: { backgroundColor: "#99E2CD" },
              action: (
                <div className="text-4xl text-blue-500">
                  <FaCheck />
                </div>
              ),
            });
          } else {
            console.log(result.message);
            return;
          }
        })
        .catch((error) => {
          toast({
            title: "Erro ao fazer login!",
            description: "Tente novamente mais tarde",
            variant: "destructive",
            action: (
              <div className="text-4xl text-white">
                <FaCheck />
              </div>
            ),
          });
        });
    } catch (e) {
      console.error("Erro na verificação de login:", e);
    }
  }

  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0 pb-5">
        <CardTitle>Faça login para continuar</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5 px-0 pb-0">
        <Form {...form}>
          <form className="space-y-2.5" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>{"Email"}</FormLabel>
                  <FormControl>
                    <Input placeholder={"Digite o seu email"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>{"Senha"}</FormLabel>
                  <FormControl>
                    <Input placeholder={"Digite a sua senha"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={false}>
              Entrar
            </Button>
            <Toaster />
          </form>
        </Form>
        <p className="text-muted-foreground text-xs">
          Não possui uma conta?{" "}
          <span
            onClick={() => setState("signUp")}
            className="text-sky-400 hover:text-sky-500 cursor-pointer hover:underline"
          >
            Criar conta.
          </span>
        </p>
      </CardContent>
    </Card>
  );
}
