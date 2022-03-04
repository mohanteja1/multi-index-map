declare type IndexName = string;
declare type Value = any;
declare type Item = {
    [I: IndexName]: any;
};
declare class MultiIndexMap {
    private primeIndexItemMap;
    private nonPrimeIndexesMap;
    private primeIndex;
    private nonPrimeIndexes;
    private indexNames;
    constructor(indexNames: Array<IndexName>, items?: Array<Item>);
    private __initMaps;
    get(indexName: IndexName, indexValue: any): Item | undefined;
    set(item: Item): void;
    has(indexName: IndexName, indexValue: Value): boolean;
    delete(indexName: IndexName, indexValue: Value): void;
    keys(indexName: IndexName): IterableIterator<string>;
    values(): IterableIterator<Item>;
    clear(): void;
    get size(): number;
}
export default MultiIndexMap;
