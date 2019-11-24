const params = title => ({
  action: 'parse',
  origin: '*',
  format: 'json',
  page: title,
  // disabletoc: true,
  disableeditsection: true,
  disablestylededuplication: true,
  redirects: true,
  prop: 'text|displaytitle'
});

const wikiFetchParams = title =>
  Object.keys(params(title))
    .map(param => `&${param}=${params(title)[param]}`)
    .join('');

const wikiFetchUrl = title =>
  `https://en.wikipedia.org/w/api.php?${wikiFetchParams(title)}`;

const randomArticle = `https://en.wikipedia.org/api/rest_v1/page/random/summary`;
const summaryArticle = title =>
  `https://en.wikipedia.org/api/rest_v1/page/summary/${title}`;

export { params, wikiFetchParams, wikiFetchUrl, randomArticle, summaryArticle };

// Docs: https://en.wikipedia.org/api/rest_v1/#/Page%20content/get_page_random__format_
// Docs: https://en.wikipedia.org/w/api.php?action=help&modules=parse
