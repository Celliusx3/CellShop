export default class RefreshUserRequest {
  constructor(refreshToken) {
    this.grant_type = "refresh_token";
    this.refresh_token = refreshToken;
  }
}