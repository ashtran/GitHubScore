import { Component } from '@angular/core';
import { GithubService } from './github.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  userExists: boolean = null;
  score: number = 0;
  username: string = null;
  color: string = "black";
  message: string = null;

  constructor(private githubService: GithubService) {}

  calculateScore(form: NgForm){
    this.username = form.value.username;
    console.log(this.username);
    this.githubService.retrieveGitHubUser(this.username)
    .subscribe(
      user => {
        this.userExists = true;
        this.score = user.public_repos + user.followers;
        if(this.score < 20){
          this.color = "red";
          this.message = "Needs Work!";
        }
        else if (this.score >= 20 && this.score <50){
          this.color = "orange";
          this.message = "A decent start!";
        }
        else if (this.score >=50 && this.score < 100){
          this.message = "Doing Good!";
        }
        else if (this.score >= 100 && this.score < 200){
          this.color = "green";
          this.message ="Great Job!"
        }
        else if (this.score >= 200){
          this.color ="blue";
          this.message="Github Elite!"
        }
        form.reset();
      },
      (response: Response) => this.userExists = false
    );
  }
}
