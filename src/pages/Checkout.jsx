import React, { Component } from 'react';
import { FaCreditCard, FaBarcode, FaCcVisa, FaCcMastercard } from 'react-icons/fa';
import { SiAmericanexpress } from 'react-icons/si';
import { Redirect } from 'react-router-dom';
import '../styles/Checkout.css';
import CartItem from '../components/CartItem';
import Header from '../components/Header';
import * as cartFunction from '../services/saveShoppingCart';
import InputRadio from '../components/InputRadio';

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
        <section className="checkout-form-sect">
          <section className="checkout-cart">
            {
              cartItems.map((prod) => <CartItem key={ prod.id } product={ prod } />)
            }
            <section className="checkout-total-sect">
              <p className="checkout-total">{ `Total: R$ ${newTotal}` }</p>
              <p className="checkout-total">{ `Qtd: ${buying}` }</p>
            </section>
          </section>
          <form className="checkout-form">
            <fieldset className="checkout-fieldset">
              <legend className="checkout-legend">Informações do Comprador</legend>
              <input
                className="checkout-input"
                type="text"
                placeholder="Nome completo"
                data-testid="checkout-fullname"
                name="fullName"
                value={ fullName }
                onChange={ this.handleChange }
              />
              <input
                className="checkout-input"
                type="email"
                placeholder="Email"
                data-testid="checkout-email"
                name="email"
                value={ email }
                onChange={ this.handleChange }
              />
              <input
                className="checkout-input"
                type="text"
                placeholder="___.___.___-__"
                data-testid="checkout-cpf"
                name="cpf"
                value={ cpf }
                minLength="11"
                maxLength="11"
                onChange={ this.handleChange }
              />
              <input
                className="checkout-input"
                type="text"
                placeholder="(00) 0000-0000"
                data-testid="checkout-phone"
                name="phone"
                value={ phone }
                onChange={ this.handleChange }
              />
              <input
                className="checkout-input"
                type="text"
                placeholder="00000-000"
                data-testid="checkout-cep"
                name="cep"
                value={ cep }
                onChange={ this.handleChange }
              />
              <input
                className="checkout-input"
                type="text"
                placeholder="Endereço"
                data-testid="checkout-address"
                name="address"
                value={ address }
                onChange={ this.handleChange }
              />
            </fieldset>
            <fieldset className="checkout-fieldset">
              <legend className="checkout-legend">Método de pagamento</legend>
              <InputRadio
                id="boleto"
                text="Boleto"
                childComp={ <FaBarcode className="checkout-icon" /> }
              />
              <InputRadio
                id="visa"
                text="Visa"
                childComp={ <FaCcVisa className="checkout-icon" /> }
              />
              <InputRadio
                id="master"
                text="MasterCard"
                childComp={ <FaCcMastercard className="checkout-icon" /> }
              />
              <InputRadio
                id="elo"
                text="Elo"
                childComp={ <FaCreditCard className="checkout-icon" /> }
              />
              <InputRadio
                id="american"
                text="American Express"
                childComp={ <SiAmericanexpress className="checkout-icon" /> }
              />
            </fieldset>
            <button
              className="checkout-btn"
              type="button"
              onClick={ this.handleClick }
            >
              Finalizar Compra
            </button>
          </form>
        </section>
        { clicked && <Redirect to="/" /> }
      </div>
    );
  }
}
