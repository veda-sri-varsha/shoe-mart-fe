"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { FEATURES } from "@/constants";
import { toast } from "sonner";
import { signup } from "@/services/api/index";
import { Typography } from "@/components/ui/typography";
import { Role } from "@/types/shared";
import { signupPayload } from "@/types";

export function SignUp() {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [agree, setAgree] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!agree) {
      toast.error("You must accept the Terms and Conditions.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await signup({
        name,
        email,
        password,
        role: Role.USER,
      } as signupPayload);
      if (response.success) {
        toast.success(response.message);
        router.push("/sign-in");
      } else {
        toast.error(
          response.message || "Failed to create account. Please try again."
        );
      }
    } catch {
      toast.error("Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section className="min-h-screen flex flex-col md:flex-row bg-neutral-900 text-white">
      <div className="flex-1 flex flex-col justify-center items-center px-8 py-16 mx-auto">
        <Typography as="h1" variant="h1" className="mb-2">
          Shoe Mart
        </Typography>

        <Typography as="p" variant="lead" className="mb-8 text-center">
          Discover the best shoes for your style and comfort.
        </Typography>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl">
          {FEATURES.map((feature) => (
            <Card
              key={feature.title}
              className="bg-neutral-800 text-center border-none shadow-md hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <CardTitle className="text-zinc-50 text-sm sm:text-base">
                  {feature.title}
                </CardTitle>
                <CardDescription className="text-zinc-50 text-sm mt-1">
                  {feature.desc}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      <div className="w-full md:w-2/5 bg-white text-black flex items-center justify-center px-8 py-12">
        <Card className="w-full max-w-md border-none shadow-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-semibold">
              Step into Comfort
            </CardTitle>
            <CardDescription>
              Enter your details to create your account
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-zinc-400 focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-zinc-400 focus:outline-none"
                />
              </div>

              <div className="space-y-2 relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-zinc-400 focus:outline-none"
                />

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:bg-gray-100"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </Button>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  checked={agree}
                  onCheckedChange={(value) => setAgree(value === true)}
                  id="terms-checkbox"
                />
                <Label
                  htmlFor="terms-checkbox"
                  className="text-sm text-gray-600 leading-5"
                >
                  I accept the{" "}
                  <Link
                    href="#"
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    Privacy Policy & T&Cs.
                  </Link>
                </Label>
              </div>

              <Separator className="my-4" />

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-black text-white hover:bg-black transition-colors cursor-pointer"
              >
                {isLoading ? "Signing Up..." : "Sign Up"}
              </Button>
            </form>
            <div className="text-sm text-center mt-4">
              Already have an account?{" "}
              <Link href="/sign-in" className="text-blue-600 hover:underline">
                Sign In
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
