import React from "react";
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  React.useEffect(() => {
    avatarRef.current.value = '';
  }, [isOpen])

  return (
    <PopupWithForm name="edit-avatar" title="Обновить Аватар" button="Сохранить"
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onClose={onClose}>
      <input type="url" ref={avatarRef} className="popup__input" id="avatar"
        placeholder="Ссылка на аватар" required />
      <span id="avatar-error" className="popup__error" />
    </PopupWithForm>
  )
}

export default EditAvatarPopup;