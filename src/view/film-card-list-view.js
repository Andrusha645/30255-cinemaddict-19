import AbstractView from '../framework/view/abstract-view.js';

function createFilmCardListTemplate() {
  return '<div class="films-list__container"></div>';
}

export default class FilmCardListView extends AbstractView {

  get template() {
    return createFilmCardListTemplate();
  }
}
