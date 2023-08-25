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
      const response = await this.httpGateway.get("/");

      if (!Array.isArray(response)) throw Error();

      this.list = response;
    } catch (err) {}
  }

  @action async addBook(data: Book) {
    try {
      const response = await this.httpGateway.post("/books", data);

      console.log("added book ", response);
    } catch (err) {}
  }
}

const booksStore = new BooksStore();

export default booksStore;
