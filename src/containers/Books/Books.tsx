import React from "react";
import { observer } from "mobx-react";

import booksStore from "./Books.model";
import { useBooks } from "./Books.ctrl";

import Book from "components/Book/Book";

const Books = () => {
  useBooks();

  return (
    <div>
      {booksStore.list.map((item, index: number) => (
        <Book key={index} {...item} />
      ))}
    </div>
  );
};

export default observer(Books);
