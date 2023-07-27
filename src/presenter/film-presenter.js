import FilmCardView from '../view/film-card-view.js';
import FilmCardPopupView from '../view/film-card-popup.js';
import { render, remove, replace } from '../framework/render.js';
import { Mode } from '../const.js';

export default class FilmPresenter {
  #filmCardListContainer = null;
  #bodyContainer = null;
  #feedContainer = null;
  #handleDataChange = null;
  #handleModeChange = null;


  #filmComponent = null;
  #popupComponent = null;

  #film = null;
  #mode = Mode.DEFAULT;

  constructor ({filmCardListContainer, bodyContainer, feedContainer, onDataChange, onModeChange }) {
    this.#filmCardListContainer = filmCardListContainer;
    this.#bodyContainer = bodyContainer;
    this.#feedContainer = feedContainer;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init (film) {
    this.#film = film;

    const prevFilmComponent = this.#filmComponent;
    const prevPopupComponent = this.#popupComponent;

    this.#filmComponent = new FilmCardView({
      film: this.#film,
      onShowPopupClick: this.#handleShowPopupClick,
      onAddWatchlistClick: this.#handleAddWatchlistClick,
      onAlreadyWatchedClick: this.#handleAlreadyWatchedClick,
      onAddFavoritesClick: this.#handleAddFavoritesClick
    });

    this.#popupComponent = new FilmCardPopupView({
      film: this.#film,
      onClosePopupClick: this.#handleClosePopupClick,
      onAddWatchlistClick: this.#handleAddWatchlistClick,
      onAlreadyWatchedClick: this.#handleAlreadyWatchedClick,
      onAddFavoritesClick: this.#handleAddFavoritesClick
    });

    if (prevFilmComponent === null || prevPopupComponent === null) {
      render (this.#filmComponent, this.#filmCardListContainer);
      return;
    }

    // Проверка на наличие в DOM необходима,
    // чтобы не пытаться заменить то, что не было отрисовано
    if (this.#mode === Mode.DEFAULT) {
      replace(this.#filmComponent, prevFilmComponent);
    }

    if (this.#mode === Mode.POPUP) {
      replace(this.#filmComponent, prevFilmComponent);
      replace(this.#popupComponent, prevPopupComponent);
    }

    remove(prevFilmComponent);
    remove(prevPopupComponent);
  }

  destroy() {
    remove(this.#filmComponent);
    remove(this.#popupComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#closePoup();
    }
  }

  #showPopup() {
    this.#bodyContainer.classList.add('hide-overflow');
    this.#bodyContainer.append(this.#popupComponent.element);
    this.#handleModeChange();
    this.#mode = Mode.POPUP;
  }

  #closePoup() {
    this.#bodyContainer.removeChild(this.#popupComponent.element);
    this.#bodyContainer.classList.remove('hide-overflow');
    this.#mode = Mode.DEFAULT;
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      this.#handleDataChange(this.#film);
      this.#closePoup();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #handleAddWatchlistClick = () => {
    this.#handleDataChange({...this.#film,
      userDetails: {...this.#film.userDetails,
        isWatchlist: !this.#film.userDetails.isWatchlist
      }
    });
  };

  #handleAlreadyWatchedClick = () => {
    this.#handleDataChange({...this.#film,
      userDetails: {...this.#film.userDetails,
        isAlreadyWatched: !this.#film.userDetails.isAlreadyWatched
      }
    });
  };

  #handleAddFavoritesClick = () => {
    this.#handleDataChange({...this.#film,
      userDetails: {...this.#film.userDetails,
        isFavorite: !this.#film.userDetails.isFavorite
      }
    });
  };

  #handleShowPopupClick = () => {
    this.#showPopup();
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleClosePopupClick = (film) => {
    this.#handleDataChange(film);
    this.#closePoup();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };
}

