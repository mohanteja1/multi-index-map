declare type IndexName = string;
declare type Value = any;
declare type Item = {
    [I: IndexName]: any;
};
declare class MultiIndexMap {
    private nonPrimiIndexesMap;
    private primeIndex;
    private primeIndexItemMap;
    private indexNames;
    constructor(indexNames: Array<IndexName>, items?: Array<Item>);
    get(indexName: IndexName, indexValue: any): Item | undefined;
    set(item: Item): void;
    has(indexName: IndexName, indexValue: Value): boolean;
    delete(indexName: IndexName, indexValue: Value): void;
}
export default MultiIndexMap;
