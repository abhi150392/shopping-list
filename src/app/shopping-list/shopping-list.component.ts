import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../Shared/ingredient.model';
import { ShoppingService } from './shopping.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  changeSub: Subscription;
  constructor(private shoppingService: ShoppingService) {}
  ngOnInit(): void {
    this.ingredients = this.shoppingService.getIngredient();
    this.changeSub = this.shoppingService.ingredientAdded.subscribe(
      (ingredient: Ingredient[]) => {
        this.ingredients = ingredient;
      }
    );
  }

  ngOnDestroy(): void {
    this.changeSub.unsubscribe();
  }
  // onIngredientAdded(ingredient: Ingredient) {
  //   // this.ingredients = this.shoppingService.addIngredient(ingredient);
  //   this.ingredients.push(ingredient);
  // }

  onEditItem(index: number) {
    this.shoppingService.startEditing.next(index);
  }
}
