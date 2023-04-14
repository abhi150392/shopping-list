import { Component, OnInit } from '@angular/core';
import { Receipe } from '../receipe.model';
import { ReceipeService } from '../receipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-receipe-detail',
  templateUrl: './receipe-detail.component.html',
  styleUrls: ['./receipe-detail.component.css'],
})
export class ReceipeDetailComponent implements OnInit {
  receipe: Receipe;
  id: number;
  constructor(
    private receipeService: ReceipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    // const id = this.route.snapshot.params['id'];
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.receipe = this.receipeService.getReceipe(this.id);
    });
  }

  onAddToShoppingList() {
    this.receipeService.addItemsToShoppingList(this.receipe.ingredients);
  }

  onEditReceipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
    console.log('clicked');
    // this.router.navigate(['../', this.id, 'edit'], { relativeTo: this.route });
  }
  onDeleteReceipe() {
    this.receipeService.deleteRecipe(this.id);
    this.router.navigate(['/receipes']);
  }
}
