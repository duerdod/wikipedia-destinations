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

export const wikiFetchUrl = title =>
  `https://en.wikipedia.org/w/api.php?${wikiFetchParams(title)}`;

//https://en.wikipedia.org/w/api.php?action=help&modules=parse
