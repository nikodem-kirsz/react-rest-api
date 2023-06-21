import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import api from '../api/api';
import { User } from '../data/model'
interface UsersState {
  loading: boolean;
  users: User[];
  error: string | null;
}

export const initialState: UsersState = {
  loading: false,
  users: [],
  error: null
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    getUsersStart(state) {
      state.loading = true;
      state.error = null;
    },
    getUsersSuccess(state, action: PayloadAction<User[]>) {
      state.loading = false;
      state.users = action.payload;
    },
    getUsersFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    createUserStart(state) {
      state.loading = true;
      state.error = null;
    },
    createUserSuccess(state, action: PayloadAction<User>) {
      state.loading = false;
      state.users.push(action.payload);
    },
    createUserFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const {
  getUsersStart,
  getUsersSuccess,
  getUsersFailure,
  createUserStart,
  createUserSuccess,
  createUserFailure
} = usersSlice.actions;

export default usersSlice.reducer;

export const fetchUsers = (): any => async (dispatch: any) => {
  try {
    dispatch(getUsersStart());
    const users = await api.fetchUsers()
    dispatch(getUsersSuccess(users));
  } catch (error: any) {
    dispatch(getUsersFailure(error.message));
  }
};

export const createUser = (user: User): any => async (dispatch: any) => {
  try {
    dispatch(createUserStart());
    const users = await api.createUser(user)
    dispatch(createUserSuccess(users));
  } catch (error: any) {
    dispatch(createUserFailure(error.message));
  }
};