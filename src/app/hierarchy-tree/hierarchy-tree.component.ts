import { Component, OnInit } from '@angular/core';
import {User} from '../models/models';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'app-hierarchy-tree',
  templateUrl: './hierarchy-tree.component.html',
  styleUrls: ['./hierarchy-tree.component.scss']
})
export class HierarchyTreeComponent implements OnInit {
  user: User;

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    this.user = this.authService.connectedUser;
  }

  logout() {
    this.authService.logout();
  }
}
