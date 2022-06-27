import axios from 'axios';

class CarService {
  constructor() {
    this.HTTPClient = axios.create({
      baseURL: 'http://localhost:3000',
    });
  }

  async getAll() {
    try {
      const { data } = this.HTTPClient.get('api/cars');
      return data;
    } catch (error) {
      return error;
    }
  }
}

export default new CarService();
