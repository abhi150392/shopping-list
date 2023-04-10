import { Component, OnInit } from '@angular/core';
import { Receipe } from '../receipe.model';
import { ReceipeService } from '../receipe.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-receipe-list',
  templateUrl: './receipe-list.component.html',
  styleUrls: ['./receipe-list.component.css'],
})
export class ReceipeListComponent implements OnInit {
  // @Output() receipeWasSelected = new EventEmitter<Receipe>();
  receipes: Receipe[] = [];

  constructor(
    private receipeService: ReceipeService,
    private route: Router,
    private router: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.receipes = this.receipeService.getReceipes();
  }
  // onReceipeSelected(receipe: Receipe) {
  //   this.receipeWasSelected.emit(receipe);
  // }

  onNewReceipe() {
    this.route.navigate(['new'], { relativeTo: this.router });
  }
}
