// const slugify = require('slugify');
const crypto = require('crypto');

// Clean all whitespaces from a string.
function cleanWhitespace(string) {
  return string.replace(/\s/g, '');
}

// Escape Regex special characters.
function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

// Create a Regex with insensitive case flag.
function insensitiveRegex(string) {
  return new RegExp(escapeRegex(string), 'i');
}

// Strict string regex.
function strictInsensitiveRegex(string) {
  return new RegExp(`^${string}$`, 'i');
}

// Create an array of Regular Expressions from comma-separated string for $in MongoDB query.
function inRegex(string) {
  return string
    .split(',')
    .map(query =>
      query ? strictInsensitiveRegex(query) : insensitiveRegex(query)
    );
}

// getFilters(object, array) → Object
// Get a map of data field name and its array of filter keys for $in.
// { fieldName: { $in: [keyRegexOne, keyRegexTwo, ...nth_keyRegex] } }
function getFiltersFromQuery(query, excluded) {
  let filters = {};
  for (const [key, value] of Object.entries(query)) {
    // If it's not the excluded query fields, then create an $in query.
    if (!excluded.includes(key)) filters[key] = { $in: inRegex(value) };
  }
  return filters;
}

// Convert 'camelCase' to 'Camel Case'.
function camelToSentence(camelString) {
  return camelString
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, match => match.toUpperCase());
}

function getFilterKeys(filterFields, data) {
  let filterKeys = {};
  let slugOptions = {
    replacement: '',
    lower: true,
  };

  filterFields.forEach(filterField => {
    filterKeys[filterField] = {
      title: camelToSentence(filterField),
      keys: [],
    };
    data.forEach(d => {
      let key = d[filterField];
      const { keys } = filterKeys[filterField];
      if (!keys.some(({ name }) => name === key)) {
        keys.push({
          name: key,
          slug: slugify(key, slugOptions),
        });
      }
    });
  });
  return filterKeys;
}

function generateRandomID(length) {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(length, (err, buffer) =>
      resolve(buffer.toString('hex'))
    );
  });
}

function randomUppercase(length) {
  let result = '';
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = {
  cleanWhitespace,
  escapeRegex,
  insensitiveRegex,
  inRegex,
  getFiltersFromQuery,
  getFilterKeys,
  generateRandomID,
  randomUppercase,
  randomNum,
};

// Used:
// - randomUppercase
// - randomNum
