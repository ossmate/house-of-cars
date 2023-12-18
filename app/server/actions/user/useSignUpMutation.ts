import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

export const signUpSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

export type SignUpTypeSchema = z.infer<typeof signUpSchema>;

export const useSignUpMutation = () => {
  const signUpRequest = async (formData: SignUpTypeSchema) => {
    try {
      const response = await fetch(`http://localhost:5000/signup`, {
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
        throw new Error("An error occurred while signing up.");
      }
    }
  };

  const signUpMutation = useMutation({
    mutationFn: (formData: SignUpTypeSchema) => signUpRequest(formData),
    onError: (error) => {
      console.error("Error during sign up:", error);
    },
  });

  return { signUpMutation };
};
