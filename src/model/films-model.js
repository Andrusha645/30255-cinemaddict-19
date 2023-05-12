import {getRandomFilm} from '../mock/film.js';

const FILM_COUNT = 10;

export default class FilmsModel {
  #films = Array.from({length: FILM_COUNT}, getRandomFilm);

  get films() {
    return this.#films;
  }
}
