import { createElement } from '../render';

function createFeedTemplate() {
  return '<section class="films"></section>';

}

export default class FeedView {
  #element = null;

  get template() {
    return createFeedTemplate();
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
