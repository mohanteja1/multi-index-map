
type IndexName = string;
type Value = any;
type Item = { [I: IndexName]: any };
type nonPrimeToPrimeIndexValuesMap =  Map<Value, Value>;

const ERRORS = {
  ITEM_NOT_OBJECT: new Error("MultiIndexMap: cannot add item as it is not an object"),
  INDEXED_PROPERTY_NOT_FOUND_IN_ITEM: new Error("MultiIndexMap: cannot add as an indexed property is not found in item"),
  INDEXNAMES_EMPTY: new Error("MultiIndexMap: index names cannot be empty or undefined"),
}

class MultiIndexMap {
  private nonPrimiIndexesMap: Map<IndexName, nonPrimeToPrimeIndexValuesMap>;
  private primeIndex: IndexName;
  private primeIndexItemMap: Map<IndexName, Item>;
  private indexNames: Array<IndexName>;

  constructor(indexNames: Array<IndexName>, items: Array<Item> = []) {
    if (!indexNames?.length) throw ERRORS.INDEXNAMES_EMPTY;
    this.indexNames = indexNames;
    const [primeIndex, ...nonPrimeIndexes] = indexNames;
    this.primeIndex = primeIndex;
    this.primeIndexItemMap = new Map();
    this.nonPrimiIndexesMap = items.reduce<Map<IndexName, nonPrimeToPrimeIndexValuesMap>>((acc, item) => {
      if (typeof item !== 'object') throw ERRORS.ITEM_NOT_OBJECT;
      if (!item.hasOwnProperty(primeIndex)) throw ERRORS.INDEXED_PROPERTY_NOT_FOUND_IN_ITEM;
      this.primeIndexItemMap.set(item[primeIndex], item);
      nonPrimeIndexes.forEach((indexName) => {
        if (!item.hasOwnProperty(indexName)) throw ERRORS.INDEXED_PROPERTY_NOT_FOUND_IN_ITEM;
        acc.get(indexName)?.set(item[indexName], item[primeIndex]);
      })
      return acc;
    }, new Map(indexNames.map(indexName => [indexName, new Map()])));
  }

  get(indexName: IndexName, indexValue: any) : Item | undefined {
    if (indexName === this.primeIndex) return this.primeIndexItemMap.get(indexValue);
    return this.primeIndexItemMap.get(this.nonPrimiIndexesMap.get(indexName)?.get(indexValue));
  }

  set(item: Item) {
    for (const key in this.indexNames) {
      if (!item.hasOwnProperty(key)) throw ERRORS.INDEXED_PROPERTY_NOT_FOUND_IN_ITEM;
    }
    const [primeIndex, ...nonPrimeIndexes] = this.indexNames;
    this.primeIndexItemMap.set(item[primeIndex], item);
    for (const key in nonPrimeIndexes) {
      this.nonPrimiIndexesMap.get(key)?.set(item[key], item[primeIndex]);
    }
  }

  has(indexName: IndexName, indexValue: Value): boolean {
    return !!this.nonPrimiIndexesMap.get(indexName)?.has(indexValue);
  }

  delete(indexName: IndexName, indexValue: Value) {
    const item = this.get(indexName, indexValue);
    if (item) {
      const [primeIndex, ...nonPrimeIndexes] = this.indexNames;
      for (const key in nonPrimeIndexes) {
        this.nonPrimiIndexesMap.get(key)?.delete(item[key]);
      }
      this.primeIndexItemMap.delete(item[primeIndex]);
    }
  }

}


export default MultiIndexMap;