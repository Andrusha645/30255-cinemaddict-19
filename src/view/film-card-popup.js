import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { humanizeFilmReleaseDate, transformFilmTitle, durationFormat, getComments, formatCommentDate } from '../utils/film.js';
import { EMOTIONS } from '../const.js';
import { commentsItems } from '../mock/film.js';

function insertGenre(genre) {
  const array = [];
  for (let i = 0; i < genre.length; i++) {
    array.push( `<span class="film-details__genre">${genre[i]}</span>`);
  }
  return array;
}

const createCommentsListTemplate = (commentIds) => {
  const comments = getComments(commentsItems, commentIds);
  return(`
    <ul class="film-details__comments-list">${comments.map((comment) => (
      `<li class="film-details__comment">
          <span class="film-details__comment-emoji">
            <img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji-${comment.emotion}">
          </span>
          <div>
            <p class="film-details__comment-text">${comment.comment}</p>
            <p class="film-details__comment-info">
              <span class="film-details__comment-author">${comment.author}</span>
              <span class="film-details__comment-day">${formatCommentDate(comment.date)}</span>
              <button class="film-details__comment-delete">Delete</button>
            </p>
          </div>
        </li>`)).join('')}
    </ul>`
  );
};

const createNewCommentTemplate = (currentEmotion) => (`
  <form class="film-details__new-comment" action="" method="get">
       <div class="film-details__add-emoji-label">
      ${currentEmotion ? `<img src="./images/emoji/${currentEmotion}.png" width="55" height="55" alt="emoji" data-emotion=${currentEmotion}>` : ''}
      </div>
    <label class="film-details__comment-label">
      <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
    </label>
    <div class="film-details__emoji-list">${EMOTIONS.map((emotion) => `
    <input
    class="film-details__emoji-item visually-hidden"
    name="comment-emoji"
    type="radio"
    id="emoji-${emotion}"
    value="${emotion}"
    ${currentEmotion === emotion ? 'checked' : ''}>
  <label class="film-details__emoji-label" for="emoji-${emotion}">
    <img src="./images/emoji/${emotion}.png" width="30" height="30" alt="emoji" data-emotion=${emotion}>
      </label>`).join('')}
    </div>
  </form>
`);

function createFilmCardPopupTemplate(film) {
  const {filmInfo:{title, totalRating, alternativeTitle, director, writers, actors, release:{date, releaseCountry}, duration, genre, description }, comments, userDetails:{isWatchlist,isAlreadyWatched,isFavorite}, localComment} = film;

  const releaseDate = humanizeFilmReleaseDate(date);
  const genres = insertGenre(genre).join(' ');

  const filmDuration = durationFormat(duration);
  const titleToPoster = transformFilmTitle(title);
  const WatchlistClassName = isWatchlist
    ? 'film-details__control-button--active'
    : '';
  const FavoriteClassName = isFavorite
    ? 'film-details__control-button--active'
    : '';
  const AlreadyWatchedClassName = isAlreadyWatched
    ? 'film-details__control-button--active'
    : '';
  const commentsTemplate = createCommentsListTemplate(comments);
  const newCommentTemplate = createNewCommentTemplate(localComment.emotion);

  return (
    `<section class="film-details">
    <div class="film-details__inner">
      <div class="film-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="./images/posters/${titleToPoster}.jpg" alt="">

            <p class="film-details__age">18+</p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${title}</h3>
                <p class="film-details__title-original">Original: ${alternativeTitle}</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">${totalRating}</p>
              </div>
            </div>

            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${writers}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${actors}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${releaseDate}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Duration</td>
                <td class="film-details__cell">${filmDuration}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${releaseCountry}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Genres</td>
                <td class="film-details__cell">${genres}</td>
              </tr>
            </table>

            <p class="film-details__film-description">
              ${description}
            </p>
          </div>
        </div>

        <section class="film-details__controls">
          <button type="button" class="film-details__control-button film-details__control-button--watchlist ${WatchlistClassName}" id="watchlist" name="watchlist">Add to watchlist</button>
          <button type="button" class="film-details__control-button ${AlreadyWatchedClassName} film-details__control-button--watched" id="watched" name="watched">Already watched</button>
          <button type="button" class="film-details__control-button ${FavoriteClassName} film-details__control-button--favorite" id="favorite" name="favorite">Add to favorites</button>
        </section>
      </div>

      <div class="film-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

          ${commentsTemplate}
          ${newCommentTemplate}

        </section>
      </div>
    </div>
  </section>`
  );
}

export default class FilmCardPopupView extends AbstractStatefulView {

  #handleClosePopupClick = null;
  #handleAddWatchlistClick = null;
  #handleAlreadyWatchedClick = null;
  #handleAddFavoritesClick = null;

  constructor({film, onClosePopupClick, onAddWatchlistClick, onAlreadyWatchedClick, onAddFavoritesClick}) {
    super();
    this._setState(FilmCardPopupView.parseFilmToState(film));
    this.#handleClosePopupClick = onClosePopupClick;
    this.#handleAddWatchlistClick = onAddWatchlistClick;
    this.#handleAlreadyWatchedClick = onAlreadyWatchedClick;
    this.#handleAddFavoritesClick = onAddFavoritesClick;
    this._restoreHandlers();


  }

  _restoreHandlers() {
    this.element.querySelector('#watchlist').addEventListener('click', this.#addWatchlistClickHandler);
    this.element.querySelector('#watched').addEventListener('click', this.#alreadyWatchedClickHandler);
    this.element.querySelector('#favorite').addEventListener('click', this.#addFavoritesClickHandler);

    this.element.querySelector('.film-details__close-btn')
      .addEventListener('click', this.#closePopupClickHandler);
    this.element.querySelector('.film-details__emoji-list')
      .addEventListener('click', this.#emojiClickHandler);
  }

  get template() {
    return createFilmCardPopupTemplate(this._state);
  }

  #closePopupClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClosePopupClick(FilmCardPopupView.parseStateToFilm(this._state));
  };

  #addWatchlistClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleAddWatchlistClick();
  };

  #alreadyWatchedClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleAlreadyWatchedClick();
  };

  #addFavoritesClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleAddFavoritesClick();
  };

  #emojiClickHandler = (evt) => {
    evt.preventDefault();
    if (evt.target.tagName !== 'IMG') {
      return;
    }
    const currYcoord = this.element.scrollTop;
    this.updateElement({
      localComment: {
        emotion: evt.target.dataset.emotion,
        comment: this._state.localComment.comment
      }
    });
    this.element.scrollTo(0, currYcoord);
  };

  static parseFilmToState(film) {
    return {
      ...film,
      localComment: {
        comment: null,
        emotion: null
      }
    };
  }

  static parseStateToFilm(state) {
    const film = {...state};
    /*
      Логика передачи комментария
    */
    delete film.localComment;
    return film;
  }
}
