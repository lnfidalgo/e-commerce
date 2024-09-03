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

interface SignUpCardProps {
  setState: (state: SignInFlow) => void;
}

export default function SignUpCard({ setState }: SignUpCardProps) {
  const { signIn } = useAuthActions();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  const formSchema = z.object({
    name: z.string().min(1, { message: "Nome inválido." }),
    email: z.string().email({ message: "Email inválido." }),
    password: z.string().min(6, { message: "Senha inválida." }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onPasswordSignup = (data: z.infer<typeof formSchema>) => {
    setPending(true);
    signIn("password", {
      name: data.name,
      email: data.email,
      password: data.password,
      flow: "signUp",
    })
      .catch(() => {
        setError("Algo deu errado, tente novamente mais tarde!");
      })
      .finally(() => {
        setPending(false);
      });
  };

  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pb-5 pt-0">
        <CardTitle>Crie a sua conta</CardTitle>
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
            onSubmit={form.handleSubmit(onPasswordSignup)}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>{"Nome"}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={"Digite o seu nome"}
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
              Criar conta
            </Button>
            <Toaster />
          </form>
        </Form>
        <p className="text-muted-foreground text-xs">
          Já possui uma conta?
          <span
            onClick={() => setState("signIn")}
            className="text-sky-400 hover:text-sky-500 cursor-pointer hover:underline"
          >
            Entrar.
          </span>
        </p>
      </CardContent>
    </Card>
  );
}
