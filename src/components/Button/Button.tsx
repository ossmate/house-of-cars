"use client";

import { ReactNode } from "react";
import { styled } from "../../../styled-system/jsx";

type Props = {
  children: string | ReactNode;
  onClick: () => void;
};

const Button = ({ children, onClick }: Props) => (
  <styled.button
    onClick={onClick}
    bg="blue.500"
    color="white"
    py="2"
    px="4"
    rounded="md"
  >
    {children}
  </styled.button>
);

export { Button };
