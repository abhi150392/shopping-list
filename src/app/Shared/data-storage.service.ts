import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReceipeService } from '../receipes/receipe.service';
import { Receipe } from '../receipes/receipe.model';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { take } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private receipeService: ReceipeService,
    private authService: AuthService
  ) {}

  storeReceipes() {
    const receipes = this.receipeService.getReceipes();
    this.http
      .put(
        'https://my-angular-backend-cfd63-default-rtdb.firebaseio.com/receipes.json',
        receipes
      )
      .subscribe((resp) => {
        console.log(resp);
      });
  }

  getReceipes() {
    this.http
      .get<Receipe[]>(
        'https://my-angular-backend-cfd63-default-rtdb.firebaseio.com/receipes.json'
      )
      .subscribe((receipes) => {
        this.receipeService.setReceipes(receipes);
      });
  }
}
