import { Component, OnInit } from '@angular/core';
import { Order } from '../order';
import { OrderService } from '../order.service';
import { PRODUCTS } from '../products';
import { PAYMETHODS } from '../paymethods';
import { Product } from '../product';
import { Paymethod } from '../paymethod';

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

  products = PRODUCTS;
  paymethods = PAYMETHODS;

  selectedProduct: Product;
  selectedPaymethod: Paymethod;

  order = new Order(null,null,null);
  message = "";
  success_msg = "Thank you!";
  fail_msg = "Failed to submit order. Please retry!";
  validform = false;
  show = false;
 

  setProduct(product: Product): void {
    this.selectedProduct = product;
    this.order.price = product.price;
    this.order.product_id = product.id;
    this.validform = (this.selectedProduct != null) && (this.selectedPaymethod != null);
  }

  setPaymethod(paymethod: Paymethod): void {
    this.selectedPaymethod = paymethod;
    this.order.paymethod_id = paymethod.id;
    this.validform = (this.selectedProduct != null) && (this.selectedPaymethod != null);
  }

  onSubmit(){
    if (this.show || !this.validform) {
      return;
    }

    console.log("json: "+ this.getDiagnostic())

    this.oderService.addOrder(this.order)
      .subscribe( (order) => {     
        this.message = this.success_msg;                  
        this.showDialog();
      });

  }

  getDiagnostic() {
    return JSON.stringify(this.order);
  }

  showDialog() {
    this.show = true;
    this.selectedProduct = null;
    this.selectedPaymethod = null;
  }

  closeDialog(){
    this.show = false;
    this.validform = false;
  }
}
