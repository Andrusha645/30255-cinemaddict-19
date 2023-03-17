import {createElement} from '../render.js';

function createFilmCardListTemplate() {
  return '<div class="films-list__container"></div>';
}

export default class FilmCardListView {
  #element = null;

  get template() {
    return createFilmCardListTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
