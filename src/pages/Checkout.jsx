import React, { Component } from 'react';
import { FaCreditCard, FaBarcode, FaCcVisa, FaCcMastercard } from 'react-icons/fa';
import { SiAmericanexpress } from 'react-icons/si';
import { Redirect } from 'react-router-dom';

import CartItem from '../components/CartItem';
import Header from '../components/Header';
import * as cartFunction from '../services/saveShoppingCart';

export default class Checkout extends Component {
  constructor() {
    super();

    this.state = {
      fullName: '',
      email: '',
      cpf: '',
      phone: '',
      cep: '',
      address: '',
      cartItems: cartFunction.getShoppingCart(),
      clicked: false,
    };
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  }

  handleClick = (event) => {
    event.preventDefault();
    const { cartItems } = this.state;
    cartItems.forEach((item) => cartFunction.removeItem(item));
    localStorage.setItem('catId', '');
    localStorage.setItem('query', '');
    this.setState({
      fullName: '',
      email: '',
      cpf: '',
      phone: '',
      cep: '',
      address: '',
      cartItems: [],
      clicked: true,
    });
  }

  render() {
    const { fullName, email, cpf, phone, cep, address, cartItems, clicked } = this.state;
    const buying = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const total = cartItems
      .reduce((acc, { price, quantity }) => acc + (price * quantity), 0);
    const newTotal = total ? total.toFixed(2).replace(/\./gm, ',') : total;
    return (
      <div>
        <Header title="Checkout" quantity={ buying } />
        <section>
          {
            cartItems.map((prod) => <CartItem key={ prod.id } product={ prod } />)
          }
          <p>{ `Total: R$ ${newTotal}` }</p>
        </section>
        <form>
          <fieldset>
            <legend>Imformações do Comprador</legend>
            <input
              type="text"
              placeholder="Nome completo"
              data-testid="checkout-fullname"
              name="fullName"
              value={ fullName }
              onChange={ this.handleChange }
            />
            <input
              type="email"
              placeholder="Email"
              data-testid="checkout-email"
              name="email"
              value={ email }
              onChange={ this.handleChange }
            />
            <input
              type="text"
              placeholder="CPF"
              data-testid="checkout-cpf"
              name="cpf"
              value={ cpf }
              minLength="11"
              maxLength="11"
              onChange={ this.handleChange }
            />
            <input
              type="text"
              placeholder="(00) 0000-0000"
              data-testid="checkout-phone"
              name="phone"
              value={ phone }
              onChange={ this.handleChange }
            />
            <input
              type="text"
              placeholder="00000-000"
              data-testid="checkout-cep"
              name="cep"
              value={ cep }
              onChange={ this.handleChange }
            />
            <input
              type="text"
              placeholder="Endereço"
              data-testid="checkout-address"
              name="address"
              value={ address }
              onChange={ this.handleChange }
            />
          </fieldset>
          <fieldset>
            <legend>Método de pagamento</legend>
            <label htmlFor="boleto">
              <input type="radio" name="pay-method" id="boleto" />
              <FaBarcode />
            </label>
            <label htmlFor="visa">
              <input type="radio" name="pay-method" id="visa" />
              VISA
              <FaCcVisa />
            </label>
            <label htmlFor="master">
              <input type="radio" name="pay-method" id="master" />
              MasterCard
              <FaCcMastercard />
            </label>
            <label htmlFor="elo">
              <input type="radio" name="pay-method" id="elo" />
              Elo
              <FaCreditCard />
            </label>
            <label htmlFor="american">
              <input type="radio" name="pay-method" id="american" />
              American Express
              <SiAmericanexpress />
            </label>
          </fieldset>
          <button type="button" onClick={ this.handleClick }>Finalizar Compra</button>
        </form>
        { clicked && <Redirect to="/" /> }
      </div>
    );
  }
}
