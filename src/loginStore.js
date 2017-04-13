class LoginStore {

  constructor(token, login, name) {
    this.state = {
      token,
      login,
      name,
    };
  }

  setLogin(token, login, name) {
    this.token = token;
    this.login = login;
    this.name = name;
    localStorage.setItem('token', token);
    localStorage.setItem('login', login);
    localStorage.setItem('name', name);
  }

  clearLogin() {
    localStorage.clear();
  }
}

const sessionStore = new LoginStore(localStorage.token, localStorage.login, localStorage.name);

export default sessionStore;
