import { Routes } from '@angular/router';
import { CocktailListComponent } from './cocktail-list/cocktail-list.component';
import { CocktailDetailsComponent } from './cocktail-details/cocktail-details.component';

export const routes: Routes = [
    { path: '', redirectTo: '/cocktails', pathMatch: 'full'},
    { path: 'cocktails', component: CocktailListComponent, pathMatch:'full'},
    { path: 'cocktails/:cocktailId', component: CocktailDetailsComponent },
];
