import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../models/models';
import {AuthenticationService} from '../services/authentication.service';
import {DataAccessService} from '../services/data-access.service';
import {Subscription} from 'rxjs';

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
      this.hierarchy = this.convertUserArrToHierarchy(users.filter(u => !!u));
    });
  }

  logout() {
    this.authService.logout();
  }

  deleteUser(userId: number) {
    this.dataService.deleteUser(userId).subscribe();
  }

  ngAfterViewInit(): void {

  }

  private convertUserArrToHierarchy(usersArr): User[] {
    const treeList = [];
    const map: Map<number, User> = new Map();
    usersArr.forEach((user: User) => {
      map.set(user.id, user);
      // user.employees = [];
    });
    usersArr.forEach((user: User) => {
      if (user.managerId != null) {
        const manager = map.get(user.managerId);
        if (manager !== undefined) {
          if (manager.employees) {
            manager.employees.push(user);
          } else {
            manager.employees = [user];
          }
        } else {
          treeList.push(user);
        }
      } else {
        treeList.push(user);
      }
    });
    return treeList;
  }

  ngOnDestroy(): void {
    this.allUsersSubscription.unsubscribe();
  }
}
