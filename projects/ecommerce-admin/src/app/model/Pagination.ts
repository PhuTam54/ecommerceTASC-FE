import { ApiResponse } from './ApiResponse';

export class PaginationResponse<T> extends ApiResponse<T> {
  paging!: Pagination;
  override data!: T;
  override success!: boolean;
  override message!: string;
}

export class Pagination {
  currentRecords!: number;
  firstPage!: number;
  lastPage!: number;
  totalPages!: number;
  totalRecords!: number;
  nextPage!: number;
  previousPage!: number;
  pageSize!: number;
  pageNumber!: number;
}
