import React from "react";
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ onAddPlace, isOpen, onClose }) {

    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    React.useEffect(() => {
        setName('')
        setLink('')
    }, [isOpen])

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleLinkChange(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        onAddPlace({
            name,
            link,
        })
    }

    return (
        <PopupWithForm name="add-place" title="Новое место" button="Создать"
            isOpen={isOpen}
            onSubmit={handleSubmit}
            onClose={onClose}>
            <input required type="text" value={name || ''} onChange={handleNameChange} className="popup__input" id="cardtitle"
                placeholder="Название" minLength="2" maxLength="30" />
            <span id="cardtitle-error" className="popup__error" />
            <input required type="url" value={link || ''} onChange={handleLinkChange} className="popup__input" id="link"
                placeholder="Ссылка на картинку" />
            <span id="link-error" className="popup__error" /> </PopupWithForm>
    )
}

export default AddPlacePopup;