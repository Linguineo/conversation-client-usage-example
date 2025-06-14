import { Component } from '@angular/core';
import { OauthService } from './services/oauth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false
})
export class AppComponent {
  accessToken?: string;

  constructor(
    private oauthService: OauthService, 
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(async (params) => {
      if (params['code']) {
        window.history.replaceState({}, document.title, window.location.pathname);
        await this.oauthService.handleAuthCallback(params['code']);
      }
    });

    this.oauthService.getAccessToken().subscribe(token => {
      this.accessToken = token;
    });
  }

  login() {
    this.oauthService.login();
  }
}
