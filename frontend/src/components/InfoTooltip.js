import React from "react";

export default function InfoTooltip({ isOpen, onClose, imgPath, title }) {
    return (
        <div className={`popup popup_type_tooltip ${isOpen && "popup_opened"}`}>
            <div className="popup__container-tooltip">
                <button className="popup__close" aria-label="закрыть" type="button" onClick={onClose}></button>
                <div className="popup__wrapper">
                    <img className="popup__open-tooltip" alt={imgPath} src={imgPath} />
                    <h2 className="popup__heading-toolip">{title}</h2>
                </div>
            </div>
        </div>
    );
}

//Вы успешно зарегистрировались
//Что-то пошло не так! Попробуйте ешё раз