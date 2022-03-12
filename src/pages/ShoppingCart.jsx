import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as cartFunctions from '../services/saveShoppingCart';
import CartItem from '../components/CartItem';
import Loading from '../components/Loading';

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
    let { id, title, price, thumbnail, quantity } = product;
    if (quantity === 0) quantity = 0;
    else quantity = quantity - 1;
    const newProd = { id, title, price, thumbnail, quantity };
    if(quantity === 0) {
      alert('Esse produto será removido do seu carrinho');
      cartFunctions.removeItem(newProd);
    }
    else cartFunctions.updateItem(newProd);
    this.setState({ loading: true }, () => {
      this.setState({
        products: cartFunctions.getShoppingCart(),
        loading: false })
    })
    
    
  }

  addQuantity = (product) => {
    // const { products } = this.state;
    let { id, title, price, thumbnail, quantity } = product;
    quantity = quantity + 1;
    const newProd = { id, title, price, thumbnail, quantity };
    cartFunctions.updateItem(newProd);
    this.setState({ loading: true }, () => {
      this.setState({ products: cartFunctions.getShoppingCart(),
        loading: false })
    })
  }

  deleteProd = (product) => {
    cartFunctions.removeItem(product);
    this.setState({ loading: true }, () => {
      this.setState({ products: cartFunctions.getShoppingCart(),
        loading: false });
    })
  }

  render() {
    const { products, loading } = this.state;
    const total = products.reduce((acc, { price, quantity }) => acc + (price * quantity), 0);
    return (
      <section>
        <Link to="/"> HOME </Link>
        {loading ? <Loading /> : (
          products.length === 0 ? (
            <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
          ) : (
            <section>
              {products.map((product) => (
                <section key={ product.id }>
                  <button
                    type="button"
                    onClick={ () => this.deleteProd(product) }
                  >
                    X
                  </button>
                  <CartItem
                    product={ product }
                  />
                  <button
                    type="button"
                    onClick={ () => this.removeQuantity(product) }
                  >
                    -
                  </button>
                  <p data-testid="shopping-cart-product-quantity">
                    { `Un: ${product.quantity}` }
                  </p>
                  <button
                    type="button"
                    onClick={ () => this.addQuantity(product) }
                  >
                    +
                  </button>
                </section>
              ))}
              <p>{`Valor final: R$ ${total.toFixed(2).replace(/\./gm, ',')}`}</p>
            </section>
          )
        )}
      </section>
    );
  }
}

// Requisito 3 feito por Pedro Henrique Moura e Victor Bariatto Reksidler
