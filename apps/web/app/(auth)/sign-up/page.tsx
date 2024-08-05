"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { APP_ROUTER, COOKIE } from "@/constants";
import { signUp } from "@/services/auth";
import { Role } from "@/services/auth/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { setCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  role: z.enum(["USER", "REALTOR"]),
});

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      role: "USER",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const res = await signUp(values);
      setCookie(COOKIE.TOKEN, res.accessToken);
      if (res.user.role === Role.USER) {
        router.push(APP_ROUTER.HOME);
      } else {
        router.push(APP_ROUTER.REALTOR.APARTMENT.LIST);
      }
      setIsLoading(false);
    } catch (err) {
      toast.error("Sign Up Error");
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 min-w-[400px] shadow border rounded-lg p-8"
      >
        <h1 className="text-3xl font-bold">Sign Up</h1>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input disabled={isLoading} placeholder="Email" {...field} />
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
                <Input disabled={isLoading} type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isLoading}
                  className="flex space-x-2 items-center"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="USER" />
                    </FormControl>
                    <FormLabel className="font-normal">User</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="REALTOR" />
                    </FormControl>
                    <FormLabel className="font-normal">Realtor</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between items-center">
          <Link href={APP_ROUTER.SIGN_IN} className="text-sm hover:underline">
            Already have account?
          </Link>
          <Button loading={isLoading} type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}
