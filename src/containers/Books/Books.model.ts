import { action, observable, runInAction } from "mobx";
import { BooksType } from "screens/BooksScreen/BooksScreen.type";

import ApiGateway from "shared/ApiGateway";

export class BooksStore {
  constructor() {
    this.httpGateway = new ApiGateway();
  }

  httpGateway;

  @observable list: Book[] = [];
  @observable privateList: Book[] = [];
  @observable visibleList: Book[] = this.list;
  @observable selectedBookType: BooksType = BooksType.PUBLIC;

  @action async getBooks() {
    try {
      const response: Book[] | Error = await this.httpGateway.get("/");

      if (!Array.isArray(response)) throw Error();

      runInAction(() => {
        this.list = response;
      });
    } catch (err) {}
  }

  @action async getPrivateBooks() {
    try {
      const response: Book[] | Error = await this.httpGateway.get("/private");

      if (!Array.isArray(response)) throw Error();

      runInAction(() => {
        this.privateList = response;
      });
    } catch (err) {}
  }

  @action async addBook(data: Book) {
    try {
      const response: AddBookResponse[] | Error = await this.httpGateway.post(
        "/",
        data
      );

      if ((response as AddBookResponse)?.status !== "ok") throw Error();

      // Fetch updated books
      await this.getBooks();
      await this.getPrivateBooks();
    } catch (err) {}
  }

  @action async changeVisibleList(type: BooksType) {
    try {
      if (type === BooksType.PUBLIC) {
        this.visibleList = this.list;
        this.selectedBookType = BooksType.PUBLIC;
      } else {
        this.visibleList = this.privateList;
        this.selectedBookType = BooksType.PRIVATE;
      }
    } catch (err) {}
  }
}

const booksStore = new BooksStore();

export default booksStore;
