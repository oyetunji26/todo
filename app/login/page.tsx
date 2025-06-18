// /app/login/page.tsx
"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";

export default function Login() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/"); // or signIn() to show next-auth page
    }
  }, [status, router]);

  return (
    <div className="flex flex-col w-full gap-2 items-center">
      <Image
        src={"/img/Logo.png"}
        width={28}
        height={27}
        className="mt-4 object-scale-down"
        alt="logo"
      />
      <button
        className="px-4 py-3 mr-5 flex-center gap-3 bg-black/50"
        onClick={() =>
          signIn("google", {
            redirect: true,
            callbackUrl: "/", // where to redirect after login
          })
        }
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_logo.svg"
          className="size-5 object-scale-down"
        />
        Sign in with Google
      </button>
      {/* <button className="px-2 py-1.5 bg-theme" onClick={() => signOut()}>Sign in with Google</button> */}
    </div>
  );
}
