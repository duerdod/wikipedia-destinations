import sanitizeHtml from 'sanitize-html';

// So this is unnecessary complex huh
// const stripDigis = new RegExp(/^\d+\.\d|\d*\.\d*|^\d\d|^\d/, 'g');
// ^\d+(?!\S)|\.*

const sanitizeTOC = html =>
  sanitizeHtml(html, {
    allowedTags: ['span', 'a'],
    exclusiveFilter: el =>
      (el.tag && !el.text.trim()) ||
      (el.text.match(/^\d+\.\d/g) && el.text.trim()) ||
      (el.text.startsWith(' ') && el.text.trim())
  });

export default sanitizeTOC;

// console.log(el) ||
// (el.attribs.class &&
//   el.attribs.class === 'tocnumber' &&
//   el.text.trim()) ||
// (el.tag && !el.text.trim()) ||
// (el.tag === 'span' &&
//   el.text.match(/^\d+\.\d/g) &&
//   console.log(el.text)) ||
// (el.tag === 'span' && el.text.match(/\./g) && el.text.trim())
