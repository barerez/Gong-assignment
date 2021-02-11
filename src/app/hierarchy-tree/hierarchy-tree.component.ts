import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {UserFullName, User} from '../models/models';
import {AuthenticationService} from '../services/authentication.service';
import {DataAccessService} from '../services/data-access.service';
import {Subscription} from 'rxjs';
import {convertUserArrToHierarchy} from '../services/utils';

@Component({
  selector: 'app-hierarchy-tree',
  templateUrl: './hierarchy-tree.component.html',
  styleUrls: ['./hierarchy-tree.component.scss']
})
export class HierarchyTreeComponent implements OnInit, AfterViewInit, OnDestroy {
  user: User;
  hierarchy: User[];
  private allUsersSubscription: Subscription;

  constructor(private authService: AuthenticationService, public dataService: DataAccessService) { }

  ngOnInit() {
    this.user = this.authService.connectedUser;
    this.allUsersSubscription = this.dataService.allUsers.subscribe(users => {
      this.hierarchy = convertUserArrToHierarchy(users.filter(u => !!u));
    });
  }

  logout() {
    this.authService.logout();
  }

  deleteUser(userId: number) {
    this.dataService.deleteUser(userId);
  }

  ngAfterViewInit(): void {

  }

  ngOnDestroy(): void {
    this.allUsersSubscription.unsubscribe();
  }

  nameChanged(newName: UserFullName) {
    this.dataService.updateName(newName);
  }
}
