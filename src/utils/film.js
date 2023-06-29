import dayjs from 'dayjs';

const DATE_FORMAT = 'YYYY';
const RELEASE_DATE_FORMAT = 'DD MMMM YYYY';
const DATE_COMMENT_FORMAT = 'YYYY/MM/D H:mm';

function formatCommentDate(dateComment){
  return dateComment ? dayjs(dateComment).format(DATE_COMMENT_FORMAT) : '';
}

function humanizeFilmCardDate(cardDate) {
  return cardDate ? dayjs(cardDate).format(DATE_FORMAT) : '';
}

function humanizeFilmReleaseDate(releaseDate) {
  return releaseDate ? dayjs(releaseDate).format(RELEASE_DATE_FORMAT) : '';
}

function transformFilmTitle(title) {
  const transformTitle = title.replace(/ /g, '-');
  return transformTitle.toLowerCase();
}

function durationFormat(duration){
  if (duration >= 60){
    const hours = Math.round(duration / 60);
    const minutes = duration - hours * 60;
    return `${hours}h ${minutes}m`;
  } else {
    return `${duration}m`;
  }
}

// Функция помещает задачи без даты в конце списка,
// возвращая нужный вес для колбэка sort
function getWeightForNullRating(ratingA, ratingB) {
  if (ratingA === null && ratingB === null) {
    return 0;
  }

  if (ratingA === null) {
    return 1;
  }

  if (ratingB === null) {
    return -1;
  }

  return null;
}

function sortRatingDown(ratingA, ratingB) {
  const weight = getWeightForNullRating(ratingB.filmInfo.totalRating, ratingA.filmInfo.totalRating);

  return weight ?? dayjs(ratingB.filmInfo.totalRating).diff(dayjs(ratingA.filmInfo.totalRating));
}
// Функция помещает задачи без даты в конце списка,
// возвращая нужный вес для колбэка sort
function getWeightForNullDate(dateA, dateB) {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
}

function sortDateDown(dateA, dateB) {
  const weight = getWeightForNullDate(dateB.filmInfo.release.date, dateA.filmInfo.release.date);

  return weight ?? dayjs(dateB.filmInfo.release.date).diff(dayjs(dateA.filmInfo.release.date));
}


const getComments = (commentItems, commentIds) => commentItems.filter((item) => commentIds.includes(item.id));

export {humanizeFilmCardDate,
  transformFilmTitle,
  durationFormat,
  formatCommentDate,
  humanizeFilmReleaseDate,
  sortRatingDown,
  sortDateDown,
  getComments};
