import React from 'react';
import { Link } from 'react-router-dom';

const Links = (tagName, attribs) => {
  console.log(attribs);
  console.log(tagName);
  return <a href={attribs && attribs.href}>Hej</a>;
};

export default Links;
