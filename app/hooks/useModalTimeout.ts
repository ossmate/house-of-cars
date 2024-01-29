import { useEffect, useState } from "react";

export const useModalTimeout = () => {
  const [modalTimeoutId, setModalTimeoutId] = useState<number | null>(null);

  useEffect(
    function showModal() {
      return () => {
        if (modalTimeoutId) {
          clearTimeout(modalTimeoutId);
        }
      };
    },
    [modalTimeoutId],
  );

  return { modalTimeoutId, setModalTimeoutId };
};
