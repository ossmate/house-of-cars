import { createAPIPath } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

export const signInSchema = z.object({
  login: z.string().min(1, "Login is required"),
  password: z.string().min(1, "Password is required"),
});

export type SignInTypeSchema = z.infer<typeof signInSchema>;

export const useSignInMutation = () => {
  const signInRequest = async (
    formData: SignInTypeSchema,
  ): Promise<{ data: { token: string; userId: string } }> => {
    try {
      const response = await fetch(`http://localhost:5000/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData }),
      });

      if (!response.ok) {
        throw response;
      }

      const data = await response.json();
      return { data };
    } catch (error: unknown) {
      if (error instanceof Response) {
        const errorData = await error.json();
        throw errorData;
      } else {
        throw new Error("An error occurred while signing in.");
      }
    }
  };

  const signInMutation = useMutation({
    mutationFn: (formData: SignInTypeSchema) => signInRequest(formData),
    onSuccess: ({ data }) => {
      sessionStorage.setItem("token", data?.token);
      sessionStorage.setItem("userId", data?.userId);
    },
    onError: (error) => {
      console.error("Error during sign in:", error);
    },
  });

  return { signInMutation };
};
