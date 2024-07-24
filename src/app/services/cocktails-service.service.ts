import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cocktail } from '../models/cocktail.model';

@Injectable({
  providedIn: 'root'
})
export class CocktailService {

  private favoriteCocktailsKey: string = 'favorites';

  constructor(private http: HttpClient) { }

  getAllCocktailsList() {
    return this.http.get<Cocktail[]>("/cockails")
  }

  getCocktailDetails(id: string) {
    return this.http.get<Cocktail>("/cockails/" + id)
  }

  getFavorites(): string[] {
    const favorites = localStorage.getItem(this.favoriteCocktailsKey);
    return favorites ? JSON.parse(favorites) : [];
  }

  addFavorite(id: string) {
    const favorites = this.getFavorites();
    if (!favorites.includes(id)) {
      favorites.push(id);
      localStorage.setItem(this.favoriteCocktailsKey, JSON.stringify(favorites));
    }
  }

  removeFavorite(id: string) {
    const favorites = this.getFavorites().filter(favId => favId !== id);
    localStorage.setItem(this.favoriteCocktailsKey, JSON.stringify(favorites));
  }

  isFavorite(id: string): boolean {
    return this.getFavorites().includes(id);
  }
}
