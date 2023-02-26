import dayjs from 'dayjs';

const DATE_FORMAT = 'YYYY';
const RELEASE_DATE_FORMAT = 'DD MMMM YYYY';
const DATE_COMMENT_FORMAT = 'YYYY/MM/D H:mm';

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

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

const getComments = (commentItems, commentIds) => commentItems.filter((item) => commentIds.includes(item.id));

export {getRandomArrayElement,
  humanizeFilmCardDate,
  transformFilmTitle,
  durationFormat,
  formatCommentDate,
  humanizeFilmReleaseDate,
  getComments};
