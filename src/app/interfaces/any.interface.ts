export interface ListRequest<T> {
  success: boolean;
  result: T[];
  total: number;
}

export interface TablePagination {
  pageNumber: number,
  totalElements: number,
  size: number,
}
