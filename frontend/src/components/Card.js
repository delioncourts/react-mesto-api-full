import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
    const currentUser = React.useContext(CurrentUserContext);

    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = card.owner._id === currentUser._id;

    // Создаём переменную, которую после зададим в `className` для кнопки удаления
    const cardDeleteButtonClassName = (
        `card__delete ${isOwn ? 'card__delete' : 'card__delete_hidden'}`
    );

    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = `card__like ${isLiked ? 'card__like-active' : ''} `;

    function handleClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
    }

    return (
        <li className="card">
            <button onClick={handleDeleteClick} className={cardDeleteButtonClassName} type="button" aria-label="удалить"></button>
            <img className="card__image" src={card.link} alt={card.name} onClick={handleClick} />
            <div className="card__description">
                <h2 className="card__title">{card.name}</h2>
                <div className="card__container">
                    <button onClick={handleLikeClick} className={cardLikeButtonClassName} type="button" aria-label="нравится"></button>
                    <div className="card__like-count">{card.likes.length}</div>
                </div>
            </div>
        </li>
    )
}

export default Card;