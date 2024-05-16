import Link from "next/link";
import {
  BeakerIcon,
  ChatBubbleOvalLeftEllipsisIcon,
} from "@heroicons/react/24/solid";
import FormInput from "@/components/form-input";
import FormButton from "@/components/form-btn";
import SocialLogin from "@/components/social-login";

export default function CreateAccount() {
  return (
    <div className="flex flex-col gap-5 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">Fill in the form below to join!</h2>
      </div>
      <form className="flex flex-col gap-3">
        <FormInput
          type="text"
          placeholder="UserName"
          required
          errors={[]}
        ></FormInput>
        <FormInput
          type="email"
          placeholder="Email"
          required
          errors={[]}
        ></FormInput>
        <FormInput
          type="password"
          placeholder="Password"
          required
          errors={[]}
        ></FormInput>
        <FormInput
          type="password"
          placeholder="Confirm Password"
          required
          errors={[]}
        ></FormInput>
        <FormButton loading={false} text="Create account"></FormButton>
      </form>
      <SocialLogin></SocialLogin>
    </div>
  );
}
