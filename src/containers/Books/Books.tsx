import React from "react";
import { observer } from "mobx-react";
import booksStore from "./Books.model";

import Book from "components/Book/Book";

const Books = () => {
  return (
    <div>
      {booksStore.list.map((item, index: number) => (
        <Book key={index} {...item} />
      ))}
    </div>
  );
};

export default observer(Books);
