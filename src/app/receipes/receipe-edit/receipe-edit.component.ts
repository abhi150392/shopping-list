import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormArrayName,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { ReceipeService } from '../receipe.service';

@Component({
  selector: 'app-receipe-edit',
  templateUrl: './receipe-edit.component.html',
  styleUrls: ['./receipe-edit.component.css'],
})
export class ReceipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  receipeForm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private receipeService: ReceipeService
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  private initForm() {
    let receipeName = '';
    let receipeImagePath = '';
    let receipeDescription = '';
    let receipeIngredients = new FormArray([]);
    if (this.editMode) {
      const receipe = this.receipeService.getReceipe(this.id);
      receipeName = receipe.name;
      receipeImagePath = receipe.imagePath;
      receipeDescription = receipe.description;
      if (receipe['ingredients']) {
        for (let ingredient of receipe.ingredients) {
          receipeIngredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, Validators.required),
            })
          );
        }
      }
    } else {
      this.receipeForm = new FormGroup({
        name: new FormControl(receipeName, Validators.required),
        imagePath: new FormControl(receipeImagePath, Validators.required),
        description: new FormControl(receipeDescription, Validators.required),
        ingredients: receipeIngredients,
      });
    }
  }
  onSubmit() {
    console.log(this.receipeForm);
  }

  onAdd() {
    (<FormArray>this.receipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(),
      })
    );
  }
}
