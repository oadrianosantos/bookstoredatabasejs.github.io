const Product = require("./Product");

module.exports = class Book extends Product {
  constructor(
    title,
    synopsis,
    genre,
    pages,
    author,
    description,
    price,
    inStock = 0
  ) {
    super(`Livro: ${title}`, description, price, inStock);
    this.title = title;
    this.synopsis = synopsis;
    this.pages = pages;
    this.author = author;
    this.genre = genre;
  }
};
