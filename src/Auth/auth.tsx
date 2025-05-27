const Auth = {
  isAuthenticated: false,
  authenticate() {
      if (localStorage.getItem("authKey")) {
          this.isAuthenticated = true;
      }
  },
  signout() {
      this.isAuthenticated = false;
      localStorage.removeItem("authKey");
  },
  getAuth() {
      return this.isAuthenticated;
  },
  checkAuth() {
      this.authenticate();
      return this.isAuthenticated;
  }
};

export default Auth;