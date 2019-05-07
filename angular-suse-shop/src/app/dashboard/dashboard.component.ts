import { Component, OnInit } from '@angular/core';
import { PRODUCTS } from '../products';
import { PAYMETHODS } from '../paymethods';
import { StatisticService } from '../statistic.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  constructor(private statisticService: StatisticService) { }

  ngOnInit() {
  }

  products = PRODUCTS;
  paymethods = PAYMETHODS;

}


