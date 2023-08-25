import { MouseEvent } from "react";

export {};

declare global {
  interface Button {
    title: string;
    type?: "button" | "submit";
    onClick: (e: MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
  }
}
