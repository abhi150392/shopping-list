import { Component } from '@angular/core';
import { DataStorageService } from '../Shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
})
export class HeaderComponent {
  // @Output() featureSelected = new EventEmitter<string>();

  constructor(private dataService: DataStorageService) {}
  ngOnInit(): void {}
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
}
