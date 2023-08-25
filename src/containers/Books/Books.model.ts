import { action, makeAutoObservable, observable, runInAction } from "mobx";

import ApiGateway from "shared/ApiGateway";
import { BooksType } from "screens/BooksScreen/BooksScreen.type";

export class BooksStore {
  constructor() {
    makeAutoObservable(this);
    this.httpGateway = new ApiGateway();
  }

  httpGateway;

  @observable list: Book[] = [];
  @observable privateList: Book[] = [];
  @observable visibleList: Book[] = [];
  @observable selectedBookType: BooksType = BooksType.PUBLIC;

  @action async getBooks(setInitialList = false) {
    try {
      const response: Book[] | Error = await this.httpGateway.get("/");

      if (!Array.isArray(response)) throw Error();

      runInAction(async () => {
        this.list = response;

        if (setInitialList) {
          // Set initial books list to render
          await this.changeVisibleList(BooksType.PUBLIC);
        }
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

      // Set selected list to show updated book list
      await this.changeVisibleList(this.selectedBookType);
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
