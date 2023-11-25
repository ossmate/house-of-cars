"use client";

import { createCar } from "@/app/api/car/route";
import { useFormStatus, useFormState } from "react-dom";

const formConfig = [
  {
    id: "brand",
    label: "Brand",
    type: "text",
  },
  {
    id: "model",
    label: "Model",
    type: "text",
  },
  {
    id: "generation",
    label: "Generation",
    type: "text",
  },
  {
    id: "engine",
    label: "Engine",
    type: "text",
  },
  {
    id: "price",
    label: "Price",
    type: "number",
  },
];

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" aria-disabled={pending}>
      Add
    </button>
  );
}

export const AddNewCar = () => {
  const [state2, formAction2] = useFormState(createCar, null);

  return (
    <div>
      <form action={formAction2} className="flex flex-col">
        {formConfig.map(({ id, label, type }) => (
          <span key={id}>
            <label htmlFor={id} key={id}>
              {label}
            </label>
            <input
              id={id}
              name={id}
              type={type}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </span>
        ))}
        <select id="isHighlighted" name="isHighlighted">
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
        <button
          type="submit"
          className="flex justify-center mt-5 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          create
        </button>
      </form>
    </div>
  );
};
