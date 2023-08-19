import axios from 'axios';

export class axiosRecipes {
  BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/';

  page = 1;
  limit = 6;
  //ingredients = Beef;
  //category = null;
  area = 'Ukrainian';
  time = 5;

  getFilteredData(filters) {
    return axios
      .get(`${this.BASE_URL}${filters}`, {
        params: {
          category: this.category,
          page: this.page,
          limit: this.limit,
          time: this.time,
          area: this.area,
          ingredient: this.ingredients,
        },
      })
      .then(response => {
        //console.log(`${filters}`, response.data);
        return response.data;
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
}
