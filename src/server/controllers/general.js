/* eslint quotes:off, no-useless-escape:off */
import { parse } from 'node-html-parser';

const needle = require('needle');

/** @param {HTMLElement} id */
const parseOneNews = (news) => {
  const resNews = { ...news };
  Object.keys(resNews).forEach((key) => {
    try {
      switch (key) {
        case 'html':
          resNews[key] = resNews[key].removeWhitespace().toString().replace(/\"/g, "'");
          break;

        case 'preText':
          resNews[key] = resNews[key].structuredText.replace(/\"/g, "'");
          break;
        default:
          resNews[key] = resNews[key].removeWhitespace().text.replace(/\"/g, "'");
          break;
      }
    } catch (e) {
      resNews[key] = '';
    }
  });

  return resNews;
};

/** @param {Array} id */
const parseJobNews = (jobNews) => jobNews.map((news) => {
  news.removeAttribute('style');
  news.querySelectorAll('').forEach((element) => {
    element.removeAttribute('style');
  });

  const date = news.querySelector('font');
  const title = news.querySelector('h4');
  const preText = news;
  const html = news;

  const resJson = {
    date,
    title,
    preText,
    html,
  };

  return parseOneNews(resJson);
});

export const getJobNews = async (req, res, next) => {
  const from = (req.query.from) ? req.query.from : 0; /* eslint prefer-destructuring:Off */
  await needle.get(`https://mospolytech.ru/lk_trud_umnews.php?s=${from}`, (error, response) => {
    if (!error && response.statusCode === 200) {
      const result = parse(response.body).querySelectorAll('.reveal-modal');
      res.send(parseJobNews(result));
    }
  });
};

export const getTimetable = async (req, res, next) => {
  const group = req.query.group;
  const options = {
    headers: {
      'X-Custom-Header': 'Bumbaway atuna',
      referer: 'https://rasp.dmami.ru/',
    },
  };

  await needle.get(`https://rasp.dmami.ru/site/group?group=${group}`, options, (error, response) => {
    if (!error && response.statusCode === 200) {
      res.send(response.body.grid);
    }
  });
};
