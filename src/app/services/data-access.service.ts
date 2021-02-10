import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, forkJoin, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class DataAccessService {
  private static BASE_URL = 'https://gongfetest.firebaseio.com';
  private usersSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  public readonly allUsers = this.usersSubject.asObservable();

  private serverDataObservable: Observable<User[]>;

  constructor(private http: HttpClient) {
    this.serverDataObservable = this.http.get<User[]>(`${DataAccessService.BASE_URL}/users/.json`);
    this.serverDataObservable
      .subscribe((users: User[]) => this.usersSubject.next(users));
  }

  public getUserIndexById(id: number) {
    return this.usersSubject.value.map(user => user && user.id).indexOf(id);
  }

  public getUserId(secret: string): Observable<any> {
    return forkJoin(this.serverDataObservable, this.http.get(`${DataAccessService.BASE_URL}/secrets/${secret}.json`)).pipe(
      map(res => res[1])
    );
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

  findUserById(userId: number) {
    return this.usersSubject.value.filter(user => !!user).find(user => user.id === userId);
  }
}
