const Database = require("./Database");
const Author = require("./entities/Author");
const Book = require("./entities/Book");
const Order = require("./entities/Order");
const Poster = require("./entities/Poster");
const User = require("./entities/User");

module.exports = class App {
  static #database = new Database();

  createUser(nome, email, senha) {
    const user = new User(nome, email, senha);
    App.#database.saveUser(user);
  }

  getUsers() {
    return App.#database.find("users");
  }
  createAuthor(name, nationality, bio) {
    const author = new Author(name, nationality, bio);
    App.#database.saveAuthor(author);
  }

  getAuthors() {
    return App.#database.find("authors");
  }

  getBooks() {
    return App.#database.find("books");
  }

  getPosters() {
    return App.#database.find("posters");
  }

  createBook(
    title,
    synopsis,
    genre,
    pages,
    author,
    description,
    price,
    inStock
  ) {
    const book = new Book(
      title,
      synopsis,
      genre,
      pages,
      author,
      description,
      price,
      inStock
    );
    App.#database.saveBook(book);
  }

  addBook(bookName, qtd) {
    App.#database.addBookToStock(bookName, qtd);
  }

  createPoster(name, description, heigth, width, price, inStock) {
    const poster = new Poster(name, description, heigth, width, price, inStock);
    App.#database.savePoster(poster);
  }

  addPoster(posterName, qtd) {
    App.#database.addPosterToStock(posterName, qtd);
  }

  createOrder(itens, user) {
    const order = new Order(itens, user);
    App.#database.saveOrder(order);
    order.data.itens.forEach(({ product, qtd }) => {
      if (product instanceof Book) {
        App.#database.removeBookToStock(product.name, qtd);
      } else if (product instanceof Poster) {
        App.#database.removePosterToStock(product.name, qtd);
      }
    });
  }
  getOrder() {
    return App.#database.find("orders");
  }

  showDatabase() {
    App.#database.showStorage();
  }
};
