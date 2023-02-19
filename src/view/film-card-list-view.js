import {createElement} from '../render.js';

function createFilmCardListTemplate() {
  return '<div class="films-list__container"></div>';
}

export default class FilmCardListView {
  getTemplate() {
    return createFilmCardListTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
