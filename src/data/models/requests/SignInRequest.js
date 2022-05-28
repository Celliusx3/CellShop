export default class SignInRequest {
  constructor(email, password) {
    this.email = email;
    this.password = password;
    this.returnSecureToken = true;
  }
}