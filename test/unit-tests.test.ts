import MultiIndexMap from '../src/index';
import {
  testContactsList,
  itemNotInTestContactsList,
  itemWithDifferentStructure,
  itemWithMissingIndex,
  uniqueIndexes,
} from './testdata';

// @ts-ignore
function getRandomItem(items = []) {
 return items[Math.floor(Math.random()*items.length)];
}

describe('MultiIndexMap: ', () => {
  describe('Initialization: creating MultiIndexMap instance', () => {
    it("should map all items with the indexes properly", () => {
      const multiIndexMap = new MultiIndexMap(['id', 'email', 'phone'], testContactsList);
      const expectedItem = getRandomItem(testContactsList);
      expect(multiIndexMap.has('phone', expectedItem.phone)).toBe(true);
      expect(multiIndexMap.has('id', expectedItem.id)).toBe(true);
      expect(multiIndexMap.has('email', expectedItem.email)).toBe(true);
    });

    it("shouldn't map items with other than the passed indexes", () => {
      const multiIndexMap = new MultiIndexMap(['id', 'phone'], testContactsList);
      const expectedItem = getRandomItem(testContactsList);
      expect(multiIndexMap.has('phone', expectedItem.phone)).toBe(true);
      expect(multiIndexMap.has('id', expectedItem.id)).toBe(true);
      expect(multiIndexMap.has('email', expectedItem.email)).toBe(false);
      expect(multiIndexMap.has('age', expectedItem.age)).toBe(false);
    });

    it("should map items even when only one index is passed", () => {
      const multiIndexMap = new MultiIndexMap(['email'], testContactsList);
      const expectedItem = getRandomItem(testContactsList);
      expect(multiIndexMap.has('email', expectedItem.email)).toBe(true);
      expect(multiIndexMap.has('phone', expectedItem.phone)).toBe(false);
      expect(multiIndexMap.has('id', expectedItem.id)).toBe(false);
    });

    it("should initialize just with the indexes (without even the items)", () => {
      let multiIndexMap;
      expect(() => {
        multiIndexMap = new MultiIndexMap(['id', 'email', 'phone']);
      }).not.toThrowError();
      expect(multiIndexMap).not.toBeUndefined();
      // @ts-ignore
      expect(multiIndexMap.size).toBe(0);
      const item = getRandomItem(testContactsList);
      // @ts-ignore
      multiIndexMap?.set(item);
      // @ts-ignore
      expect(multiIndexMap.size).toBe(1);
    });

    it("should through error if no or empty indexes are passed", () => {
      // @ts-ignore
      expect(() => new MultiIndexMap()).toThrowError();
      expect(() => new MultiIndexMap([])).toThrowError();
    });

    it("should throw error if items are not unique over all the indexes passed", () => {
      expect(() => {
        new MultiIndexMap(['id', 'email', 'phone'], [...testContactsList, ...testContactsList]);
      }).toThrowError();
    });
  });


  describe('get : to get the item in the map', () => {

    it("should get the item that is mapped", () => {
      let multiIndexMap = new MultiIndexMap(['id', 'email', 'phone'], testContactsList);
      let expectedItem = getRandomItem(testContactsList);
      expect(multiIndexMap.get('id', expectedItem.id)).toEqual(expectedItem);
      expectedItem = getRandomItem(testContactsList);
      expect(multiIndexMap.get('phone', expectedItem.phone)).toEqual(expectedItem);
      expectedItem = getRandomItem(testContactsList);
      expect(multiIndexMap.get('email', expectedItem.email)).toEqual(expectedItem);
    });

    it("should return undefined when item is not available (mapped)", () => {
      let multiIndexMap = new MultiIndexMap(['id', 'email', 'phone'], testContactsList);
      const someDifferentValue = "some value which is not from the list";
      expect(JSON.stringify(testContactsList).includes(someDifferentValue)).toBe(false);
      expect(multiIndexMap.get('id', someDifferentValue)).toBeUndefined();
    });

    it("should return undefined when the property that is not indexed is used", () => {
      let multiIndexMap = new MultiIndexMap(['id', 'email', 'phone'], testContactsList);
      let expectedItem = getRandomItem(testContactsList);
      expect(multiIndexMap.get('name', expectedItem.name)).toBeUndefined();
    });

  });



  describe('set: sets item to the map using indexes passed on initialization', () => {

    it("should add item and map all the indexes passed before", () => {
      const multiIndexMap = new MultiIndexMap(['id', 'email', 'phone'], testContactsList);
      multiIndexMap.set(itemNotInTestContactsList);
      expect(multiIndexMap.has('email', itemNotInTestContactsList.email)).toBe(true);
      expect(multiIndexMap.get('phone', itemNotInTestContactsList.phone)).toEqual(itemNotInTestContactsList);
    });

    it("should throw error if index values already present", () => {
      const multiIndexMap = new MultiIndexMap(['id', 'email', 'phone'], testContactsList);
      expect(() => multiIndexMap.set(getRandomItem(testContactsList))).toThrowError();
    });

    it("should throw error if index properties are not present in item", () => {
      const multiIndexMap = new MultiIndexMap(['id', 'email', 'phone'], testContactsList);
      expect(() => multiIndexMap.set(itemWithDifferentStructure)).toThrowError();
      expect(() => multiIndexMap.set(itemWithMissingIndex)).toThrowError();
      expect(() => multiIndexMap.set({})).toThrowError();
    });

    it("should throw error if item is not a proper object", () => {
      const multiIndexMap = new MultiIndexMap(['id', 'email', 'phone'], testContactsList);
      ['', 99, true, undefined, Map, [], 333.44, null].forEach((item) => {
        // @ts-ignore
        expect(() => multiIndexMap.set(item)).toThrowError();
      });
    });
  });




  describe('has: returns true if item is found else false', () => {
    it("should return true if item is present", () => {
      const multiIndexMap = new MultiIndexMap(['id', 'email', 'phone'], testContactsList);
      const expectedItem = getRandomItem(testContactsList);
      expect(multiIndexMap.has('email', expectedItem.email)).toBe(true);
    });

    it("should return false if item is not present", () => {
      const multiIndexMap = new MultiIndexMap(['id', 'email', 'phone'], testContactsList);
      expect(multiIndexMap.has('email', itemNotInTestContactsList.email)).toBe(false);
    });

    it("should return false if invalid index is used", () => {
      const multiIndexMap = new MultiIndexMap(['id', 'email', 'phone'], testContactsList);
      const expectedItem = getRandomItem(testContactsList);
      expect(multiIndexMap.has('name', expectedItem.email)).toBe(false);
    });
  });



  describe('delete: removes item and its indexes from map if found', () => {

    it("should remove item when found", () => {
      let multiIndexMap = new MultiIndexMap(['id', 'email', 'phone'], testContactsList);
      let toBeDeleted = testContactsList[0];
      multiIndexMap.delete('email', toBeDeleted.email);
      expect(multiIndexMap.has('email', toBeDeleted.email)).toBe(false);
      toBeDeleted = testContactsList[1];
      multiIndexMap.delete('id', toBeDeleted.id);
      expect(multiIndexMap.has('id', toBeDeleted.id)).toBe(false);
      toBeDeleted = testContactsList[2];
      multiIndexMap.delete('id', toBeDeleted.id);
      expect(multiIndexMap.has('id', toBeDeleted.id)).toBe(false);
    });

    it("shouldn't remove any item when required item is not found", () => {
      let multiIndexMap = new MultiIndexMap(['id', 'email', 'phone'], testContactsList);
      const size = multiIndexMap.size;
      multiIndexMap.delete('email', itemNotInTestContactsList.email);
      expect(multiIndexMap.size).toBe(size);
    });
  });

});
