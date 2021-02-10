import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {forkJoin, Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {User} from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class DataAccessService {

  constructor(private http: HttpClient) {
    this.usersObservable = this.http.get(`${DataAccessService.BASE_URL}/users/.json`).pipe(
      tap((users: User[]) => this.users = users)
    );
    this.usersObservable.subscribe();
  }
  private static BASE_URL = 'https://gongfetest.firebaseio.com';
  private hierarchy;
  private usersObservable: Observable<User[]>;
  users: User[];

  public getUserId(secret: string): Observable<any> {
    return forkJoin(this.usersObservable, this.http.get(`${DataAccessService.BASE_URL}/secrets/${secret}.json`)).pipe(
      map(res => res[1])
    );
  }

  public getUserIndexById(id: number) {
    return this.users.map(user => user.id).indexOf(id);
  }

  public getUserField(index: number, field: string) {
    this.http.get(`${DataAccessService.BASE_URL}/users/${index}/${field}.json`);
  }

  public updateUser(index: number, fields: {key: string, value: string | number}) {
    let headers = new HttpHeaders();
    headers = headers.set('dataType', 'json').set('Content-Type', 'application/json');
    this.http.patch(`${DataAccessService.BASE_URL}/users/${index}.json`, fields, {headers: headers});
  }

  public deleteUserField(index: number, field: string) {
    return this.http.delete(`${DataAccessService.BASE_URL}/users/${index}/${field}.json`);
  }

  deleteUser(userId: number) {
    const index = this.getUserIndexById(userId);
    return this.http.delete(`${DataAccessService.BASE_URL}/users/${index}.json`);
  }
}
