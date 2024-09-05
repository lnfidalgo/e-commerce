import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/toaster";
import { useAuthActions } from "@convex-dev/auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { SignInFlow } from "../types";

interface SignInCardProps {
  setState: (state: SignInFlow) => void;
}

export default function SignInCard({ setState }: SignInCardProps) {
  const { signIn } = useAuthActions();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
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
  const onPasswordSignin = (data: z.infer<typeof formSchema>) => {
    setPending(true);
    signIn("password", {
      email: data.email,
      password: data.password,
      flow: "signIn",
    })
      .catch((e) => {
        setError("Email ou senha inválidos!");
      })
      .finally(() => {
        setPending(false);
      });
  };

  async function onSubmit(data: z.infer<typeof formSchema>) {}

  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0 pb-5">
        <CardTitle>Faça login para continuar</CardTitle>
      </CardHeader>
      {!!error && (
        <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm">
          <p>{error}</p>
        </div>
      )}
      <CardContent className="space-y-5 px-0 pb-0">
        <Form {...form}>
          <form
            className="space-y-2.5"
            onSubmit={form.handleSubmit(onPasswordSignin)}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>{"Email"}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={"Digite o seu email"}
                      {...field}
                      disabled={pending}
                    />
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
                    <Input
                      placeholder={"Digite a sua senha"}
                      {...field}
                      disabled={pending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={pending}>
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
