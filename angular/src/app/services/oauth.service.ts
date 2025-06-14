import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class OauthService {
  private accessToken$ = new BehaviorSubject<string | undefined>(undefined);
  private refreshToken?: string;
  private refreshTokenTimeout: any;

  constructor(private http: HttpClient) {}

  getAccessToken() {
    return this.accessToken$.asObservable();
  }

  login() {
    const redirectUri = window.location.href;
    const clientId = environment.oauth.clientId;
    const authUrl = `${environment.oauth.authUrl}?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=openid`;
    window.location.href = authUrl;
  }

  async handleAuthCallback(code: string) {
    const body = new HttpParams()
      .set('grant_type', 'authorization_code')
      .set('code', code)
      .set('redirect_uri', window.location.href)
      .set('client_id', environment.oauth.clientId);

    const response = await firstValueFrom(this.http
      .post<any>(environment.oauth.tokenUrl, body.toString(), {
        headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' }),
      }));

    this.processTokenResponse(response);
  }

  private processTokenResponse(response: any) {
    this.accessToken$.next(response.access_token);
    this.refreshToken = response.refresh_token;
    this.setupRefresh(response.expires_in);
  }

  private setupRefresh(expiresIn: number) {
    if (this.refreshTokenTimeout) {
      clearTimeout(this.refreshTokenTimeout);
    }

    setTimeout(async () => {
      const body = new HttpParams()
        .set('grant_type', 'refresh_token')
        .set('refresh_token', this.refreshToken!)
        .set('client_id', environment.oauth.clientId);
      const response = await firstValueFrom(this.http.post<any>(environment.oauth.tokenUrl, body.toString(), {
        headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' }),
      }));
      this.processTokenResponse(response);
    }, (expiresIn - 30) * 1000);
  }
}
