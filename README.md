# MultiIndexMap

[![npm version](https://img.shields.io/npm/v/multi-index-map.svg?style=flat-square)](https://www.npmjs.org/package/multi-index-map)
[![install size](https://packagephobia.now.sh/badge?p=multi-index-map)](https://packagephobia.now.sh/result?p=multi-index-map)
[![bundle size](https://badgen.net/bundlephobia/min/multi-index-map)](https://badgen.net/bundlephobia/min/multi-index-map)
[![npm downloads](https://img.shields.io/npm/dm/multi-index-map.svg?style=flat-square)](http://npm-stat.com/charts.html?package=multi-index-map)


## Browser Support

![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Edge](https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | ![IE](https://raw.github.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png) |
--- | --- | --- | --- | --- | --- |
Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | 11 ✔ |

## Installing

Using npm:

```bash
$ npm install multi-index-map
```

Using yarn:

```bash
$ yarn add multi-index-map
```

## Usage : 

```javascript
 
   const contacts = [
     { id: 'ddd-33sdfia', email: 'unique1@email.com', number: '8787898989', state: 'India', ... },
     { id: 'eee-swwwadd', email: 'unique2@email.com', number: '676776676', state: 'US', ... },
     { id: '222-33sdssf', email: 'unique3@email.com', number: '898976789', state: 'India', ...}
     ...
   ];
   // id, email, number are unique properties in the among the above contacts array

   // we can form a map based on these unique properties
   const contactsMap = new MultiIndexMap(['id', 'email', 'number'], contacts);

   // now you can use one of the above three properties to get access to the objects
   console.log(contactsMap.get('id', 'eee-swwwadd'));
   // { id: 'ddd-33sdfia', email: 'unique1@email.com', number: '8787898989' ... }
   console.log(contactsMap.get('email', 'unique3email.com'))
   // { id: '222-33sdssf', email: 'unique3@email.com', number: '898976789', state: 'India', ...}
   console.log(contactsMap.get('number', '676776676'))
   // { id: 'eee-swwwadd', email: 'unique2@email.com', number: '676776676'..},

   // provides methods which Map has like has, set, delete methods
   console.log(contactsMap.has('email', 'unique3email.com')) // true
   console.log(contactsMap.delete('id', '222-33sdssf')) // removes item with id : 222-33sdssf
   
   const newContact = { id: '4443-2sss8',email: 'unique88@email.com', number: '999090090', state: 'India', ...};
   contactsMap.set(newContact); // will add the item to the map
```

## Time and Space Complexities
where m: no of indexes, n: no of items
 1. only properties are indexed and items are not duplicated: 
     m-1 indextables n items each =  O((m - 1) * n)
     1 main table with n items =  O(n)
 2. operations

| operation          | complexity |
|--------------------|--------|
| new MultiIndex(..) | O(m*n) |
| get                | O(1)   |
| set                | O(m)   |
| has                | O(1)   |
| delete             | O(m)   |

## Resources

* [Changelog](https://github.com/mohanteja1/multi-index-map/blob/master/CHANGELOG.md)

## License
[MIT](LICENSE)