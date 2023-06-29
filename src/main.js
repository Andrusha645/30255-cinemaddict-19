import UserProfileView from './view/user-profile-view.js';
import FilterView from './view/filter-view.js';
//import SortView from './view/sort-view.js';
import { render } from './framework/render.js';
import FeedPresenter from './presenter/feed-presenter.js';
import FilmsCountView from './view/films-count-view.js';
import FilmsModel from './model/films-model.js';
import { generateFilter } from './mock/filter.js';

const siteHeaderElement = document.querySelector('header');
const siteMainElement = document.querySelector('main');
const siteBodyElement = document.querySelector('body');

const filmsModel = new FilmsModel();
const feedPresenter = new FeedPresenter({
  feedContainer: siteMainElement,
  bodyContainer: siteBodyElement,
  filmsModel,

});
const FilmsCountContainer = document.querySelector('.footer__statistics');
const filters = generateFilter(filmsModel.films);


render(new UserProfileView(), siteHeaderElement);
render(new FilterView({filters}), siteMainElement);
//render(new SortView(), siteMainElement);

feedPresenter.init();

render(new FilmsCountView(), FilmsCountContainer);
