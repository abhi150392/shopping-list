// import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Component, OnInit, Input } from '@angular/core';
import { Receipe } from '../../receipe.model';
import { ReceipeService } from '../../receipe.service';

@Component({
  selector: 'app-receipe-item',
  templateUrl: './receipe-item.component.html',
  styleUrls: ['./receipe-item.component.css'],
})
export class ReceipeItemComponent implements OnInit {
  @Input() receipe: Receipe;
  @Input() index: number;
  // @Output() recipeSelected = new EventEmitter<void>();
  constructor(private receipeService: ReceipeService) {}
  ngOnInit(): void {}
}
