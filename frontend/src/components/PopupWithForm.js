import React from "react";

function PopupWithForm(props) {
    return (
        <div className={`popup popup_${props.name} ${props.isOpen && "popup_opened"}`}>
            <div className="popup__container">
                <h2 className="popup__heading">{props.title}</h2>
                <form name={props.name} className="popup__form" onSubmit={props.onSubmit}>
                    {props.children}
                    <button type="submit" className="popup__save">{props.button}</button>
                </form>
                <button className="popup__close" aria-label="закрыть" type="button" onClick={props.onClose}></button>
            </div>
        </div>
    )
}

export default PopupWithForm;
