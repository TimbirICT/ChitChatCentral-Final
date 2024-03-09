import { jwtDecode } from "jwt-decode";

class AuthService {
  getProfile() {
    const token = this.getToken();
  
    if (!token) {
      throw new Error('Token not available.');
    }
  
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error('Error decoding token:', error);
      throw new Error('Error decoding token.');
    }
  }

  isTokenExpired(token) {
    // Decode the token to get its expiration time that was set by the server
    const decoded = jwtDecode(token);
    // If the expiration time is less than the current time (in seconds), the token is expired and we return `true`
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem('id_token');
      return true;
    }
    // If token hasn't passed its expiration time, return `false`
    return false;
  }

  getToken() {
    return localStorage.getItem('id_token');
  }

  login(idToken) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  logout() {
    localStorage.removeItem('id_token');
    window.location.reload();
  }
}

export default new AuthService();
