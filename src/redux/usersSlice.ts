import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import api from '../api/api';
import { CreateUserRequest, DeleteUserRequest, User } from '../data/model'
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
        },
        deleteUserStart(state) {
            state.loading = true;
            state.error = null;
        },
        deleteUserSuccess(state, action: PayloadAction<DeleteUserRequest[]>) {
            state.loading = false;

            const deletedUserIds = action.payload.map((user) => user.userid);
            state.users = state.users.filter((user) => !deletedUserIds.includes(user.userid));

        },
        deleteUserFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        editUserStart(state) {
            state.loading = true;
            state.error = null;
        },
        editUserSuccess(state, action: PayloadAction<User>) {
            state.loading = false;
            // Find the user in the state and update its data
            state.users = state.users.map((user) =>
                user.userid === action.payload.userid ? action.payload : user
            );
        },
        editUserFailure(state, action: PayloadAction<string>) {
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
    createUserFailure,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure,
    editUserStart,
    editUserSuccess,
    editUserFailure
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

export const createUser = (user: CreateUserRequest): any => async (dispatch: any) => {
    try {
        dispatch(createUserStart());
        const users = await api.createUser(user)
        dispatch(createUserSuccess(users));
    } catch (error: any) {
        dispatch(createUserFailure(error.message));
    }
};

export const deleteUser = (users: DeleteUserRequest[]): any => async (dispatch: any) => {
    try {
        dispatch(deleteUserStart());
        const deletedUsers = await api.deleteUser(users)
        dispatch(deleteUserSuccess(deletedUsers));
    } catch (error: any) {
        dispatch(deleteUserFailure(error.message));
    }
};

