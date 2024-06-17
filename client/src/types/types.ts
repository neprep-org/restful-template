export type ActiveButtonType = "Entity 1" | "Entity 2" | "Entity 3";

export interface Column<T = any> {
  id?: string;
  /**
   * The key is used to identify the column in the data object.
   *@description It can be string like 'name' or 'name.first' if the value you want is nested at certain level
   */
  key: string;
  header: string | ((tableContext: TableContext<T>) => React.ReactNode);
  /**
   * The cell is used to render the content of the cell.
   * If not provided, the cell will be rendered with the value from the data object by the key.
   */
  cell?: (cellContext: CellContext<T>) => React.ReactNode;
  getValue?: (row: T) => string;
  /**
   * Whether the column can be sorted or not
   */
  sortable?: boolean;
  align?: "left" | "center" | "right";
  omit?: boolean;
}

export interface CellContext<T = any> {
  value: any;
  row: RowContext<T>;
  table: TableContext<T>;
}

export interface RowContext<T = any> {
  data: T;
  isSelected: boolean;
}

export interface TableContext<T = any> {
  setGlobalFilter: (value: string) => void;
  globalFilter: string;
  data: T[];
  getSelectedRows: () => T[];
}

export interface IPagination {
  page: number;
  perPage: number;
  total: number;
  onChange: (page: number) => void;
}
