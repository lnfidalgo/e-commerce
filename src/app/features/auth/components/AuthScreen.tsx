"use client";

import { useState } from "react";
import { SignInFlow } from "../types";
import SignInCard from "./SignInCard";
import SignUpCard from "./SignUpCard";

export default function AuthScreen() {
  const [state, setState] = useState<SignInFlow>("signIn");
  return (
    <div className="h-full flex items-center justify-center bg-orange-500">
      <div className="md:h-auto md:w-[420px]">
        {state === "signIn" ? <SignInCard /> : <SignUpCard />}
      </div>
    </div>
  );
}
