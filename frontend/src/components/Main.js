import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete, cards }) {

    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div style={{ backgroundImage: `url(${currentUser.avatar})` }} alt="фотография профиля" className="profile__avatar"></ div>
                <button onClick={onEditAvatar} type="button" className="profile__edit"></button>
                <div className="profile__info">
                    <div className="profile__container">
                        <h1 className="profile__title">{currentUser.name}</h1>
                        <button onClick={onEditProfile} className="profile__edit-button" type="button" aria-label="редактировать"></button>
                    </div>
                    <p className="profile__subtitle">{currentUser.about}</p>
                </div>
                <button onClick={onAddPlace} className="profile__add-button" type="button" aria-label="добавить"></button>
            </section>

            <section className="cards">
                <ul className="cards__grid">
                    {cards.map(card => (
                        <Card
                            card={card}
                            name={card.name}
                            link={card.link}
                            likes={card.likes}
                            key={card._id}
                            onCardClick={onCardClick}
                            onCardLike={onCardLike}
                            onCardDelete={onCardDelete} />))}
                </ul>
            </section>
        </main>
    )
}

export default Main;