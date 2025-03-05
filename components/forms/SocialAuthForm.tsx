'use client'

import React from "react";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { Toaster, toast } from "sonner"; // ✅ Correct import
import ROUTES from "../../constants/routes"; // Import ROUTES from the appropriate file

const SocialAuthForm = () => {
  const background = "background-dark400_light900 min-h-12 flex-1 rounded-2 text-dark200_light800";

  const handleSignIn = async (provider: "github" | "google") => {
    try {
      await signIn (provider, {
        callbackUrl: ROUTES.HOME,
        redirect: false,
      });
      // const response = await signIn(provider)
    } catch (error) {
      console.log("Error");

      // ✅ Corrected Sonner toast usage
      toast.error("Sign-In Failed", {
        description: error instanceof Error ? error.message : "An error occurred during sign-in",
      });
    }
  };

  return (
    <>
      {/* ✅ Ensure Toaster is included at the root level */}
      <Toaster />
      
      <div className="mt-10 flex flex-wrap gap-2.5">
        <Button className={background} onClick={() => handleSignIn("github")}>
          <Image
            src="/icons/github.svg"
            alt="GitHub logo"
            width={20}
            height={20}
            className="invert-colors mr-2.5 object-contain"
          />
          <span>Login with GitHub</span>
        </Button>

        <Button className={background} onClick={() => handleSignIn("google")}>
          <Image
            src="/icons/google.svg"
            alt="Google logo"
            width={20}
            height={20}
            className="mr-2.5 object-contain"
          />
          <span>Login with Google</span>
        </Button>
      </div>
    </>
  );
};

export default SocialAuthForm;
