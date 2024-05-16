import FormInput from "@/components/form-input";
import FormButton from "@/components/form-btn";
import SocialLogin from "@/components/social-login";

export default function Login() {
  const handleForm = async (formData: FormData) => {
    "use server";
    console.log(formData.get("email"), formData.get("password"));
    console.log("I run in the server");
  };

  return (
    <div className="flex flex-col gap-5 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">Log in with email and password</h2>
      </div>
      <form action={handleForm} className="flex flex-col gap-3">
        <FormInput
          name="email"
          type="email"
          placeholder="Email"
          required
          errors={[]}
        ></FormInput>
        <FormInput
          name="password"
          type="password"
          placeholder="Password"
          required
          errors={[]}
        ></FormInput>

        <FormButton loading={false} text="Create account"></FormButton>
      </form>
      <SocialLogin></SocialLogin>
    </div>
  );
}
