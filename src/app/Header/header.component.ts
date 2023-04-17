import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../Shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
})
export class HeaderComponent implements OnInit {
  // @Output() featureSelected = new EventEmitter<string>();
  private userSub: Subscription;
  isAuthenticated = false;

  constructor(
    private dataService: DataStorageService,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      // this.isAuthenticated = !user ? false : true;
      this.isAuthenticated = !!user;
    });
  }
  // onSelect(feature: string) {
  //   // console.log(feature);
  //   this.featureSelected.emit(feature);
  // }
  onSaveData() {
    this.dataService.storeReceipes();
  }

  onFetchData() {
    this.dataService.getReceipes();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
