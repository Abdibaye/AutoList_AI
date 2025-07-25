"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { useTransition } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { GithubIcon } from "lucide-react";
import { useRouter } from 'next/navigation';



export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
     const router = useRouter();
     const [githubtransition, setGithubTransition] = useTransition();
  
     async function handleGithubLogin() {
        setGithubTransition(async () => {
            await authClient.signIn.social({
          provider: 'github',
          callbackURL: '/',
          fetchOptions: {
            onSuccess: () => {
                toast.success("signed with github successfully")
            },
            onError: (error) => {
                toast.error("internal server error")    }
          },
       })
        });
       }
  
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input id="password" type="password" required />
        </div>
        <Button type="submit" className="w-full">
          Login
        </Button>
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>
        <Button disabled={githubtransition} onClick={handleGithubLogin} className='w-full' variant='outline'>
                {
                githubtransition ? (
                    <span className='flex items-center gap-2'>
                        <GithubIcon className='animate-spin' />
                        Signing in with github...
                    </span>
                ) : (
                    <span className='flex items-center gap-2'>
                        <GithubIcon />
                        Sign in with Github
                    </span>
                )
                }
            </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <a href="#" className="underline underline-offset-4">
          Sign up
        </a>
      </div>
    </form>
  )
}
