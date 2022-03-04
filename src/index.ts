
type IndexName = string;
type Value = any;
type Item = { [I: IndexName]: any };
type NonPrimeToPrimeIndexValuesMap =  Map<Value, Value>;

const ERRORS = {
  ITEM_NOT_OBJECT: "MultiIndexMap: cannot add item as it is not an object",
  INDEXED_PROPERTY_NOT_FOUND_IN_ITEM: "MultiIndexMap: cannot add as an indexed property is not found in item",
  INDEXNAMES_EMPTY: "MultiIndexMap: index names cannot be empty or undefined",
  INDEXED_VALUES_NOT_UNIQUE: "MultiIndexMap: indexed prop values should be unique",
}

class MultiIndexMap {
  private primeIndexItemMap: Map<IndexName, Item>;
  private nonPrimeIndexesMap: Map<IndexName, NonPrimeToPrimeIndexValuesMap>;
  private primeIndex: IndexName;
  private nonPrimeIndexes: Array<IndexName>;
  private indexNames: Array<IndexName>;

  constructor(indexNames: Array<IndexName>, items: Array<Item> = []) {
    if (!indexNames?.length) throw new Error(ERRORS.INDEXNAMES_EMPTY);
    this.indexNames = indexNames;
    const [primeIndex, ...nonPrimeIndexes] = indexNames;
    this.primeIndex = primeIndex;
    this.nonPrimeIndexes = nonPrimeIndexes;
    this.__initMaps();
    items.forEach((item) => this.set(item));
  }

  private __initMaps() {
    this.primeIndexItemMap = new Map();
    this.nonPrimeIndexesMap = new Map(this.nonPrimeIndexes.map(indexName => [indexName, new Map()]));
  }

  get(indexName: IndexName, indexValue: any) : Item | undefined {
    if (indexName === this.primeIndex) return this.primeIndexItemMap.get(indexValue);
    return this.primeIndexItemMap.get(this.nonPrimeIndexesMap.get(indexName)?.get(indexValue));
  }

  set(item: Item) {
    if (typeof item !== 'object') throw new Error(ERRORS.ITEM_NOT_OBJECT);
    this.indexNames.forEach((key) => {
      if (!item.hasOwnProperty(key)) throw new Error(ERRORS.INDEXED_PROPERTY_NOT_FOUND_IN_ITEM);
      if (this.has(key, item[key])) throw new Error(ERRORS.INDEXED_VALUES_NOT_UNIQUE);
    });
    this.primeIndexItemMap.set(item[this.primeIndex], item);
    this.nonPrimeIndexes.forEach((key) => {
      this.nonPrimeIndexesMap.get(key)?.set(item[key], item[this.primeIndex]);
    });
  }

  has(indexName: IndexName, indexValue: Value): boolean {
    if (indexName === this.primeIndex) return this.primeIndexItemMap.has(indexValue);
    return !!this.nonPrimeIndexesMap.get(indexName)?.has(indexValue);
  }

  delete(indexName: IndexName, indexValue: Value) {
    const item = this.get(indexName, indexValue);
    if (item) {
      this.nonPrimeIndexes.forEach((key) => {
        this.nonPrimeIndexesMap.get(key)?.delete(item[key]);
      });
      this.primeIndexItemMap.delete(item[this.primeIndex]);
    }
  }

  keys(indexName: IndexName): IterableIterator<string> {
    if (indexName === this.primeIndex) return this.primeIndexItemMap.keys();
    return this.nonPrimeIndexesMap.get(indexName)?.keys();
  }

  values(): IterableIterator<Item> {
    return this.primeIndexItemMap.values();
  }

  clear() {
    this.__initMaps();
  }


  get size(): number {
    return this.primeIndexItemMap.size;
  }

}


export default MultiIndexMap;