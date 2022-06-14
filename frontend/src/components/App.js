import { useEffect, useState } from 'react';
import { useNavigate, Route, Routes, Navigate } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import ImagePopup from './ImagePopup';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import api from "../utils/Api";
import Login from './Login.js';
import Register from './Register.js';
import ProtectedRoute from './ProtectedRoute.js';
import InfoTooltip from './InfoTooltip.js';
import { register, authorize, getContent } from '../utils/mestoAuth';
// логотипы
import successLogo from "../images/SuccessLogo.svg"
import failLogo from "../images/FailLogo.svg";

function App() {
    const navigate = useNavigate();

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const [isImageOpen, setIsImageOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);

    const [loggedIn, setLoggedIn] = useState(false);
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
    const [message, setMessage] = useState(false);
    //const [email, setEmail] = useState('');
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        handleTokenCheck();
        Promise.all([api.getInitialCards(), api.getProfile()])
            .then(([cards, userInfo]) => {
                setCurrentUser(userInfo);
                setCards(cards);
            })
            .catch((err) => console.log(err))
    }, [])

    function handleCardClick(card) {
        setSelectedCard(card);
        setIsImageOpen(true);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsImageOpen(false);
        setIsInfoTooltipOpen(false);
    }

    function handleCardLike(card) {
        // Проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
            })
            .catch((error) => console.log(error));
    }

    function handleCardDelete(card) {
        // Проверяем принадлежность карточки
        const isOwn = card.owner._id === currentUser._id;

        //Создаём копию массива, исключая удаленную карточку
        if (isOwn) {
            api.deleteCard(card._id)
                .then(() => setCards(state => state.filter(c => c._id !== card._id)))
                .catch((error) => console.log(error));
        }
    }

    // Обработчик обновления данных профиля
    function handleUpdateUser({ name, about }) {
        api
            .editProfile(name, about)
            .then((res) => {
                setCurrentUser(res)
                closeAllPopups();
            })
            .catch((error) => console.log(error));
    }

    // Обработчик обновления аватара
    function handleUpdateAvatar({ avatar }) {
        api
            .changeAvatar(avatar)
            .then((res) => {
                setCurrentUser(res)
                closeAllPopups();
            })
            .catch((error) => console.log(error));
    }

    // Обработчик добавления карточки
    function handleAddPlaceSubmit({ name, link }) {
        api
            .addCard(name, link)
            .then((newCard) => {
                setCards([newCard, ...cards])
                closeAllPopups();
            })
            .catch((error) => console.log(error));
    }

    function handleTokenCheck() {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            getContent(jwt)
                .then((res) => {
                    if (res) {
                        setUserInfo({ email: res.data.email })
                        setLoggedIn(true);
                        navigate('/');
                    }
                })
                .catch((err) => console.log(err));
        }
    }

    function handleRegister(email, password) {
        register(email, password)
            .then((result) => {
                if (result) {
                    setMessage({ imgPath: successLogo, text: 'Вы успешно зарегистрировались!' });
                    navigate('/signin');
                }
            })
            .catch(() => setMessage({ imgPath: failLogo, text: 'Что-то пошло не так! Попробуйте ещё раз.' }))
            .finally(() => setIsInfoTooltipOpen(true))
    }


    function handleLogin(email, password) {
        authorize(email, password)
            .then((result) => {
                if (result) {
                    localStorage.setItem('jwt', result.token);
                    setLoggedIn(true);
                    navigate('/');
                    setUserInfo(email)
                }
            })
            .catch(() => {
                setMessage({ imgPath: failLogo, text: 'Что-то пошло не так! Попробуйте ещё раз.' })
                setIsInfoTooltipOpen(true)
            })
    }

    function handleSignOut() {
        setLoggedIn(false);
        setUserInfo("");
        localStorage.removeItem('jwt');
        navigate('/sign-in');
    }

    return (
        <div className="page">
            <CurrentUserContext.Provider value={currentUser}>

                <Header
                    onSignOut={handleSignOut}
                    userEmail={userInfo}
                />

                <Routes>
                    <Route element={<ProtectedRoute loggedIn={loggedIn}></ProtectedRoute>}>
                        <Route exact path={'/'} element={<>
                            <Main
                                cards={cards}
                                onEditProfile={handleEditProfileClick}
                                onAddPlace={handleAddPlaceClick}
                                onEditAvatar={handleEditAvatarClick}
                                onCardClick={handleCardClick}
                                onCardLike={handleCardLike}
                                onCardDelete={handleCardDelete} />

                            <Footer />

                            <EditProfilePopup
                                isOpen={isEditProfilePopupOpen}
                                onClose={closeAllPopups}
                                onUpdateUser={handleUpdateUser} />

                            <EditAvatarPopup
                                isOpen={isEditAvatarPopupOpen}
                                onClose={closeAllPopups}
                                onUpdateAvatar={handleUpdateAvatar} />

                            <AddPlacePopup
                                isOpen={isAddPlacePopupOpen}
                                onClose={closeAllPopups}
                                onAddPlace={handleAddPlaceSubmit} />

                            <PopupWithForm name="delete-confirm"
                                title="Вы уверены?"
                                button="Да"
                                onClose={closeAllPopups} />

                            <ImagePopup name="photo"
                                onClose={closeAllPopups}
                                isOpen={isImageOpen}
                                card={selectedCard} />
                        </>}></Route>
                    </Route>

                    <Route path='/signup' element={<>
                        <Register onRegister={handleRegister} />
                        <InfoTooltip
                            name='tooltip'
                            isOpen={isInfoTooltipOpen}
                            onClose={closeAllPopups}
                            title={message.text}
                            imgPath={message.imgPath}
                        />
                    </>}></Route>

                    <Route path='/signin' element={<>
                        <Login onLogin={handleLogin} />
                        <InfoTooltip
                            name='tooltip'
                            isOpen={isInfoTooltipOpen}
                            onClose={closeAllPopups}
                            title={message.text}
                            imgPath={message.imgPath}
                        />
                    </>}>
                    </Route>

                    <Route path={'*'} element={<Navigate replace to={loggedIn ? '/' : '/signin'} />} />

                </Routes>

            </CurrentUserContext.Provider>
        </div>
    );
}

export default App;