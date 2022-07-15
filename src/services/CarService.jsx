import HttpService from './HttpService';

class CarService extends HttpService {
  getAll = async ({
    page = 1,
    per_page = 3,
    brand = '',
    model = '',
    sort = '',
  }) => {
    const { 0: sortBy, 1: sort_type } = sort.split('-');
    const { data } = await this.client.get(
      `cars?page=${page}&per_page=${per_page}&brand=${brand}&model=${model}&sort=${sortBy}&sort_type=${sort_type}`
    );
    console.log('returned data from backend', data);
    return data;
  };

  getById = async (id) => {
    const { data } = await this.client.get(`cars/${id}`);
    return data;
  };

  add = async (data) => {
    const response = await this.client.post('cars', data);
    return response;
  };

  update = async (id, data) => {
    const response = await this.client.put(`cars/${id}`, data);
    return response;
  };

  delete = async (id) => {
    const response = await this.client.delete(`cars/${id}`);
    return response;
  };
}
export default new CarService();
