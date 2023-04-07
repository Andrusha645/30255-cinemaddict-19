import FilmCardView from '../view/film-card-view.js';
import FilmCardPopupView from '../view/film-card-popup.js';
import { render, replace } from '../framework/render.js';

export default class FilmPresenter {
  #filmCardListContainer = null;
  #bodyContainer = null;


  #filmComponent = null;
  #popupComponent = null;

  #film = null;

  constructor ({filmCardListContainer, bodyContainer }) {
    this.#filmCardListContainer = filmCardListContainer;
    this.#bodyContainer = bodyContainer;
  }

  init (film) {
    this.#film = film;

    this.#filmComponent = new FilmCardView({
      film: this.#film,
      onShowPopupClick: this.#handleShowPopupClick
    });

    this.#popupComponent = new FilmCardPopupView({
      film: this.#film,
      onClosePopupClick: this.#handleClosePopupClick
    });


    render (this.#filmComponent, this.#filmCardListContainer);
  }


  #replaceCardToPopup () {
    this.#bodyContainer.classList.add('hide-overflow');
    replace(this.#popupComponent, this.#filmComponent );
  }

  #replacePoupToCard () {
    this.#bodyContainer.classList.remove('hide-overflow');
    replace(this.#filmComponent, this.#popupComponent );
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      this.#replacePoupToCard();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #handleShowPopupClick = () => {
    this.#replaceCardToPopup();
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleClosePopupClick = () => {
    this.#replacePoupToCard();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };
}

