"use client";
import Input from "@/components/input";
import FormButton from "@/components/button";
import SocialLogin from "@/components/social-login";
import { redirect } from "next/navigation";
import { useFormState } from "react-dom";
import { login } from "./actions";
import { PASSW0RD_MIN_LENGTH } from "@/lib/constants";

export default function Login() {
  const [state, dispatch] = useFormState(login, null);

  return (
    <div className="flex flex-col gap-5 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">Log in with email and password</h2>
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        <Input
          name="email"
          type="email"
          placeholder="Email"
          required
          errors={state?.fieldErrors.email}
        ></Input>
        <Input
          name="password"
          type="password"
          placeholder="Password"
          minLength={PASSW0RD_MIN_LENGTH}
          required
          errors={state?.fieldErrors.password}
        ></Input>
        <FormButton text="Login"></FormButton>
      </form>
      <SocialLogin></SocialLogin>
    </div>
  );
}
