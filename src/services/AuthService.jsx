import HttpService from './HttpService';

class AuthService extends HttpService {
  register = async (newUser) => {
    const { data } = await this.client.post('/register', newUser);
    return data;
  };

  login = async (credentials) => {
    const { data } = await this.client.post('/login', credentials);
    return data;
  };

  logout = async () => {
    const { data } = await this.client.post('/logout');
    console.log('logout from API');
    return data;
  };

  getActiveUser = async () => {
    const { data } = await this.client.post('/me');
    return data;
  };
}

export default new AuthService();
