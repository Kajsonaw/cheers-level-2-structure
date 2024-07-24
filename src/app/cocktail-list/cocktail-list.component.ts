import { Component, OnInit } from '@angular/core';
import { Cocktail } from '../models/cocktail.model';
import { CocktailService } from '../services/cocktails-service.service';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-cocktail-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './cocktail-list.component.html',
  styleUrl: './cocktail-list.component.scss'
})
export class CocktailListComponent {
  displayCocktailList: Cocktail[] = [];
  allCocktailList: Cocktail[] = [];

  searchControl: FormControl = new FormControl('');

  constructor(
    private cocktailService: CocktailService,
  ) { }


  ngOnInit() {
    this.cocktailService.getAllCocktailsList().subscribe((data : Cocktail []) => {
      console.log(data);
      this.displayCocktailList = data;
      this.allCocktailList = data;
    });

    this.searchControl.valueChanges.subscribe(searchTerm => {
      if (searchTerm) {
        this.displayCocktailList = this.allCocktailList.filter(cocktail =>
          cocktail.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      } else {
        this.displayCocktailList = [...this.allCocktailList];
      }
    });

  }

  toggleFavorite(cocktailId: string) {
    if (this.cocktailService.isFavorite(cocktailId)) {
      this.cocktailService.removeFavorite(cocktailId);
    } else {
      this.cocktailService.addFavorite(cocktailId);
    }
  }

  isFavorite(cocktailId: string): boolean {
    return this.cocktailService.isFavorite(cocktailId);
  }


}
