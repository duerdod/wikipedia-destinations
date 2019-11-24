import sanitizeHtml from 'sanitize-html';

const linkRegex = new RegExp(/.php|https|http|:|#cite|commons/, 'i');
const textRegex = new RegExp(/[[\]^]|Contents/, 'i');
const classRegex = new RegExp(/thumb/, 'i');

const alsoAllow = ['img', 'h2', 'span'];

const sanitize = html =>
  sanitizeHtml(html, {
    allowedTags: [...sanitizeHtml.defaults.allowedTags, ...alsoAllow],
    allowedAttributes: { '*': ['class', 'id', 'href', 'src'], div: ['style'] },
    allowedClasses: {
      div: ['thumb']
    },
    textFilter: text => text.replace(textRegex, ''),
    exclusiveFilter: frame => {
      // Clean up this mess.
      return (
        (frame.attribs.class &&
          frame.attribs.class.match(classRegex) &&
          frame.text.trim()) ||
        (frame.tag === 'table' && frame.text.trim()) ||
        (frame.attribs &&
          frame.attribs.href &&
          frame.attribs.href.match(linkRegex))
      );
    }
  });

export default sanitize;
