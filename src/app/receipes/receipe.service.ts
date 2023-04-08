import { EventEmitter } from '@angular/core';
import { Receipe } from './receipe.model';

export class ReceipeService {
  receipeSelected = new EventEmitter<Receipe>();
  private receipes: Receipe[] = [
    new Receipe(
      'Cup Cake',
      'Vegetable moussaka.',
      'https://www.the-girl-who-ate-everything.com/wp-content/uploads/2016/10/edible-blood.jpg'
    ),
    new Receipe(
      'Pan Cake',
      'Home made Pan cake.',
      'https://www.onceuponachef.com/images/2009/08/pancakes-01.jpg'
    ),
    new Receipe(
      'Banana Cake',
      'Banana Pan Cake.',
      'https://www.healthygreenkitchen.com/wp-content/uploads/2023/03/Healthy-Banana-Pancakes-4.jpg'
    ),
  ];

  getReceipes() {
    return this.receipes.slice();
  }
}
