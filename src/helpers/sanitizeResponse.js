const sanitizeResponse = pages => Object.keys(pages).map(id => pages[id]);

export default sanitizeResponse;
