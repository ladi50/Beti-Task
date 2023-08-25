import { BooksStore } from "containers/Books/Books.model";
import { BooksType } from "./BooksScreen.type";

describe("BooksStore", () => {
  let booksStore: BooksStore;

  beforeEach(() => {
    booksStore = new BooksStore();
  });

  it("should initialize with empty public and private arrays", async () => {
    expect(booksStore.list).toHaveLength(0);
    expect(booksStore.privateList).toHaveLength(0);
    expect(booksStore.visibleList).toHaveLength(0);
  });

  it("should initialize with selected book type 'PUBLIC'", async () => {
    expect(booksStore.selectedBookType).toBe(BooksType.PUBLIC);
  });

  it("should add a new book", async () => {
    await booksStore.getBooks();

    const oldListLength = booksStore.list.length;

    const bookName = "Book";
    const AuthorName = "Author";

    await booksStore.addBook({ name: bookName, author: AuthorName });

    expect(booksStore.list.length - oldListLength).toBe(1);

    const latestBook = booksStore.list[booksStore.list.length - 1];

    expect(latestBook.name).toBe(bookName);
    expect(latestBook.author).toBe(AuthorName);
  });

  it("should change selected books type", async () => {
    await booksStore.changeVisibleList(BooksType.PRIVATE);

    expect(booksStore.selectedBookType).toBe(BooksType.PRIVATE);
    expect(booksStore.privateList).toEqual(booksStore.visibleList);
  });
});
