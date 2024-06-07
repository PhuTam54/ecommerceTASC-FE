import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pagination } from 'projects/ecommerce-admin/src/app/model/PaginationResponse';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  @Input() paging: Pagination;
  @Output() pageChange = new EventEmitter<any>();
  constructor(private cdr: ChangeDetectorRef) { }
  ngOnInit() {
  }
  onPageChange(value: number) {
    this.pageChange.emit(value)
  }
}
