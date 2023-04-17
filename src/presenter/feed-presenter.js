import FilmsContainerView from '../view/films-container-view.js';
import FeedView from '../view/films-feed-view.js';
import FilmCardListView from '../view/film-card-list-view.js';
import TopRatedView from '../view/top-rated-view.js';
import MostCommentedView from '../view/most-commented-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import NoFilmsView from '../view/no-films-view.js';
import { render, remove } from '../framework/render.js';
import FilmPresenter from './film-presenter.js';
import { updateItem } from '../utils/common.js';

const FILM_COUNT_PER_STEP = 5;

export default class FeedPresenter {
  #bodyContainer = null;
  #feedContainer = null;
  #filmsModel = null;

  #allFilmsContainer = new FilmsContainerView();
  #feedComponent = new FeedView();
  #filmCardListComponent = new FilmCardListView();
  #noFilmComponent = new NoFilmsView();
  #showMoreButtonComponent = null;
  #topRatedComponent = new TopRatedView();
  #mostCommentedComponent = new MostCommentedView();

  #feedFilms = [];
  #renderedFilmCount = FILM_COUNT_PER_STEP;

  #filmPresenters = new Map ();


  constructor({feedContainer, bodyContainer, filmsModel}) {
    this.#feedContainer = feedContainer;
    this.#bodyContainer = bodyContainer;
    this.#filmsModel = filmsModel;

  }

  init() {
    this.#feedFilms = [...this.#filmsModel.films];

    this.#renderFeed();

  }

  #showMoreButtonClickHandler = () => {
    this.#feedFilms
      .slice(this.#renderedFilmCount, this.#renderedFilmCount + FILM_COUNT_PER_STEP)
      .forEach((film) => this.#renderFilm(film));

    this.#renderedFilmCount += FILM_COUNT_PER_STEP;

    if (this.#renderedFilmCount >= this.#feedFilms.length) {
      this.#showMoreButtonComponent.element.remove();
      this.#showMoreButtonComponent.removeElement();
    }
  };

  #handleFilmChange = (updatedFilm) => {
    this.#feedFilms = updateItem(this.#feedFilms, updatedFilm);
    this.#filmPresenters.get(updatedFilm.id).init(updatedFilm);
  };

  #renderFilm(film) {
    const filmPresenter = new FilmPresenter({
      filmCardListContainer: this.#filmCardListComponent.element,
      bodyContainer: this.#bodyContainer,
      feedContainer: this.#feedContainer,
      onDataChange: this.#handleFilmChange
    });
    filmPresenter.init(film);
    this.#filmPresenters.set(film.id,filmPresenter);
  }

  #renderFilms(from, to) {
    this.#feedFilms
      .slice(from, to)
      .forEach((film) => this.#renderFilm(film));
  }

  #clearTaskList() {
    this.#filmPresenters.forEach((presenter) => presenter.destroy());
    this.#filmPresenters.clear();
    this.#renderedFilmCount = FILM_COUNT_PER_STEP;
    remove(this.#showMoreButtonComponent);
  }

  #renderNoFilms() {
    render(this.#noFilmComponent, this.#feedComponent.element);
  }

  #renderShowMoreButton() {
    this.#showMoreButtonComponent = new ShowMoreButtonView({
      onClick: this.#showMoreButtonClickHandler
    });

    render(this.#showMoreButtonComponent, this.#feedComponent.element);
  }

  #renderTopRated() {
    render(this.#topRatedComponent, this.#allFilmsContainer.element);
  }

  #renderMostCommented() {
    render(this.#mostCommentedComponent, this.#allFilmsContainer.element);
  }

  #renderFilmsList() {
    render(this.#filmCardListComponent, this.#feedComponent.element);

    this.#renderFilms (0, Math.min(this.#feedFilms.length, FILM_COUNT_PER_STEP));


    if (this.#feedFilms.length > FILM_COUNT_PER_STEP) {
      this.#renderShowMoreButton();
    }
  }

  #renderFeed(){

    render(this.#allFilmsContainer, this.#feedContainer);
    render(this.#feedComponent, this.#allFilmsContainer.element);

    if (this.#feedFilms.length === 0){

      this.#renderNoFilms();
    } else {
      this.#renderFilmsList();
      this.#renderTopRated();
      this.#renderMostCommented();
    }


  }
}
