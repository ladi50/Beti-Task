import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";

import { BooksType } from "./BooksScreen.type";
import booksStore from "containers/Books/Books.model";

export const useBooksScreen = () => {
  const [values, setValues] = useState<Book>({
    name: "",
    author: ""
  });

  // Fetch books on mount
  useEffect(() => {
    booksStore.getBooks();
    booksStore.getPrivateBooks();
  }, []);

  const isButtonDisabled = useMemo(
    () => !values.name || !values.author,
    [values]
  );

  const handleInputChange = (event: FormEvent<HTMLInputElement>) => {
    const { id, value } = event.currentTarget;

    setValues((prevState) => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleAddBookClick = async () => {
    await booksStore.addBook(values);
  };

  const handleBookTypeClick = async (type: BooksType) => {
    booksStore.changeVisibleList(type);
  };

  const getButtonClassName = useCallback((type: BooksType) => {
    let value = "booksScreen__button";

    if (type === booksStore.selectedBookType) {
      value += " booksScreen__selectedButton";
    }

    return value;
  }, []);

  return {
    handleAddBookClick,
    values,
    handleInputChange,
    isButtonDisabled,
    handleBookTypeClick,
    getButtonClassName
  };
};
