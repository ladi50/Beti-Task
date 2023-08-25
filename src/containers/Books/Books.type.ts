export {};

declare global {
  interface AddBookResponse {
    status?: "ok" | "failure";
  }
}
