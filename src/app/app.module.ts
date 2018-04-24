import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }   from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';




import {RouterModule} from '@angular/router';
import { NotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import {CatalogComponent} from './platform/catalog.component';
import {AuthoriseComponent} from './authorise/authorise.component';
import { AuthoriseService } from './authorise/authorise.service';
import {FormsModule} from '@angular/forms';
import {LoadUserComponent} from './loadUserInfo/load-user-info.component';
import { OfferService } from './offer/offer.service';
import { CategoryService } from './platform/category.service';
import { CategoryInfoComponent } from './catalog-info/category-info.component';
import { OfferDetailComponent } from './offer-detail/offer-deatil.component';
import { RegisterComponent } from './register/register.component';



@NgModule({
    imports:     [
        NgbModule.forRoot(),
        BrowserModule,
        FormsModule,
        RouterModule.forRoot([
            {path: 'home',component: HomeComponent},
            {path: 'authorise', component: AuthoriseComponent},
            {path: 'catalog',component: CatalogComponent},
            {path: 'catalog/:id',component: CategoryInfoComponent},
            {path: 'offerdetail/:id',component: OfferDetailComponent},
            {path: 'register',component: RegisterComponent},
            {path: '' ,redirectTo:'authorise' ,pathMatch: 'full'},
            {path:'**',component:NotFoundComponent}
        ])],
    declarations: [
    AppComponent,
    NotFoundComponent,
    HomeComponent,
    CatalogComponent,
    AuthoriseComponent,
    LoadUserComponent,
    CategoryInfoComponent,
    OfferDetailComponent,
    RegisterComponent
    ],
    providers: [AuthoriseService,OfferService, CategoryService],
    bootstrap: [ AppComponent ]
})
export class AppModule { }