import {getRandomFilm} from '../mock/task.js';

const FILM_COUNT = 2;

export default class FilmsModel {
  films = Array.from({length: FILM_COUNT}, getRandomFilm);

  getFilms() {
    return this.films;
  }
}
