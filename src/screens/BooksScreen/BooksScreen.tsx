import React from "react";

import { BooksType } from "./BooksScreen.type";
import { useBooksScreen } from "./BooksScreen.ctrl";

import Books from "containers/Books/Books";
import Input from "components/Input/Input";
import Button from "components/Button/Button";

import "./BooksScreen.scss";
import { observer } from "mobx-react";

const BooksScreen = () => {
  const {
    handleAddBookClick,
    values,
    handleInputChange,
    isButtonDisabled,
    handleBookTypeClick,
    getButtonClassName
  } = useBooksScreen();

  return (
    <div>
      {/* Buttons to switch between public and private books */}
      <Button
        className={getButtonClassName(BooksType.PUBLIC)}
        type="button"
        title="Public Books"
        onClick={() => handleBookTypeClick(BooksType.PUBLIC)}
      />

      <Button
        className={getButtonClassName(BooksType.PRIVATE)}
        type="button"
        title="Private Books"
        onClick={() => handleBookTypeClick(BooksType.PRIVATE)}
      />

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

export default observer(BooksScreen);
