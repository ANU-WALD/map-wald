export interface TableRow {
    [key: string]: any;
}
export declare function parseCSV(txt: string): TableRow[];
