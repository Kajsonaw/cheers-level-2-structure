import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Cocktail } from '../models/cocktail.model';
import { CocktailService } from '../services/cocktails-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cocktail-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cocktail-details.component.html',
  styleUrl: './cocktail-details.component.scss'
})
export class CocktailDetailsComponent {
  cocktailId: string | null = '';
  cocktail: Cocktail;

  constructor(
    private router: ActivatedRoute, 
    private cocktailService: CocktailService) {}

    ngOnInit(): void {
      this.router.paramMap.subscribe(params => {
        this.cocktailId = params.get('cocktailId');
        console.log(this.cocktailId);
      });
      if(this.cocktailId){
        this.cocktailService.getCocktailDetails(this.cocktailId).subscribe(
          (res) => this.cocktail = res,
          (err) => console.log(err)
        )
      }
    }

    toggleFavorite() {
      if (this.cocktail) {
        if (this.cocktailService.isFavorite(this.cocktail.id)) {
          this.cocktailService.removeFavorite(this.cocktail.id);
        } else {
          this.cocktailService.addFavorite(this.cocktail.id);
        }
      }
    }
  
    isFavorite(): boolean {
      return this.cocktail ? this.cocktailService.isFavorite(this.cocktail.id) : false;
    }
}
