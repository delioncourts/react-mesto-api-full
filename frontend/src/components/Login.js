import React, { useState } from 'react';
import Auth from './Auth.js';

function Login({ onLogin }) {
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
    onLogin(password, email)
  }

  return (
    <Auth title={'Вход'} name={'login'} onSubmit={handleSubmit}>
      <input className="popup__input popup__input_type_auth" type="email" placeholder="Email" id="email"
        name="email" value={email || ''} onChange={handleEmail}
        minLength="2" maxLength="40" required />
      <span className="popup__error email-error"></span>

      <input className="popup__input popup__input_type_auth" type="password" placeholder="Пароль" id="password"
        name="password" value={password || ''} onChange={handlePassword}
        minLength="6" maxLength="200" required />
      <span className="popup__error password-error"></span>

      <button className={"popup__save popup__save_auth"} type="submit">Войти</button>
    </Auth>
  )
}

export default Login; 