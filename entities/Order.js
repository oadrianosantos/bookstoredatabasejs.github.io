module.exports = class Order {
  #total;
  #itens;
  #user;

  constructor(itens, user) {
    itens.forEach(({ product, qtd }) => {
      if (qtd > product.inStock) {
        throw new Error("Quantidade insuficiente em estoque");
      }
    });
    this.#itens = itens;
    this.#user = user;
    this.#total = itens.reduce(
      (sum, { product, qtd }) => sum + product.price * qtd,
      0
    );
  }

  get data() {
    return { itens: this.#itens, user: this.#user, total: this.#total };
  }
};
