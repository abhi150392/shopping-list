import { Component, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/Shared/ingredient.model';
import { ShoppingService } from '../shopping.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit {
  constructor(private shoppingService: ShoppingService) {}
  ngOnInit(): void {}

  onAddItem(form: NgForm) {
    const value = form.value;
    const newIngedient = new Ingredient(value.name, value.amount);
    this.shoppingService.addIngredient(newIngedient);
  }
}
