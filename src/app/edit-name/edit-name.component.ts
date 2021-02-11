import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {UserFullName} from '../models/models';

@Component({
  selector: 'app-edit-name',
  templateUrl: './edit-name.component.html',
  styleUrls: ['./edit-name.component.scss']
})
export class EditNameComponent implements OnInit {

  @Input() name: UserFullName;

  @Output() changed: EventEmitter<UserFullName> = new EventEmitter();
  @Output() canceled: EventEmitter<void> = new EventEmitter();

  @ViewChild('first') firstNameEl: ElementRef;
  @ViewChild('last') lastNameEl: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  cancel() {
    this.canceled.emit();
  }

  saveName() {
    this.changed.emit(new UserFullName(this.name.id, this.firstNameEl.nativeElement.value,
      this.lastNameEl.nativeElement.value));
  }
}
