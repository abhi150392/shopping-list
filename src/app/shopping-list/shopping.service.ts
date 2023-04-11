import { Subject } from 'rxjs';

import { Ingredient } from '../Shared/ingredient.model';
export class ShoppingService {
  ingredientAdded = new Subject<Ingredient[]>();
  startEditing = new Subject<number>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Mango', 15),
  ];

  getIngredient() {
    return this.ingredients.slice();
  }

  getIngredients(index: number) {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientAdded.next(this.ingredients.slice());
  }

  addItemsFromReceipeService(ingredient: Ingredient[]) {
    // for (let ingredient of this.ingredients) {
    //   this.addIngredient(ingredient);
    // }
    this.ingredients.push(...ingredient);
    this.ingredientAdded.next(this.ingredients.slice());
  }

  updateIngredient(index: number, newIngedient: Ingredient) {
    this.ingredients[index] = newIngedient;
    this.ingredientAdded.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientAdded.next(this.ingredients.slice());
  }
}
