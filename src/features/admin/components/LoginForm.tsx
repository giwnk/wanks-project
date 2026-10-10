"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/features/admin/hooks/useAuth";
import {
  LockKeyIcon,
  EnvelopeSimpleIcon,
  EyeIcon,
  EyeSlashIcon,
  SignInIcon,
  WarningCircleIcon,
  CircleNotchIcon,
  ArrowLeftIcon,
} from "@phosphor-icons/react";

export default function LoginForm() {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.trim() || !password) {
      setErrorMessage("Email dan password wajib diisi.");
      return;
    }

    const res = await login({
      email: email.trim(),
      password,
    });

    if (!res.success) {
      setErrorMessage(
        res.error || "Autentikasi gagal. Periksa kembali kredensial Anda.",
      );
    }
  };

  return (
    <div className="w-full max-w-md border-2 border-border bg-card p-6 sm:p-8 shadow-retro-md relative font-sans select-none">
      {/* Top Tag & Brand Header */}
      <div className="flex items-center justify-between border-b-2 border-border pb-4 mb-6">
        <div className="flex items-center gap-2.5">
          <div className="flex aspect-square size-9 items-center justify-center bg-accent text-accent-foreground border-2 border-border font-extrabold shadow-retro">
            <Image
              src="/logo/hand-horns-icon.svg"
              alt="Wanks Logo"
              className="size-5 object-contain"
              width={24}
              height={24}
            />
          </div>
          <div>
            <h1 className="font-chillax font-extrabold text-foreground text-base uppercase leading-none tracking-wide">
              WANKS ADMIN
            </h1>
            <span className="text-[10px] font-mono text-muted-foreground uppercase font-bold tracking-tight">
              Control Portal
            </span>
          </div>
        </div>

        <span className="text-[10px] font-mono font-bold bg-accent text-accent-foreground px-2 py-0.5 border-2 border-border shadow-retro">
          GATEWAY
        </span>
      </div>

      {/* Header Message */}
      <div className="mb-6 space-y-1">
        <h2 className="text-xl font-chillax font-extrabold uppercase text-foreground">
          Sign In to Portal
        </h2>
        <p className="text-xs font-mono text-muted-foreground">
          Enter authorized credentials to manage portfolio content.
        </p>
      </div>

      {/* Error Alert Box */}
      {errorMessage && (
        <div className="mb-5 flex items-start gap-2.5 border-2 border-destructive bg-destructive/10 p-3 text-xs font-mono text-destructive shadow-retro">
          <WarningCircleIcon className="size-4 shrink-0 mt-0.5" weight="bold" />
          <span className="flex-1">{errorMessage}</span>
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-4 font-mono">
        {/* Email Field */}
        <div className="space-y-1.5">
          <label
            htmlFor="admin-email"
            className="block text-xs font-chillax font-bold uppercase text-foreground"
          >
            Email Address
          </label>
          <div className="relative">
            <input
              id="admin-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              disabled={isLoading}
              className="w-full border-2 border-border bg-background px-3 py-2.5 text-xs font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary shadow-retro transition-all pl-9.5 disabled:opacity-50"
            />
            <EnvelopeSimpleIcon
              className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none"
              weight="bold"
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-1.5">
          <label
            htmlFor="admin-password"
            className="block text-xs font-chillax font-bold uppercase text-foreground"
          >
            Password
          </label>
          <div className="relative">
            <input
              id="admin-password"
              type={showPassword ? "text" : "password"}
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              disabled={isLoading}
              className="w-full border-2 border-border bg-background px-3 py-2.5 text-xs font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary shadow-retro transition-all pl-9.5 pr-9.5 disabled:opacity-50"
            />
            <LockKeyIcon
              className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none"
              weight="bold"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isLoading}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer transition-colors disabled:cursor-not-allowed"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeSlashIcon className="size-4" weight="bold" />
              ) : (
                <EyeIcon className="size-4" weight="bold" />
              )}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-2 h-11 flex items-center justify-center gap-2 border-2 border-border bg-primary text-primary-foreground font-chillax font-extrabold text-xs uppercase shadow-retro hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <CircleNotchIcon className="size-4 animate-spin" weight="bold" />
              <span>Authenticating...</span>
            </>
          ) : (
            <>
              <SignInIcon className="size-4" weight="bold" />
              <span>Authenticate & Enter</span>
            </>
          )}
        </button>
      </form>

      {/* Return to Portfolio Link */}
      <div className="mt-6 pt-4 border-t-2 border-border text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="size-3.5" weight="bold" />
          <span>Return to Portfolio</span>
        </Link>
      </div>
    </div>
  );
}
