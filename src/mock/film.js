import { getRandomArrayElement } from '../utils.js';
import { EMOTIONS } from '../const.js';

const mockFilms = [
  {
    id: 0,
    comments: [1,2,4],
    filmInfo: {
      title: 'Santa Claus Conquers the Martians',
      alternativeTitle: 'Laziness Who Sold Themselves',
      totalRating: 5.3,
      poster: 'blue-blazes',
      ageRating: 0,
      director: 'Tom Ford',
      writers: [
        'Takeshi Kitano'
      ],
      actors: [
        'Morgan Freeman'
      ],
      release: {
        date: '2019-05-11T00:00:00.000Z',
        releaseCountry: 'Finland'
      },
      duration: 77,
      genre: [
        'Comedy'
      ],
      description: 'Oscar-winning film, a war drama about two young people, from the creators of timeless classic Nu, Pogodi! and Alice in Wonderland, with the best fight scenes since Bruce Lee.'
    },
    userDetails: {
      isWatchlist: false,
      isAlreadyWatched: true,
      watchingDate: '2019-04-12T16:12:32.554Z',
      isFavorite: false
    }
  },
  {
    id: 1,
    comments: [3,2],
    filmInfo: {
      title: 'The Great Flamarion',
      alternativeTitle: 'The Great Flamarion',
      totalRating: 8.9,
      poster: 'blue-blazes',
      ageRating: 0,
      director: 'Anthony Mann',
      writers: [
        'Anne Wigton', 'Heinz Herald', 'Richard Weil'
      ],
      actors: [
        'Erich von Stroheim', ' Mary Beth Hughes', 'Dan Duryea'
      ],
      release: {
        date: '1945-03-30T00:00:00.000Z',
        releaseCountry: 'USA'
      },
      duration: 78,
      genre: [
        'Drama', 'Film-Noir', 'Mystery'
      ],
      description: 'The film opens following a murder at a cabaret in Mexico City in 1936, and then presents the events leading up to it in flashback. The Great Flamarion (Erich von Stroheim) is an arrogant, friendless, and misogynous marksman who displays his trick gunshot act in the vaudeville circuit. His show features a beautiful assistant, Connie (Mary Beth Hughes) and her drunken husband Al (Dan Duryea), Flamarions other assistant. Flamarion falls in love with Connie, the movies femme fatale, and is soon manipulated by her into killing her no good husband during one of their acts.'
    },
    userDetails: {
      isWatchlist: false,
      isAlreadyWatched: false,
      watchingDate: '2019-04-12T16:12:32.554Z',
      isFavorite: true
    }
  },
  {
    id: 2,
    comments: [2,4,1],
    filmInfo: {
      title: 'Sagebrush Trail',
      alternativeTitle: 'Sagebrush Trail',
      totalRating: 3.2,
      poster: 'blue-blazes',
      ageRating: 0,
      director: 'Anthony Mann',
      writers: [
        'Anne Wigton', 'Heinz Herald', 'Richard Weil'
      ],
      actors: [
        'Erich von Stroheim', ' Mary Beth Hughes', 'Dan Duryea'
      ],
      release: {
        date: '1933-03-30T00:00:00.000Z',
        releaseCountry: 'USA'
      },
      duration: 54,
      genre: [
        'Western', 'Mystery'
      ],
      description: 'Sentenced for a murder he did not commit, John Brant escapes from prison determined to find the real killer. By chance Brants narrow escape.'
    },
    userDetails: {
      isWatchlist: true,
      isAlreadyWatched: true,
      watchingDate: '2019-08-17T16:12:32.554Z',
      isFavorite: true
    }
  }
];

const commentsItems = [
  {
    id: 1,
    author: 'Ilya OReilly',
    comment: 'a film that changed my life, a true masterpiece, post-credit scene was just amazing omg.',
    date: '2019-05-11T16:12:32.554Z',
    emotion: getRandomArrayElement(EMOTIONS),
  },
  {
    id: 2,
    author: 'Tim Macoveev',
    comment: 'Interesting setting and a good cast',
    date: '2019-12-31T16:12:32.554Z',
    emotion: getRandomArrayElement(EMOTIONS),
  },
  {
    id: 3,
    author: 'John Doe',
    comment: 'Booooooooooring',
    date: '2019-11-20T16:12:32.554Z',
    emotion: getRandomArrayElement(EMOTIONS),
  },
  {
    id: 4,
    author: 'John Doe',
    comment: 'Almost two hours? Seriously?',
    date: '2019-07-19T16:12:32.554Z',
    emotion: getRandomArrayElement(EMOTIONS),
  }
];
function getRandomFilm() {
  return getRandomArrayElement(mockFilms);
}

export {getRandomFilm, commentsItems};
