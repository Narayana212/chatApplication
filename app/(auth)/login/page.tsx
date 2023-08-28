"use client";
import { FC, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

interface LoginPageProps {}

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email("This is not vaild Email"),
  password: z
    .string()
    .min(6, { message: "Password must be minium of 6" })
    .max(20, { message: "Password not be more than 20 charaters" }),
});

const LoginPage: FC<LoginPageProps> = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const response = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(values),
      });
      if (response.ok) {
        toast({
          title: "You have Logined Successfully",
        });
        localStorage.setItem("userInfo", JSON.stringify(values));
        router.push("/");
      } else {
        const data = await response.json();
        toast({
          title: data.message,
        });
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }
  return (
    <div className="w-screen h-screen items-center justify-center ">
      <div className="flex flex-col items-center w-auto h-screen -mt-12 justify-center">
        <h1 className="font-bold text-xl ">Login</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 w-1/2"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="test@123.com" {...field} type="email" />
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
                      type="password"
                      placeholder="I can't say this"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center gap-5 ">
              <Button type="submit">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  "Login"
                )}
              </Button>
              <Link href="/signup" className="hover:underline font-bold">
                Oh! you don't account? register here
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
