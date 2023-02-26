import UserProfileView from './view/user-profile-view.js';
import FilterView from './view/filter-view.js';
import SortView from './view/sort-view.js';
import {render} from './render.js';
import BoardPresenter from './presenter/board-presenter.js';
import FilmsCountView from './view/films-count-view.js';
import FilmsModel from './model/films-model.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const filmsModel = new FilmsModel();
const boardPresenter = new BoardPresenter({
  boardContainer: siteMainElement,
  filmsModel,

});
const FilmsCountContainer = document.querySelector('.footer__statistics');

render(new UserProfileView(), siteHeaderElement);
render(new FilterView(), siteMainElement);
render(new SortView(), siteMainElement);

boardPresenter.init();

render(new FilmsCountView(), FilmsCountContainer);
