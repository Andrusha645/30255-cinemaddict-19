import FilmsContainerView from '../view/films-container-view.js';
import FeedView from '../view/films-feed-view.js';
import FilmCardListView from '../view/film-card-list-view.js';
import FilmCardView from '../view/film-card-view.js';
import FilmCardPopupView from '../view/film-card-popup.js';
import TopRatedView from '../view/top-rated-view.js';
import MostCommentedView from '../view/most-commented-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import NoFilmsView from '../view/no-films-view.js';
import {render} from '../render.js';

const FILM_COUNT_PER_STEP = 5;

export default class FeedPresenter {
  #bodyContainer = null;
  #feedContainer = null;
  #filmsModel = null;

  #allFilmsContainer = new FilmsContainerView();
  #feedComponent = new FeedView();
  #filmCardListComponent = new FilmCardListView();
  #showMoreButtonComponent = null;

  #feedFilms = [];
  #renderedFilmCount = FILM_COUNT_PER_STEP;


  constructor({feedContainer, bodyContainer, filmsModel}) {
    this.#feedContainer = feedContainer;
    this.#bodyContainer = bodyContainer;
    this.#filmsModel = filmsModel;

  }

  init() {
    this.#feedFilms = [...this.#filmsModel.films];

    this.#renderFeed();

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
      this.#bodyContainer.classList.add('hide-overflow');
      this.#bodyContainer.appendChild(popupComponent.element);
    };

    const replacePoupToCard = () => {
      this.#bodyContainer.classList.remove('hide-overflow');
      this.#bodyContainer.removeChild(popupComponent.element);
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

    render (filmComponent, this.#filmCardListComponent.element);
  }

  #renderFeed(){

    render(this.#allFilmsContainer, this.#feedContainer);
    render(this.#feedComponent, this.#allFilmsContainer.element);
    if (this.#feedFilms.length === 0){
      render(new NoFilmsView(),this.#feedComponent.element);
    } else {
      render(this.#filmCardListComponent, this.#feedComponent.element);

      for (let i = 0; i < Math.min(this.#feedFilms.length, FILM_COUNT_PER_STEP); i++) {
        this.#renderFilm(this.#feedFilms[i]);
      }

      if (this.#feedFilms.length > FILM_COUNT_PER_STEP) {
        this.#showMoreButtonComponent = new ShowMoreButtonView();
        render(this.#showMoreButtonComponent, this.#feedComponent.element);

        this.#showMoreButtonComponent.element.addEventListener('click', this.#showMoreButtonClickHandler);
      }

      render(new TopRatedView(), this.#allFilmsContainer.element);
      render(new MostCommentedView(), this.#allFilmsContainer.element);
    }
  }
}
