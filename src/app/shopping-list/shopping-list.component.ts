import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../Shared/ingredient.model';
import { ShoppingService } from './shopping.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[];
  constructor(private shoppingService: ShoppingService) {}
  ngOnInit(): void {
    this.ingredients = this.shoppingService.getIngredient();
    this.shoppingService.ingredientAdded.subscribe(
      (ingredient: Ingredient[]) => {
        this.ingredients = ingredient;
      }
    );
  }

  // onIngredientAdded(ingredient: Ingredient) {
  //   // this.ingredients = this.shoppingService.addIngredient(ingredient);
  //   this.ingredients.push(ingredient);
  // }
}
