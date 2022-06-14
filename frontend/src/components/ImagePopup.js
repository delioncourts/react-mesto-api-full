import React from "react";

function ImagePopup(props) {
    return (
        <article className={`popup popup_${props.name} ${props.isOpen && "popup_opened"}`}>

            <div className="popup__container-open">
                <img className="popup__open-photo" alt={props.card.name} src={props.card.link} />
                <p className="popup__open-photo-subtitle">{props.card.name}</p>
                <button className="popup__close" aria-label="закрыть" type="button" onClick={props.onClose}></button>
            </div>
        </article>
    )
}

export default ImagePopup;