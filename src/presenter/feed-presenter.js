import FeedView from '../view/films-feed-view.js';
import FilmCardListView from '../view/film-card-list-view.js';
import FilmCardView from '../view/film-card-view.js';
import FilmCardPopupView from '../view/film-card-popup.js';
import TopRatedView from '../view/top-rated-view.js';
import MostCommentedView from '../view/most-commented-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import {render} from '../render.js';

const FILM_COUNT_PER_STEP = 4;

export default class BoardPresenter {
  #feedContainer = null;
  #filmsModel = null;
  #showMoreButtonComponent = null;

  #feedComponent = new FeedView();
  #filmCardListComponent = new FilmCardListView();

  #feedFilms = [];
  #renderedFilmCount = FILM_COUNT_PER_STEP;

  constructor({feedContainer, filmsModel}) {
    this.#feedContainer = feedContainer;
    this.#filmsModel = filmsModel;
  }

  init() {
    this.#feedFilms = [...this.#filmsModel.films];

    render(this.#feedComponent, this.#feedContainer);
    render(this.#filmCardListComponent, this.#feedComponent.element);

    for (let i = 0; i < this.#feedFilms.length; i++) {
      this.#renderFilm(this.#feedFilms[i]);
    }
    if (this.#feedFilms.length > FILM_COUNT_PER_STEP) {
      this.#showMoreButtonComponent = new ShowMoreButtonView();
      render(this.#showMoreButtonComponent, this.#feedComponent.element);

      this.#showMoreButtonComponent.element.addEventListener('click', this.#showMoreButtonClickHandler);
    }

    render(new TopRatedView(), this.#feedComponent.element);
    render(new MostCommentedView(), this.#feedComponent.element);

  }

  #showMoreButtonClickHandler = (evt) => {
    evt.preventDefault();
    this.#feedFilms
      .slice(this.#renderedFilmCount, this.#renderedFilmCount + FILM_COUNT_PER_STEP)
      .forEach((film) => this.#renderFilm(film));

    this.#renderedFilmCount += FILM_COUNT_PER_STEP;

    if (this.#renderedFilmCount >= this.#feedFilms.length) {
      this.#showMoreButtonComponent.element.remove();
      this.#showMoreButtonComponent.removeElement();
    }
  };

  #renderFilm(film) {
    const filmComponent = new FilmCardView({film});
    const popupComponent = new FilmCardPopupView({film});

    const replaceCardToPopup = () => {
      this.#feedComponent.element.classList.add('hide-overflow');
      this.#feedComponent.element.appendChild(popupComponent.element);
    };

    const replacePoupToCard = () => {
      this.#feedComponent.element.classList.remove('hide-overflow');
      this.#feedComponent.element.removeChild(popupComponent.element);
    };

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        replacePoupToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    filmComponent.element.querySelector('a').addEventListener('click', () => {
      replaceCardToPopup();
      document.addEventListener('keydown', escKeyDownHandler);
    });

    popupComponent.element.querySelector('.film-details__close-btn').addEventListener('click', () => {
      replacePoupToCard();
      document.removeEventListener('keydown', escKeyDownHandler);
    });

    render (filmComponent, this.#feedComponent.element);
  }
}
