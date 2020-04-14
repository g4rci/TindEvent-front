import axios from "axios";

class Auth {
  constructor() {
    this.auth = axios.create({
      baseURL: process.env.REACT_APP_API_URI,
      withCredentials: true,
    });
  }

  signup({ picture, username, email, password, location, birthDate, bio }) {
    return this.auth
      .post("/auth/signup", { picture, username, email, password, location, birthDate, bio })
      .then(({ data }) => data);
  }

  login({ username, password }) {
    return this.auth
      .post("/auth/login", { username, password })
      .then(({ data }) => data);
  }

  logout() {
    return this.auth.post("/auth/logout", {}).then(({ data }) => data);
  }

  me() {
    return this.auth.get("/auth/me")
    .then(({ data }) => {
      console.log(data)
      return data
    });
  }
}

const axiosRequestFunctions = new Auth();

export default axiosRequestFunctions;
