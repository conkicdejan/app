import HttpService from './HttpService';


class CarService extends HttpService {

  getAll = async(page = 1, perPage = 3, search = '') => {
      const { data } = await this.client.get(
        `cars?page=${page}&per_page=${perPage}&brand=${search}`
        );
      return data;
  }

  getById = async(id) => {
      const { data } = await this.client.get(`cars/${id}`);
      return data;
  }

  add = async (data) => {
      const response = await this.client.post('cars', data);
      return response;
  }

  update = async (id, data) => {
      const response = await this.client.put(`cars/${id}`, data);
      return response;
  }

  delete = async (id) => {
      const response = await this.client.delete(`cars/${id}`);
      return response;
  }
}
export default new CarService();
