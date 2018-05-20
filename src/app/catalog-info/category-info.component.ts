import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Offer} from '../shared/offer';
import { OfferService } from '../offer/offer.service';
import { CategoryService } from '../platform/category.service';

    
@Component({
    selector: 'category-info',
    templateUrl: 'category-info.component.html',
    styleUrls: ['category-info.component.css']
  
})

export class CategoryInfoComponent implements OnInit  { 
    
    objOffers: Offer[] = [];
    categoryName: string;

    constructor(private route: ActivatedRoute, 
        private offService: OfferService, 
        private categoryService: CategoryService){}

    ngOnInit(){
       var id = +this.route.snapshot.params['id'];
       this.offService.getAllOffers()
        .subscribe(offers => {this.objOffers = offers;
            console.log('this.objOffers = ', this.objOffers);
        });
        this.getCatName(id);
    }

    getOffer(Id: number){
        this.offService.getAllOffers()
        .subscribe(offers => {this.objOffers = offers;
            console.log('this.objOffers = ', this.objOffers);
        });
    }

    getCatName(Id: number){
        this.categoryName = this.offService.getCatalogNameById(Id);
    }

}