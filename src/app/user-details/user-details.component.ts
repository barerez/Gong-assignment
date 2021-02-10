import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FullName, User} from '../models/models';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  @Input() user: User;
  @Output('delete') deleteEmitter: EventEmitter<number> = new EventEmitter();
  actionsVisible = false;
  editMode: boolean;

  constructor() { }

  ngOnInit() {
  }

  showActions() {
    this.actionsVisible = true;
  }

  hideActions() {
    this.actionsVisible = false;
  }

  editClicked() {
    this.editMode = true;
  }

  cancelEdit() {
    this.editMode = false;
  }

  nameChanged(name: FullName) {
    //save name
  }

  delete() {
    this.deleteEmitter.emit(this.user.id);
  }
}
