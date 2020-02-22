import {Component, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  books: any;
  displayedColumns = ['isbn', 'title', 'author'];
  dataSource: MatTableDataSource<any> = null;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getBooks()
      .subscribe(res => {
        this.books = res;
        this.dataSource = new MatTableDataSource(this.books)
      }, err => {
        console.log(err);
      });
  }
}

