import { createAPIPath } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

export const signInSchema = z.object({
  login: z.string().min(1, "Login is required"),
  password: z.string().min(1, "Password is required"),
});

export type SignInTypeSchema = z.infer<typeof signInSchema>;

export const useSignInMutation = () => {
  const signInRequest = (
    formData: SignInTypeSchema,
  ): Promise<{ data: { token: string; userId: string } }> =>
    fetch(`http://localhost:5000/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...formData }),
    }).then((res) => res.json());

  const signInMutation = useMutation({
    mutationFn: (formData: SignInTypeSchema) => signInRequest(formData),
    onSuccess: ({ data }) => {
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);
    },
  });

  return { signInMutation };
};
