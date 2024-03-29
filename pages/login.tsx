import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { LoginSchema, LoginSchemaType } from "@/schemas";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { FormError } from "@/components/FormError";
import { useRouter } from "next/router";

const LoginPage = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginSchemaType) => {
    try {
      setIsLoading(true);

      const response = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (response?.error) {
        setError("Invalid credentials");
      }

      if (response?.ok) {
        router.push("/profiles");
      }
    } catch (error) {
      console.error(error);
      setError("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex h-screen w-full bg-black bg-[url('/images/hero.svg')] bg-cover bg-fixed bg-center bg-no-repeat">
      <div className="flex h-full w-full flex-col">
        <nav className="border-b bg-black px-12 py-5">
          <span className="inline-block bg-gradient-to-br from-teal-400 to-cyan-600 bg-clip-text text-4xl font-bold text-transparent">
            waves
          </span>
        </nav>
        <div className="flex h-full items-center justify-center bg-black/50 backdrop-blur-sm">
          <Card className="w-[450px] bg-black p-4">
            <CardHeader>
              <CardTitle className="text-center">Sign in</CardTitle>
            </CardHeader>
            <CardContent className="pb-3">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex flex-col justify-center gap-y-6"
                >
                  <div className="space-y-3">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={isLoading}
                              placeholder="youremail@example.com"
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
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={isLoading}
                              type="password"
                              placeholder="*********"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormError message={error} />
                  <Button disabled={isLoading} className="w-full">
                    Submit
                  </Button>
                </form>
              </Form>
              <div className="space-y-6">
                <Separator className="mt-6" />
                <div className="flex gap-x-2">
                  <Button
                    disabled={isLoading}
                    variant="outline"
                    className="w-1/2"
                    onClick={() =>
                      signIn("google", { callbackUrl: "/profiles" })
                    }
                  >
                    <FcGoogle className="h-5 w-5" />
                  </Button>
                  <Button
                    disabled={isLoading}
                    variant="outline"
                    className="w-1/2"
                    onClick={() =>
                      signIn("github", { callbackUrl: "/profiles" })
                    }
                  >
                    <FaGithub className="h-5 w-5" />
                  </Button>
                </div>
                <Button
                  variant="link"
                  asChild
                  className="w-full p-0 text-muted-foreground"
                >
                  <Link href="/signup">Don&apos;t have an account?</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
