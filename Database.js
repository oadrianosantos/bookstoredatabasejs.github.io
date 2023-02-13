module.exports = class Database {
  #storage = {
    authors: [],
    books: [],
    posters: [],
    orders: [],
    users: [],
  };
  find(key) {
    return this.#storage[key];
  }

  saveAuthor(author) {
    this.#storage.authors.push(author);
  }

  findBookByName(bookName) {
    return this.#storage.books.find((b) => b.name === bookName);
  }

  saveBook(book) {
    const bookExists = this.findBookByName(book.name);
    if (!bookExists) {
      this.#storage.books.push(book);
    }
  }

  addBookToStock(bookName, qtd) {
    const book = this.findBookByName(bookName);
    book?.addToStock(qtd);
  }

  removeBookToStock(bookName, qtd) {
    const book = this.findBookByName(bookName);
    book?.removeFromStock(qtd);
  }

  findPosterByName(posterName) {
    return this.#storage.posters.find((p) => p.name === posterName);
  }

  savePoster(poster) {
    const PosterExists = this.findPosterByName(poster.name);
    if (!PosterExists) {
      this.#storage.posters.push(poster);
    }
  }

  addPosterToStock(posterName, qtd) {
    const poster = this.findPosterByName(posterName);
    poster?.addToStock(qtd);
  }

  removePosterToStock(posterName, qtd) {
    const poster = this.findPosterByName(posterName);
    poster?.removeFromStock(qtd);
  }

  saveUser(user) {
    const userExists = this.#storage.users.find((u) => u.email === user.email);
    if (!userExists) {
      this.#storage.users.push(user);
    }
  }
  saveOrder(order) {
    this.#storage.orders.push(order);
  }

  showStorage() {
    console.table(this.#storage.authors);
    console.table(this.#storage.books);
    console.table(this.#storage.posters);
    console.table(this.#storage.users);
    console.table(this.#storage.orders.map((order) => order.data));
  }
};
