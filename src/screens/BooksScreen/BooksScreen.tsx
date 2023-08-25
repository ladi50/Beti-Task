import React from "react";

import { useBooksScreen } from "./BooksScreen.ctrl";

import Books from "containers/Books/Books";
import Input from "components/Input/Input";
import Button from "components/Button/Button";

const BooksScreen = () => {
  const { handleAddBookClick, values, handleInputChange, isButtonDisabled } =
    useBooksScreen();

  return (
    <div>
      <Books />

      <Input
        id="author"
        label="Book Author"
        placeholder="Enter book author"
        value={values.author as string}
        onChange={handleInputChange}
      />

      <Input
        id="name"
        label="Book Name"
        placeholder="Enter book name"
        value={values.name as string}
        onChange={handleInputChange}
      />

      <Button
        type="submit"
        title="Add Book"
        onClick={handleAddBookClick}
        disabled={isButtonDisabled}
      />
    </div>
  );
};

export default BooksScreen;
