export default class SignUpResponse {
  constructor(authToken, refreshToken, expiresIn, userId) {
    this.authToken = authToken;
    this.refreshToken = refreshToken;
    this.expiresIn = expiresIn;
    this.userId = userId;
  }
}