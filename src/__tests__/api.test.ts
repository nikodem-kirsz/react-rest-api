import axios from 'axios';
import api from '../api/api';

jest.mock('axios');

describe('api', () => {
  describe('fetchProducts', () => {
    it('should fetch products successfully', async () => {
      const mockedResponse = {
        data: {
          items: [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }]
        }
      };
      (axios.get as jest.Mock).mockResolvedValue(mockedResponse);

      const products = await api.fetchProducts();

      expect(axios.get).toHaveBeenCalledWith(
        `http://localhost:8088/https://api-sandbox.mysitoo.com/v2/accounts/90316/sites/1/productgroups.json?num=30`,
        {
          auth: {
            username: '90316-125',
            password: 'pfX0Y7A2TYAlZ571IKEO7AKoXza6YlvsP8kKvAu3'
          },
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Basic OTAzMTYtMTI1OnBmWDBZN0EyVFlBbFo1NzFJS0VPN0FLb1h6YTZZbHZzUDhrS3ZBdTM='
          }
        }
      );
      expect(products).toEqual(mockedResponse.data.items);
    });

    it('should handle error while fetching products', async () => {
      const error = new Error('Error fetching products');
      (axios.get as jest.Mock).mockRejectedValue(error);

      const products = await api.fetchProducts();

      expect(axios.get).toHaveBeenCalled();
      expect(products).toBeUndefined();
    });
  });

  describe('fetchUsers', () => {
    it('should fetch users successfully', async () => {
      const mockedResponse = {
        data: {
          items: [{ id: 1, name: 'User 1' }, { id: 2, name: 'User 2' }]
        }
      };
      (axios.get as jest.Mock).mockResolvedValue(mockedResponse);

      const users = await api.fetchUsers();

      expect(axios.get).toHaveBeenCalledWith(
        `http://localhost:8088/https://api-sandbox.mysitoo.com/v2/accounts/90316/sites/1/users.json?num=30`,
        {
          auth: {
            username: '90316-125',
            password: 'pfX0Y7A2TYAlZ571IKEO7AKoXza6YlvsP8kKvAu3'
          },
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Basic OTAzMTYtMTI1OnBmWDBZN0EyVFlBbFo1NzFJS0VPN0FLb1h6YTZZbHZzUDhrS3ZBdTM='
          }
        }
      );
      expect(users).toEqual(mockedResponse.data.items);
    });

    it('should handle error while fetching users', async () => {
      const error = new Error('Error fetching users');
      (axios.get as jest.Mock).mockRejectedValue(error);

      const users = await api.fetchUsers();

      expect(axios.get).toHaveBeenCalled();
      expect(users).toBeUndefined();
    });
  });

  describe('createUser', () => {
    it('should create a user successfully', async () => {
      const user = { userid: '4', namefirst: 'John Doe', datecreated: '32131', datemodified: '321321', email: 'sdadsada' }

      await api.createUser(user);

      expect(axios.post).toHaveBeenCalledWith(
        `http://localhost:8088/https://api-sandbox.mysitoo.com/v2/accounts/90316/sites/1/users.json`,
        [user],
        {
          auth: {
            username: '90316-125',
            password: 'pfX0Y7A2TYAlZ571IKEO7AKoXza6YlvsP8kKvAu3'
          },
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Basic OTAzMTYtMTI1OnBmWDBZN0EyVFlBbFo1NzFJS0VPN0FLb1h6YTZZbHZzUDhrS3ZBdTM='
          }
        }
      );
    });

    it('should handle error while creating a user', async () => {
      const user = { id: 1, name: 'John Doe' };
      const error = new Error('Error creating user');
      (axios.get as jest.Mock).mockRejectedValue(error);

      const createdUser = await api.createUser(user);

      expect(axios.post).toHaveBeenCalled();
      expect(createdUser).toBeUndefined();
    });
  });
});



