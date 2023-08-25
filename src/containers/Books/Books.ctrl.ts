import { useEffect } from "react";

import booksStore from "./Books.model";

export const useBooks = () => {
  // Fetch books on mount
  useEffect(() => {
    booksStore.getBooks();
  }, []);

  return {};
};
