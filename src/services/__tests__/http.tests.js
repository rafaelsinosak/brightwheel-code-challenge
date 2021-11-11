import axios from 'axios';
import Http from '../http';

const URL = process.env.REACT_APP_API_URL;


describe('http', () => {

  test(`getAllResults() - GET on ${URL}/search with URL params`, async () => {

    const call = jest.spyOn(axios, 'get');
    const response = await Http.getAllResults({
        _limit: 10,
        _page: 1
    });

    expect(response).toHaveLength(10);
    expect(call).toHaveBeenCalledTimes(1);
    expect(call).toHaveBeenCalledWith(`${URL}/search?_limit=10&_page=1`);
  });

  test(`starItem() - PATCH on ${URL}/search with URL params`, async () => {
    const id = 'animal.0';
    const call = jest.spyOn(axios, 'patch');
    const response = await Http.starItem(id, true);

    expect(call).toHaveBeenCalledTimes(1);
  });
});
