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
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/components/ui/use-toast";
import { postDataToDB } from "@/src/services/baserow.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FaCheck } from "react-icons/fa";
import * as z from "zod";
import { SignInFlow } from "../types";
interface SignUpCardProps {
  setState: (state: SignInFlow) => void;
}

export default function SignUpCard({ setState }: SignUpCardProps) {
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
      Email: data.email,
      Password: data.password,
    };

    try {
      postDataToDB(payload)
        .then(() => {
          toast({
            title: "Usuário salvo!",
            description: "Conta criada com sucesso!",
            style: { backgroundColor: "#99E2CD" },
            action: (
              <div className="text-4xl text-blue-500">
                <FaCheck />
              </div>
            ),
          });
        })
        .catch((error) => {
          toast({
            title: "Erro ao criar conta!",
            description: "Tente novamente mais tarde",
            variant: "destructive",
            action: (
              <div className="text-4xl text-white">
                <FaCheck />
              </div>
            ),
          });
        });
    } catch (e) {}
  }
  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pb-5 pt-0">
        <CardTitle>Crie a sua conta</CardTitle>
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
