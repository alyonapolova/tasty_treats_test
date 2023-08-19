import axios from 'axios';

export class axiosRecipes {
  BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/';

  getFilteredData(filters) {
    return axios
      .get(`${this.BASE_URL}${filters}`)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
}
