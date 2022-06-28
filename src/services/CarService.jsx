import axios from 'axios';

class CarService {
  constructor() {
    this.HTTPClient = axios.create({
      baseURL: 'http://localhost:3000',
    });
  }

  async getAll() {
    try {
      const { data } = await this.HTTPClient.get('api/cars');
      return data;
    } catch (error) {
      return error;
    }
  }

  async add(data) {
    try {
      const response = await this.HTTPClient.post('api/cars', data);
      return response;
    } catch (error) {
      return error;
    }
  }
}
export default new CarService();
