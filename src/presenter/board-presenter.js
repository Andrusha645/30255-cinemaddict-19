import BoardView from '../view/board-view.js';
import FilmCardListView from '../view/film-card-list-view.js';
import FilmCardView from '../view/film-card-view.js';
import FilmCardPopupView from '../view/film-card-popup.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import {render} from '../render.js';

export default class BoardPresenter {
  boardComponent = new BoardView();
  FilmCardListComponent = new FilmCardListView();

  constructor({boardContainer}) {
    this.boardContainer = boardContainer;
  }

  init() {
    render(this.boardComponent, this.boardContainer);
    render(this.FilmCardListComponent, this.boardComponent.getElement());    

    for (let i = 0; i < 5; i++) {
      render(new FilmCardView(), this.FilmCardListComponent.getElement());
    }

    render(new ShowMoreButtonView(), this.boardComponent.getElement());
    render(new FilmCardPopupView(), this.FilmCardListComponent.getElement());
  }
}
