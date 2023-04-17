import AbstractView from '../framework/view/abstract-view.js';
import { humanizeFilmCardDate, transformFilmTitle,durationFormat } from '../utils/film.js';


function createFilmCardTemplate(film) {
  const {filmInfo:{title, totalRating, release:{date}, duration, genre, description }, comments, userDetails:{isWatchlist,isAlreadyWatched,isFavorite}} = film;

  const titleToPoster = transformFilmTitle(title);
  const year = humanizeFilmCardDate(date);
  const filmDuration = durationFormat(duration);
  const FavoriteClassName = isFavorite
    ? 'film-card__controls-item--active'
    : '';
  const AlreadyWatchedClassName = isAlreadyWatched
    ? 'film-card__controls-item--active'
    : '';
  const WatchlistClassName = isWatchlist
    ? 'film-card__controls-item--active'
    : '';

  return (
    `<article class="film-card">
    <a class="film-card__link">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${totalRating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${year}</span>
        <span class="film-card__duration">${filmDuration}</span>
        <span class="film-card__genre">${genre}</span>
      </p>
      <img src="./images/posters/${titleToPoster}.jpg" alt="" class="film-card__poster">
      <p class="film-card__description">${description.substr(0,140)}…</p>
      <span class="film-card__comments">${comments.length} comments</span>
    </a>
    <div class="film-card__controls">
      <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${WatchlistClassName}" type="button">Add to watchlist</button>
      <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${AlreadyWatchedClassName} " type="button">Mark as watched</button>
      <button class="film-card__controls-item film-card__controls-item--favorite ${FavoriteClassName}" type="button">Mark as favorite</button>
    </div>
  </article>`
  );
}

export default class FilmCardView extends AbstractView {
  #film = null;
  #handleShowPopupClick = null;
  #handleAddWatchlistClick = null;
  #handleAlreadyWatchedClick = null;
  #handleAddFavoritesClick = null;

  constructor({film, onShowPopupClick, onAddFavoritesClick, onAddWatchlistClick, onAlreadyWatchedClick}) {
    super();
    this.#film = film;
    this.#handleShowPopupClick = onShowPopupClick;
    this.#handleAddWatchlistClick = onAddWatchlistClick;
    this.#handleAlreadyWatchedClick = onAlreadyWatchedClick;
    this.#handleAddFavoritesClick = onAddFavoritesClick;

    this.element.querySelector('a').addEventListener('click', this.#showPopupClickHandler);
    this.element.querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this.#AddWatchlistClickHandler);
    this.element.querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this.#AlreadyWatchedClickHandler);
    this.element.querySelector('.film-card__controls-item--favorite').addEventListener('click', this.#AddFavoritesClickHandler);
  }

  get template() {
    return createFilmCardTemplate(this.#film);
  }

  #showPopupClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleShowPopupClick();
  };

  #AddWatchlistClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleAddWatchlistClick();
  };

  #AlreadyWatchedClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleAlreadyWatchedClick();
  };

  #AddFavoritesClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleAddFavoritesClick();
  };
}


