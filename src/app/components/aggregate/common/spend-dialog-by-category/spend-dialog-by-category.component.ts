import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MatSort, MatTableDataSource } from '@angular/material';
import { Spend } from '../../../../model/spend';

@Component({
  selector: 'app-spend-dialog-by-category',
  templateUrl: './spend-dialog-by-category.component.html',
  styleUrls: ['./spend-dialog-by-category.component.scss']
})
export class SpendDialogByCategoryComponent implements OnInit {
  displayedColumns: string[] = ['createDate', 'amount'];
  dataSource: MatTableDataSource<Spend>;
  isPublic: Boolean = false;
  categoryNum: Number = null;

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Spend
  ) {
    this.isPublic = data['isPublic'];
    this.categoryNum = data['categoryNum'];
    this.dataSource = new MatTableDataSource(data['spendList']);
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

}
