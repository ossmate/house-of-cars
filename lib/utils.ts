import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const uploadImageToCloudinary = async (
  imageFile: File,
): Promise<string> => {
  const cloudinaryFormData = new FormData();
  cloudinaryFormData.append("file", imageFile);
  cloudinaryFormData.append(
    "upload_preset",
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string,
  );

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: cloudinaryFormData,
    },
  );

  const file = await response.json();
  return file.secure_url;
};
