class LoginStore {

  constructor(token, name){
    this.state = {
      token,
      name,
    }
  };

  setLogin(token, name){
    this.token = token;
    this.name = name;
    localStorage.setItem('token', token);
    localStorage.setItem('name', name);
  }

  clearLogin(){
    localStorage.clear();
  }
}

const sessionStore = new LoginStore(localStorage.token, localStorage.name);

export default sessionStore;
