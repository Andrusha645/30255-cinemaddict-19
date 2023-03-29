import AbstractView from '../framework/view/abstract-view.js';


function createFilmsContainerTemplate() {
  return '<section class="films"></section>';
}

export default class FilmsContainerView extends AbstractView {

  get template() {
    return createFilmsContainerTemplate();
  }
}
