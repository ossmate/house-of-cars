import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

export const signInSchema = z.object({
  login: z.string().min(1, "Login is required"),
  password: z.string().min(1, "Password is required"),
});

export type SignInTypeSchema = z.infer<typeof signInSchema>;

export const useSignInMutation = () => {
  const { setAuthState } = useAuthProvider();

  const signInRequest = async (
    formData: SignInTypeSchema,
  ): Promise<{ data: { token: string; userId: string; iat: number } }> => {
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
    onSuccess: async ({ data }) => {
      localStorage.setItem("token", data?.token);
      localStorage.setItem("userId", data?.userId);
      localStorage.setItem("iat", String(data?.iat));

      setAuthState({
        userId: data?.userId,
        jwtToken: data?.token,
        iat: data?.iat,
      });
    },
    onError: (error) => {
      console.error("Error during sign in:", error);
    },
  });

  return { signInMutation };
};
