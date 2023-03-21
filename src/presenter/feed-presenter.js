import FeedView from '../view/films-feed-view.js';
import FilmCardListView from '../view/film-card-list-view.js';
import FilmCardView from '../view/film-card-view.js';
import FilmCardPopupView from '../view/film-card-popup.js';
import TopRatedView from '../view/top-rated-view.js';
import MostCommentedView from '../view/most-commented-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import {render} from '../render.js';


export default class BoardPresenter {
  #feedContainer = null;
  #filmsModel = null;


  #feedComponent = new FeedView();
  #filmCardListComponent = new FilmCardListView();

  #feedFilms = [];


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

    render(new ShowMoreButtonView(), this.#feedComponent.element);

    render(new TopRatedView(), this.#feedComponent.element);
    render(new MostCommentedView(), this.#feedComponent.element);

  }


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
