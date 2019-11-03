import sanitizeHtml from 'sanitize-html';

const tagRegex = new RegExp(/.php|https|http|:/, 'i');
const textRegex = new RegExp(/[[\]^]|Contents/, 'i');

const sanitize = html =>
  sanitizeHtml(html, {
    allowedTags: ['a', 'p', 'h1', 'h2', 'h3', 'ul', 'ol', 'li'],
    allowedAttributes: { span: ['id'], a: ['href'] },
    textFilter: text => text.replace(textRegex, ''),
    exclusiveFilter: frame =>
      frame.attribs && frame.attribs.href && frame.attribs.href.match(tagRegex)
  });

export default sanitize;
