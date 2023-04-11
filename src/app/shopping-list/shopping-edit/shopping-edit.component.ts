import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/Shared/ingredient.model';
import { ShoppingService } from '../shopping.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('form') slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  edittedItem: number;
  eItem: Ingredient;
  constructor(private shoppingService: ShoppingService) {}
  ngOnInit(): void {
    this.subscription = this.shoppingService.startEditing.subscribe(
      (index: number) => {
        this.edittedItem = index;
        this.editMode = true;
        this.eItem = this.shoppingService.getIngredients(index);
        this.slForm.setValue({
          name: this.eItem.name,
          amount: this.eItem.amount,
        });
      }
    );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngedient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.shoppingService.updateIngredient(this.edittedItem, newIngedient);
    } else {
      this.shoppingService.addIngredient(newIngedient);
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.shoppingService.deleteIngredient(this.edittedItem);
    this.onClear();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
