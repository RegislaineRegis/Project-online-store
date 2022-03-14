import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as cartFunctions from '../services/saveShoppingCart';
import CartItem from '../components/CartItem';
import Loading from '../components/Loading';
import Header from '../components/Header';

export default class ShoppingCart extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      loading: false,
    };
  }

  componentDidMount() {
    const products = cartFunctions.getShoppingCart();
    this.setState({ products });
  }

  removeQuantity = (product) => {
    const { id, title, price, thumbnail, availableQuantity } = product;
    let { quantity } = product;
    quantity = quantity === 0 ? 0 : quantity - 1;
    console.log('rmv', quantity)
    const newProd = { id, title, price, thumbnail, quantity, availableQuantity };
    if (quantity === 0) {
      alert('Esse produto será removido do seu carrinho');
      cartFunctions.removeItem(newProd);
    } else cartFunctions.updateItem(newProd);
    this.setState({ loading: true }, () => {
      this.setState({
        products: cartFunctions.getShoppingCart(),
        loading: false });
    });
  }

  addQuantity = (product) => {
    const { id, title, price, thumbnail, availableQuantity } = product;
    let { quantity } = product;

    quantity = quantity < availableQuantity ? quantity + 1 : availableQuantity;
    const newProd = { id, title, price, thumbnail, quantity, availableQuantity };
    cartFunctions.updateItem(newProd);
    this.setState({ loading: true }, () => {
      this.setState({ products: cartFunctions.getShoppingCart(),
        loading: false });
    });
  }

  deleteProd = (product) => {
    cartFunctions.removeItem(product);
    this.setState({ loading: true }, () => {
      this.setState({ products: cartFunctions.getShoppingCart(),
        loading: false });
    });
  }

  emptyCart = () => {
    const { products } = this.state;
    this.setState({ loading: true }, () => {
      products.forEach((prod) => cartFunctions.removeItem(prod));
      this.setState({
        products: cartFunctions.getShoppingCart(),
        loading: false,
      });
    });
  }

  render() {
    const { products, loading } = this.state;
    const total = products
      .reduce((acc, { price, quantity }) => acc + (price * quantity), 0);
    const newTotal = total ? total.toFixed(2).replace(/\./gm, ',') : total;
    const quantity = products.reduce((acc, prod) => acc + prod.quantity, 0);
    return (
      <section>
        <Header quantity={ quantity } title="Carrinho" />
        {loading && <Loading />}
        {(!loading && products.length === 0 ? (
          <p
            data-testid="shopping-cart-empty-message"
            className="empty-message"
          >
            Seu carrinho está vazio
          </p>
        ) : (
          <section className="cart-items-sect">
            <section className="cart-cards-sect">
              {products.map((product) => (
                <section className="cart-item-card" key={ product.id }>
                  <button
                    className="delete-btn"
                    type="button"
                    onClick={ () => this.deleteProd(product) }
                  >
                    X
                  </button>
                  <CartItem
                    product={ product }
                  />
                  <section className="cart-qtd-btn-sect">
                    <button
                      className="cart-less-btn"
                      type="button"
                      data-testid="product-decrease-quantity"
                      onClick={ () => this.removeQuantity(product) }
                    >
                      -
                    </button>
                    <button
                      className="cart-more-btn"
                      type="button"
                      data-testid="product-increase-quantity"
                      onClick={ () => this.addQuantity(product) }
                    >
                      +
                    </button>
                  </section>
                </section>
              ))}
            </section>
            <section className="total-btn-sect">
              <section className="cart-total-sect">
                <p className="cart-total">Valor final:</p>
                <p>{`R$ ${newTotal}`}</p>
              </section>
              <section className="btn-sect">
                <button className="final-btn" type="button">
                  <Link to="/checkout" data-testid="checkout-products">
                    Finalizar compra
                  </Link>
                </button>
                <button className="clean-btn" type="button" onClick={ this.emptyCart }>
                  Esvaziar carrinho
                </button>
              </section>
            </section>
          </section>
        )
        )}
      </section>
    );
  }
}

// Requisito 3 feito por Pedro Henrique Moura e Victor Bariatto Reksidler
