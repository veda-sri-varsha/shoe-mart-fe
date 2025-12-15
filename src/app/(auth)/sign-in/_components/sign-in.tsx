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
import { login } from "@/services/api/auth";
import { Typography } from "@/components/ui/typography";
import { FEATURES } from "@/constants";
import { toast } from "sonner";

export function SignIn() {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [agree, setAgree] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!agree) {
      toast.error("Please accept the Terms & Conditions.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await login({ email, password });
      localStorage.setItem("user", JSON.stringify(response.data));
      toast.success(response.message);
      router.push("/");
    } catch {
      toast.error("Invalid Credentials");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex flex-col md:flex-row bg-neutral-900 text-white">
      <div className="flex-1 flex flex-col justify-center items-center px-8 py-16">
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
              className="bg-neutral-800 text-center border-none shadow-md hover:shadow-lg transition"
            >
              <CardHeader>
                <CardTitle className="text-zinc-50">{feature.title}</CardTitle>
                <CardDescription className="text-zinc-300 mt-1">
                  {feature.desc}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      <div className="w-full md:w-2/5 bg-white text-black flex items-center justify-center px-8 py-12">
        <Card className="w-full max-w-md border-none shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-semibold">
              Step into Comfort
            </CardTitle>
            <CardDescription>Enter Your Detail To SignIn</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:bg-amber-50"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </Button>
              </div>

              <div className="flex items-start gap-2">
                <Checkbox
                  checked={agree}
                  onCheckedChange={(v) => setAgree(v === true)}
                  id="terms-checkbox"
                />
                <Label
                  htmlFor="terms-checkbox"
                  className="text-sm text-gray-600"
                >
                  I accept the{" "}
                  <Link href="#" className="text-blue-600 underline">
                    Privacy Policy & T&Cs.
                  </Link>
                </Label>
              </div>

              <Separator />

              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
            </form>

            <Typography
              as="p"
              variant="lead"
              className="text-center text-sm text-gray-500 mt-4"
            >
              New here?{" "}
              <Link href="/sign-up" className="text-blue-600">
                Create an account.
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
