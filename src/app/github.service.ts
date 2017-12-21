import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { GithubUser } from './github-user';
import'rxjs/add/operator/map';


@Injectable()
export class GithubService {

  constructor(private http: Http) { }

  retrieveGitHubUser(username: string): Observable <GithubUser>{
    return this.http.get(`https://api.github.com/users/${ username }`).map(response => response.json());
  }
}
