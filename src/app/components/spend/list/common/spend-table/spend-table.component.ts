import { Component, Input, Output, EventEmitter, ViewChild, OnChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatSort } from '@angular/material';
import store from '../../../../../store/spendType';

@Component({
  selector: 'app-spend-table',
  templateUrl: './spend-table.component.html',
  styleUrls: ['./spend-table.component.scss']
})
export class SpendTableComponent implements OnChanges {
  displayedColumns: string[] = ['createDate', 'category', 'amount'];
  dataSource  = new MatTableDataSource();
  storeObj    = store;

  @Input() spendList;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Output() openBottomSheetEvent = new EventEmitter();

  constructor() { }

  ngOnChanges() {
    this.dataSource = new MatTableDataSource(this.spendList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openBottomSheet(spend): void {
    this.openBottomSheetEvent.emit(spend);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
