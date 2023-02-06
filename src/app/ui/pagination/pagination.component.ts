import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Paginator} from "../../models/paginator";

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit, OnChanges
{

  @Input() paginator!: Paginator;

  pages: number[] = [];

  ngOnInit(): void {
    this.paginator= {size: 10, totalElements: 1000, totalPages: 100, number: 0, component: '/dashboard/products/page/', first: true, numberOfElements: 10, empty: false, last: false};
    this.initPaginator();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const paginatorUpdated = changes['paginator'];
    if (paginatorUpdated.previousValue)
    {
      this.initPaginator();
    }
  }

  nextPage() {
    return (this.paginator.number++)%this.paginator.totalPages;
  }
  private initPaginator() {
    console.log("mi paginacion esta asi ahora", this.paginator);

    if (this.paginator.number >= this.paginator.totalPages-1)
    {
      this.pages= [this.paginator.number];
      return;
    }
    if ( (this.paginator.totalPages-this.paginator.number ) < this.paginator.size)
    {
      this.pages= new Array(Math.abs(this.paginator.totalPages-this.paginator.number)).fill(this.paginator.number).map((currentPage, indice) => indice + currentPage);
      return;
    }

    this.pages= new Array(this.paginator.size).fill(this.paginator.number).map((currentPage, indice) => indice + currentPage);
  }
}
