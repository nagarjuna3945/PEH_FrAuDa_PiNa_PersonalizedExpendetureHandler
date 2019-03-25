import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './core/auth.service';
import { MessagingService } from './service/messaging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'PersonalExpenseManager';
  message;

  constructor(
    public authService: AuthService,
    private router: Router,
    private msgService: MessagingService
  ) {}

  ngOnInit() {
    this.msgService.getPermission();
    this.msgService.receiveMessage();
    this.message = this.msgService.currentMessage;
  }

  public logout() {
    this.authService.logout()
    .then(res => {
      this.router.navigate(['/login']);
    });
  }
}
