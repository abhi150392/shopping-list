import { EventEmitter } from '@angular/core';
import { Ingredient } from '../Shared/ingredient.model';
export class ShoppingService {
  ingredientAdded = new EventEmitter<Ingredient[]>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Mango', 15),
  ];

  getIngredient() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientAdded.emit(this.ingredients.slice());
  }

  addItemsFromReceipeService(ingredient: Ingredient[]) {
    // for (let ingredient of this.ingredients) {
    //   this.addIngredient(ingredient);
    // }
    this.ingredients.push(...ingredient);
    this.ingredientAdded.emit(this.ingredients.slice());
  }
}
