import axios from 'axios';

export class axiosCard {
  BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/recipes/';

  page = 1;
  ingredients = null;
  category = null;
  area = null;
  time = 45;
  tags = null;

  async getCardData() {
    try {
      const response = await axios.get(`${this.BASE_URL}`, {
        params: {
          category: this.category,
          page: this.page,
          time: this.time,
          area: this.area,
          ingredient: this.ingredients,
          tags: this.tags,
        },
      });
      //console.log('response.data', response.data);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
}
