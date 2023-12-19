"use client";

import { useForm } from "react-hook-form";
import {
  SignInTypeSchema,
  signInSchema,
  useSignInMutation,
} from "../server/actions/user/useSignInMutation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const { signInMutation } = useSignInMutation();
  const { push } = useRouter();

  const handleSignIn = async (formData: SignInTypeSchema) => {
    const result = signInSchema.safeParse(formData);

    if (!result.success) {
      throw new Error(`An error occurred while parsing the sign in form data.`);
    }

    signInMutation.mutate(formData, {
      onSuccess: () => {
        push("/");
      },
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<SignInTypeSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      login: "",
      password: "",
    },
  });

  return (
    <main className="flex justify-start min-h-screen flex-col items-center  p-24">
      <p>sign in to app</p>

      <form onSubmit={handleSubmit(handleSignIn)} className=" flex flex-col">
        <label htmlFor="login">Login</label>
        <input
          id="login"
          type="text"
          disabled={signInMutation.isPending}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          {...register("login")}
        />
        {errors?.login?.message && (
          <p className="text-sm text-red-400">{errors?.login?.message}</p>
        )}

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          disabled={signInMutation.isPending}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          {...register("password")}
        />
        {errors?.password?.message && (
          <p className="text-sm text-red-400">{errors?.password?.message}</p>
        )}

        <Button
          type="submit"
          disabled={signInMutation.isPending || !isDirty}
          className="flex justify-center mt-5 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Submit
        </Button>

        {signInMutation.error?.message && (
          <p className="text-sm text-red-400">
            {signInMutation.error?.message}
          </p>
        )}
      </form>
    </main>
  );
}
