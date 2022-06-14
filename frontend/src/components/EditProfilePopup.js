import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ onUpdateUser, isOpen, onClose }) {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    // Подписка на контекст
    const currentUser = React.useContext(CurrentUserContext);

    // После загрузки текущего пользователя из API
    // его данные будут использованы в управляемых компонентах.
    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    // Обработчик изменения инпута обновляет стейт
    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm name="edit-profile" title="Редактировать профиль" button="Сохранить"
            isOpen={isOpen}
            onSubmit={handleSubmit}
            onClose={onClose}>
            <input type="text" value={name || ''} onChange={handleNameChange} name="name" className="popup__input" id="name" minLength="2" maxLength="40" placeholder="Имя"
                required />
            <span id="name-error" className="popup__error" />
            <input type="text" value={description || ''} onChange={handleDescriptionChange} className="popup__input" id="about"
                name="about" minLength="2" placeholder="Описание"
                maxLength="200" required />
            <span id="about-error" className="popup__error" /> </PopupWithForm>
    )
}

export default EditProfilePopup;