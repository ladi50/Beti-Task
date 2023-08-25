export {};

declare global {
  interface Book {
    id?: string;
    author?: string;
    name?: string;
    ownerId?: string;
  }
}
