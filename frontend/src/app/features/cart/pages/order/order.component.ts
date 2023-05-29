import { CurrencyPipe } from '@angular/common';
import { Component, OnInit, AfterViewInit,ViewChild } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../types/cart-item';
import { MaterialModule } from '../../../../material/material.module';
import { Product } from '../../../product/types/product.interface';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, CurrencyPipe,MaterialModule],

})
export class OrderComponent implements OnInit, AfterViewInit {
  
  displayedColumns: string[] = ['product', 'quantity', 'subtotal'];
  dataSource!: MatTableDataSource<CartItem>;

  @ViewChild(MatPaginator)paginator!: MatPaginator;
  
  constructor(private cartService: CartService){

  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.cartService.cartQuantityProduct$.subscribe( items => {
      this.dataSource= new MatTableDataSource<CartItem>(items);
    });

  }

  remove(item:Product){
   this.cartService.removeProduct(item);
  }

  add(item:Product){
    this.cartService.addProduct(item);
  }

}
