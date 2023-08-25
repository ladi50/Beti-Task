import { FormEvent, useMemo, useState } from "react";

import booksStore from "containers/Books/Books.model";

export const useBooksScreen = () => {
  const [values, setValues] = useState<Book>({
    name: "",
    author: ""
  });

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

  return { handleAddBookClick, values, handleInputChange, isButtonDisabled };
};
