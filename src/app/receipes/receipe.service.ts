import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Receipe } from './receipe.model';
import { Ingredient } from '../Shared/ingredient.model';
import { ShoppingService } from '../shopping-list/shopping.service';

@Injectable()
export class ReceipeService {
  constructor(private slService: ShoppingService) {}
  // receipeSelected = new Subject<Receipe>();
  private receipes: Receipe[] = [
    new Receipe(
      'Cup Cake',
      'Vegetable moussaka.',
      'https://www.the-girl-who-ate-everything.com/wp-content/uploads/2016/10/edible-blood.jpg',
      [new Ingredient('bread', 1), new Ingredient('cream', 2)]
    ),
    new Receipe(
      'Pan Cake',
      'Home made Pan cake.',
      'https://www.onceuponachef.com/images/2009/08/pancakes-01.jpg',
      [new Ingredient('bread', 3), new Ingredient('cream', 2)]
    ),
    new Receipe(
      'Banana Cake',
      'Banana Pan Cake.',
      'https://www.healthygreenkitchen.com/wp-content/uploads/2023/03/Healthy-Banana-Pancakes-4.jpg',
      [new Ingredient('bread', 2), new Ingredient('banana', 3)]
    ),
  ];

  getReceipes() {
    return this.receipes.slice();
  }

  getReceipe(id: number) {
    return this.receipes[id];
  }

  addItemsToShoppingList(ingredient: Ingredient[]) {
    this.slService.addItemsFromReceipeService(ingredient);
  }
}
