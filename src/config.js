const params = title => ({
  action: 'parse',
  origin: '*',
  format: 'json',
  page: title,
  disabletoc: true,
  disableeditsection: true,
  disablestylededuplication: true,
  prop: 'text|displaytitle'
});

const wikiFetchParams = title =>
  Object.keys(params(title))
    .map(param => `&${param}=${params(title)[param]}`)
    .join('');

const wikiFetchUrl = title =>
  `https://en.wikipedia.org/w/api.php?${wikiFetchParams(title)}`;

const randomArticle = `https://en.wikipedia.org/api/rest_v1/page/random/summary`;

export { params, wikiFetchParams, wikiFetchUrl, randomArticle };

// Docs: https://en.wikipedia.org/api/rest_v1/#/Page%20content/get_page_random__format_
// Docs: https://en.wikipedia.org/w/api.php?action=help&modules=parse
