// /app/login/page.tsx
"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Loader from "@/components/Ui/Loader";
import { FcGoogle } from "react-icons/fc";
import { useAuthStore } from "@/store/useAuthStore";

export default function Login() {
  const { isLoggedIn } = useAuthStore();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);

  const [isSignIn, setIsSignIn] = useState<boolean>(true);

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push("/dashboard"); // or auto-login
    } else {
      const data = await res.json();
      setError(data.message || "Something went wrong");
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password,
    });

    setLoading(false);

    if (res?.error) {
      setError("Invalid email or password");
    } else {
      router.push("/dashboard"); // or your target route
    }
  };

  const handleGoogleSignup = async () => {
    await signIn("google", {
      redirect: true,
      callbackUrl: "/", // where to redirect after login
    });
  };

  useEffect(() => {
    setLoading(false)
  },[])

  if (loading) {
    return <Loader />;
  }

  if (isLoggedIn) {
    // router.push("/dashboard");
    // return null;
  }

  return (
    <main className="w-full min-h-screen grid place-items-center">
      <div>
        <Image
          src={"/img/Logo.png"}
          width={35}
          height={35}
          className="mt-4 object-scale-up mx-auto"
          alt="logo"
        />

        <div className="flex  items-center justify-center  p-4">
          <div className="w-full max-w-md rounded-2xl p-6 shadow-lg border border-theme">
            <h2 className="mb-4 text-2xl font-bold text-center">
              {isSignIn ? "Sign in to your Account" : "Create an Account"}
            </h2>

            {error && (
              <p className="mb-4 text-red-500 text-sm text-center">{error}</p>
            )}

            <form
              onSubmit={isSignIn ? handleLogin : handleSignup}
              className="space-y-4 "
            >
              {!isSignIn && (
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Name"
                  required
                  className="w-full bg-black/25 shadow rounded-md border border-theme px-3 py-2"
                />
              )}
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                required
                className="w-full bg-black/25 shadow rounded-md border border-theme px-3 py-2"
              />
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className="w-full bg-black/25 shadow rounded-md border border-theme px-3 py-2"
              />

              <button
                type="submit"
                className="w-full rounded-md bg-blue-600 py-2 text-white hover:bg-blue-700"
              >
                Sign {isSignIn ? "in" : "up"}
              </button>
            </form>

            <div className="my-4 text-center text-sm text-gray-500">or</div>

            <button
              className="px-4 py-3 mx-auto flex-center gap-2 shadow bg-black/50"
              onClick={handleGoogleSignup}
            >
              <FcGoogle className="size-5" />
              Sign {isSignIn ? "in" : "up"} with Google
            </button>

            {isSignIn ? (
              <p className="mt-4 text-center text-sm">
                Don't have an account?{" "}
                <a
                  onClick={() => setIsSignIn(false)}
                  className="text-blue-600 hover:underline cursor-pointer"
                >
                  Signup
                </a>
              </p>
            ) : (
              <p className="mt-4 text-center text-sm cursor-pointer">
                Already have an account?{" "}
                <a
                  onClick={() => setIsSignIn(true)}
                  className="text-blue-600 hover:underline"
                >
                  Login
                </a>
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
