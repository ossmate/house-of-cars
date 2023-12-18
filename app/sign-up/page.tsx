"use client";

import { useForm } from "react-hook-form";
import {
  SignUpTypeSchema,
  signUpSchema,
  useSignUpMutation,
} from "../server/actions/user/useSignUpMutation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";

export default function SignIn() {
  const { signUpMutation } = useSignUpMutation();

  const handleSignIn = async (formData: SignUpTypeSchema) => {
    const result = signUpSchema.safeParse(formData);

    if (!result.success) {
      throw new Error(`An error occurred while parsing the sign up form data.`);
    }

    signUpMutation.mutate(formData);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<SignUpTypeSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  return (
    <main className="flex justify-start min-h-screen flex-col items-center  p-24">
      <p>sign up to app</p>

      <form onSubmit={handleSubmit(handleSignIn)} className=" flex flex-col">
        <label htmlFor="login">Username</label>
        <input
          id="username"
          type="text"
          disabled={signUpMutation.isPending}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          {...register("username")}
        />
        {errors?.username?.message && (
          <p className="text-sm text-red-400">{errors?.username?.message}</p>
        )}

        <label htmlFor="login">Email</label>
        <input
          id="email"
          type="email"
          disabled={signUpMutation.isPending}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          {...register("email")}
        />
        {errors?.email?.message && (
          <p className="text-sm text-red-400">{errors?.email?.message}</p>
        )}

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          disabled={signUpMutation.isPending}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          {...register("password")}
        />
        {errors?.password?.message && (
          <p className="text-sm text-red-400">{errors?.password?.message}</p>
        )}

        <Button
          type="submit"
          disabled={signUpMutation.isPending || !isDirty}
          className="flex justify-center mt-5 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Submit
        </Button>

        {signUpMutation.error?.message && (
          <p className="text-sm text-red-400">
            {signUpMutation.error?.message}
          </p>
        )}
      </form>
    </main>
  );
}
