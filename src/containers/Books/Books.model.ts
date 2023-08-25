import { action, observable } from "mobx";

import ApiGateway from "shared/ApiGateway";

export class BooksStore {
  constructor() {
    this.httpGateway = new ApiGateway();
  }

  httpGateway;

  @observable list: Book[] = [];

  @action async getBooks() {
    try {
      const response: Book[] | Error = await this.httpGateway.get("/");

      if (!Array.isArray(response)) throw Error();

      this.list = response;
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
    } catch (err) {}
  }
}

const booksStore = new BooksStore();

export default booksStore;
