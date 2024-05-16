import Link from "next/link";
import {
  BeakerIcon,
  ChatBubbleOvalLeftEllipsisIcon,
} from "@heroicons/react/24/solid";
import FormInput from "@/components/form-input";
import FormButton from "@/components/form-btn";
import SocialLogin from "@/components/social-login";

export default function Login() {
  return (
    <div className="flex flex-col gap-5 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">SMS Login</h1>
        <h2 className="text-xl">Verify your phone number</h2>
      </div>
      <form className="flex flex-col gap-3">
        <FormInput
          type="number"
          placeholder="Phone number"
          required
          errors={[]}
        ></FormInput>
        <FormInput
          type="number"
          placeholder="Verification code"
          required
          errors={[]}
        ></FormInput>
        <FormButton loading={false} text="Verify"></FormButton>
      </form>
    </div>
  );
}
