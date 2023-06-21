import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  initialState,
  usersSlice,
  getUsersStart,
  getUsersSuccess,
  getUsersFailure,
  createUserStart,
  createUserSuccess,
  createUserFailure,
  fetchUsers,
  createUser
} from '../redux/usersSlice';
import api from '../api/api';

const mockStore = configureMockStore([thunk]);

describe('usersSlice', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({ users: initialState });
  });

  afterEach(() => {
    store.clearActions();
  });

  const users = [
    { userid: '1', namefirst: 'John', namelast: 'Doe', datecreated: '32131', datemodified: '321321', email: 'sdadsada' },
    { userid: '2', namefirst: 'John', namelast: 'Doe', datecreated: '32131', datemodified: '321321', email: 'sdadsada' },
    { userid: '3', namefirst: 'John', namelast: 'Doe', datecreated: '32131', datemodified: '321321', email: 'sdadsada' }
    ];

    const user = { userid: '4', namefirst: 'John', namelast: 'Doe', datecreated: '32131', datemodified: '321321', email: 'sdadsada' }



  describe('reducer', () => {
    it('should handle getUsersStart', () => {
      const nextState = usersSlice.reducer(initialState, getUsersStart());
      expect(nextState.loading).toBe(true);
      expect(nextState.error).toBeNull();
    });

    it('should handle getUsersSuccess', () => {
      const nextState = usersSlice.reducer(initialState, getUsersSuccess(users));
      expect(nextState.loading).toBe(false);
      expect(nextState.users).toEqual(users);
    });

    it('should handle getUsersFailure', () => {
      const error = 'Error fetching users';
      const nextState = usersSlice.reducer(initialState, getUsersFailure(error));
      expect(nextState.loading).toBe(false);
      expect(nextState.error).toBe(error);
    });

    it('should handle createUserStart', () => {
      const nextState = usersSlice.reducer(initialState, createUserStart());
      expect(nextState.loading).toBe(true);
      expect(nextState.error).toBeNull();
    });

    it('should handle createUserSuccess', () => {
      const nextState = usersSlice.reducer(initialState, createUserSuccess(user));
      expect(nextState.loading).toBe(false);
      expect(nextState.users).toContainEqual(user);
    });

    it('should handle createUserFailure', () => {
      const error = 'Error creating user';
      const nextState = usersSlice.reducer(initialState, createUserFailure(error));
      expect(nextState.loading).toBe(false);
      expect(nextState.error).toBe(error);
    });
  });

  describe('actions', () => {
    it('should create an action to fetch users successfully', async () => {
      const expectedActions = [
        getUsersStart(),
        getUsersSuccess(users)
      ];
      jest.spyOn(api, 'fetchUsers').mockResolvedValue(users);

      await store.dispatch(fetchUsers());
      expect(store.getActions()).toEqual(expectedActions);
    });

    it('should create an action to handle an error while fetching users', async () => {
      const error = 'Error fetching users';
      const expectedActions = [
        getUsersStart(),
        getUsersFailure(error)
      ];
      jest.spyOn(api, 'fetchUsers').mockRejectedValue(new Error(error));

      await store.dispatch(fetchUsers());
      expect(store.getActions()).toEqual(expectedActions);
    });

    it('should create an action to create a user successfully', async () => {
      const expectedActions = [
        createUserStart(),
        createUserSuccess(user)
      ];
      jest.spyOn(api, 'createUser').mockResolvedValue(user);

      await store.dispatch(createUser(user));
      expect(store.getActions()).toEqual(expectedActions);
    });

    it('should create an action to handle an error while creating a user', async () => {
        const error = 'Error creating user';
        const expectedActions = [
          createUserStart(),
          createUserFailure(error)
        ];
        jest.spyOn(api, 'createUser').mockRejectedValue(new Error(error));
  
        await store.dispatch(createUser(user));
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
