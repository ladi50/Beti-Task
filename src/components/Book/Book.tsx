import React from "react";

const Book: React.FC<Book> = ({ author, name }) => {
  if (!author || !name) return <></>;

  return (
    <div>
      {author}: {name}
    </div>
  );
};

export default Book;
