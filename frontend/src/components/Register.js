import React, { useState } from 'react';
import Auth from './Auth.js';
import { Link } from 'react-router-dom';

function Register({ onRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleEmail(evt) {
    setEmail(evt.target.value)
  }

  function handlePassword(evt) {
    setPassword(evt.target.value)
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister(password, email)
  }

  return (
    <div className="register">
      <Auth title={'Регистрация'} name={'register'} onSubmit={handleSubmit}>
        <input className="popup__input popup__input_type_auth" type="email" placeholder="Email" id="email"
          name="email" value={email || ''} onChange={handleEmail}
          minLength="2" maxLength="40" required />
        <span className="popup__error email-error"></span>

        <input className="popup__input popup__input_type_auth" type="password" placeholder="Пароль" id="password"
          name="password" value={password || ''} onChange={handlePassword}
          minLength="6" maxLength="200" required />
        <span className="popup__error password-error"></span>

        <button className={"popup__save popup__save_auth"} type="submit" >Зарегистрироваться</button>
        <p className={"popup__text"}>Уже зарегистрированы? <Link className={"popup__link"} to={'/signin'}>Войти</Link></p>
      </Auth>
    </div>
  )
}

export default Register; 