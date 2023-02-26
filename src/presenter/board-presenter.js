import BoardView from '../view/board-view.js';
import FilmCardListView from '../view/film-card-list-view.js';
import FilmCardView from '../view/film-card-view.js';
import FilmCardPopupView from '../view/film-card-popup.js';
import TopRatedView from '../view/top-rated-view.js';
import MostCommentedView from '../view/most-commented-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import {render} from '../render.js';

export default class BoardPresenter {
  boardComponent = new BoardView();
  FilmCardListComponent = new FilmCardListView();

  constructor({boardContainer, filmsModel}) {
    this.boardContainer = boardContainer;
    this.filmsModel = filmsModel;
  }

  init() {
    this.boardFilms = [...this.filmsModel.getFilms()];

    render(this.boardComponent, this.boardContainer);
    render(this.FilmCardListComponent, this.boardComponent.getElement());

    for (let i = 0; i < this.boardFilms.length; i++) {
      render(new FilmCardView({film: this.boardFilms[i]}), this.FilmCardListComponent.getElement());
    }

    render(new ShowMoreButtonView(), this.boardComponent.getElement());
    render(new TopRatedView(), this.boardComponent.getElement());
    render(new MostCommentedView(), this.boardComponent.getElement());
    render(new FilmCardPopupView({film: this.boardFilms[0]}), this.FilmCardListComponent.getElement());
  }
}
