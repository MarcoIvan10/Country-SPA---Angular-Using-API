import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  standalone: false,
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  private dbouncer: Subject<string> = new Subject<string>();
  private dbouncerSuscription?: Subscription;

  @Input()
  public placeholder: string = '';

  @Output()
  // public onValue: EventEmitter<string> = new EventEmitter();
  public onValue = new EventEmitter<string>(); //forma corta

  @Output()
  public onDebounce = new EventEmitter<string>();

  ngOnInit(): void {
    this.dbouncerSuscription = this.dbouncer
    .pipe(
      debounceTime(300)
    )
    .subscribe( value => {
      this.onDebounce.emit(value);
    })
  }

  ngOnDestroy(): void {
    this.dbouncerSuscription?.unsubscribe();
  }

  emitValue( value: string):void {
    this.onValue.emit(value);
  }

  onKeyPress( searchTerm: string ) {
    this.dbouncer.next( searchTerm );
  }
}
