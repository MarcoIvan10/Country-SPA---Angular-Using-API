import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  standalone: false,
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent {

  @Input()
  public placeholder: string = '';

  @Output()
  // public onValue: EventEmitter<string> = new EventEmitter();
  public onValue = new EventEmitter<string>(); //forma corta

  emitValue( value: string):void {
    this.onValue.emit(value);
  }
}
