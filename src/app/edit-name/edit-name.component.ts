import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FullName} from '../models/models';

@Component({
  selector: 'app-edit-name',
  templateUrl: './edit-name.component.html',
  styleUrls: ['./edit-name.component.scss']
})
export class EditNameComponent implements OnInit {

  @Input() firstName;
  @Input() lastName;

  @Output('nameChanged') nameChanged: EventEmitter<FullName> = new EventEmitter();
  @Output('cancel') cancelEmitter: EventEmitter<void> = new EventEmitter();

  @ViewChild('first') firstNameEl: ElementRef;
  @ViewChild('last') lastNameEl: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  cancel() {
    this.cancelEmitter.emit();
  }

  saveName() {
    this.nameChanged.emit(new FullName(this.firstNameEl.nativeElement.value,
      this.lastNameEl.nativeElement.value));
  }
}
