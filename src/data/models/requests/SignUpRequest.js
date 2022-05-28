export default class SignUpRequest {
  constructor(email, password) {
    this.email = email;
    this.password = password;
    this.returnSecureToken = true;
  }
}