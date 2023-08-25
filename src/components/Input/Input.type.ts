import { FormEvent } from "react";

export {};

declare global {
  interface Input {
    id: string;
    type?: "text" | "tel" | "password" | "date";
    label?: string;
    placeholder?: string;
    value: string | number;
    onChange: (e: FormEvent<HTMLInputElement>) => void;
  }
}
