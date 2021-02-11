import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserFullName, User} from '../models/models';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  @Input() user: User;
  @Input() showEmployees: boolean;
  @Output() delete: EventEmitter<number> = new EventEmitter();
  @Output() changed: EventEmitter<UserFullName> = new EventEmitter();
  actionsVisible = false;
  editMode: boolean;

  constructor() { }

  ngOnInit() {
  }

  showActions(show: boolean) {
    this.actionsVisible = show;
  }

  editClicked() {
    this.editMode = true;
  }

  cancelEdit() {
    this.editMode = false;
  }

  nameChanged(name: UserFullName) {
    this.editMode = false;
    this.changed.emit(name);
  }

  deleteDisplayedUser() {
    this.delete.emit(this.user.id);
  }

  deleteChildUser(id) {
    this.delete.emit(id);
  }

  toggleExpandEmployees() {
    this.showEmployees = !this.showEmployees;
  }

  imgLoadFailed(user: User) {
    user.photo = null;
  }
}
