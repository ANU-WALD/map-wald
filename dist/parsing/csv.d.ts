export interface TableRow {
    [key: string]: any;
}
export interface CsvParserOptions {
    columns?: string[];
}
export declare function parseCSV(txt: string, options?: CsvParserOptions): TableRow[];
