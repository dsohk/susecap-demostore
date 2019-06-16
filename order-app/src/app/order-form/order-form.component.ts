import { Component, OnInit } from '@angular/core';
import { Order } from '../order';
import { OrderService } from '../order.service';
import { PRODUCTS } from '../products';
import { PAYMETHODS } from '../paymethods';
import { Product } from '../product';
import { Paymethod } from '../paymethod';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.sass']
})
export class OrderFormComponent implements OnInit {

  constructor(private oderService: OrderService) {
     
  }

  ngOnInit() {
  }

  customer = "";
  products = PRODUCTS;
  paymethods = PAYMETHODS;

  selectedProduct: Product;
  selectedPaymethod: Paymethod;

  order = new Order(null,null,null,null,null);
  message = "";
  success_msg = "Thank you for your order!";
  fail_msg = "Failed to submit order. Please retry!";
  validform = false;
  show = false;
  ordering = false;
 
  checkCustomer(): void {
    this.validform = this.selectedProduct != null && 
                        this.selectedPaymethod != null && 
                        this.order.customer != null && 
                        this.order.customer != "";
  }


  setProduct(product: Product): void {
    this.selectedProduct = product;
    this.order.price = product.price;
    this.order.product_id = product.id;
    this.validform = this.selectedProduct != null && 
                        this.selectedPaymethod != null && 
                        this.order.customer != null && 
                        this.order.customer != "";
  }

  setPaymethod(paymethod: Paymethod): void {
    this.selectedPaymethod = paymethod;
    this.order.paymethod_id = paymethod.id;
    this.validform = this.selectedProduct != null && 
                        this.selectedPaymethod != null && 
                        this.order.customer != null && 
                        this.order.customer != "";
  }

  onSubmit(){
    if (this.show || !this.validform) {
      return;
    }
    
    this.order.timestamp = formatDate(Date.now(), 'yyyy-mm-dd hh:mm:ss', 'en-US');
    this.customer = this.order.customer;
    console.log("json: "+ this.getDiagnostic())

    this.showDialog();
    this.oderService.addOrder(this.order)
      .subscribe( (order) => {     
        this.message = this.success_msg;                  
        this.showAck();
      });

  }

  getDiagnostic() {
    return JSON.stringify(this.order);
  }

  showDialog(){
    this.show = true;
    this.ordering = true;
  }

  showAck() {
    this.show = true;
    this.ordering = false;
    this.selectedProduct = null;
    this.selectedPaymethod = null;
   
  }

  closeDialog(){
    this.show = false;
    this.ordering = false;
    this.validform = false;
  }
}
