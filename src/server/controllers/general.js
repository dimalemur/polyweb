import { parse } from 'node-html-parser';

const needle = require('needle');
/* eslint quotes:off, no-useless-escape:off */
// регистрация
export const getJobNews = async (req, res, next) => {
  const from = (req.query.from) ? req.query.from : 0; /* eslint prefer-destructuring:Off */
  await needle.get(`https://mospolytech.ru/lk_trud_umnews.php?s=${from}`, (error, response) => {
    if (!error && response.statusCode === 200) {
      const result = parse(response.body).querySelectorAll('.reveal-modal').map((el) => {
        el.removeAttribute('style');
        el.querySelectorAll('').forEach((element) => {
          element.removeAttribute('style');
        });

        const date = el.querySelector('font');
        const title = el.querySelector('h4');
        const preText = el;
        const html = el;

        const resJson = {
          date,
          title,
          preText,
          html,
        };

        Object.keys(resJson).forEach((key) => {
          try {
            switch (key) {
              case 'html':
                resJson[key] = resJson[key].removeWhitespace().toString().replace(/\"/g, "'");
                break;

              case 'preText':
                resJson[key] = resJson[key].structuredText.replace(/\"/g, "'");
                break;
              default:
                resJson[key] = resJson[key].removeWhitespace().text.replace(/\"/g, "'");
                break;
            }
          } catch (e) {
            resJson[key] = '';
          }
        });
        return resJson;
      });
      res.send(result);
    }
  });
};

