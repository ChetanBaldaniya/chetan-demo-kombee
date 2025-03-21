import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createUser, deleteMultipleUser, deleteUser, updateUser, userDataListing } from '../../services/action/user';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

interface UserState {
  users: User[];
  totalPages: number;
  perPage: number;
  totalRecord: number;
  currentPage: number;
  loading: boolean;
}

const initialState: UserState = {
  users: [],
  totalPages: 1,
  perPage: 10,
  totalRecord: 0,
  currentPage: 1,
  loading: false,
};

export const fetchUsers = createAsyncThunk(
  'user/fetchUsers',
  async ({ page = 1, per_page = 10, search = '', filter = '', sort = '', order_by = 'asc' }: any) => {
    const response = await userDataListing({ page, per_page, search, filter, sort, order_by });
    return response;
  }
);


export const deleteUserById = createAsyncThunk(
  'user/deleteUser',
  async (id: string, { dispatch }) => {
    await deleteUser(id);
    dispatch(fetchUsers({ page: 1, per_page: 10 }));
  }
);
export const deleteMultiple = createAsyncThunk(
  'user/deleteMultipleUser',
  async (data: { id: string[] }, { dispatch, rejectWithValue }) => {
    try {
      const response = await deleteMultipleUser(data); 
      await dispatch(fetchUsers({ page: 1, per_page: 10 })); 
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to delete users');
    }
  }
);

export const createNewUser = createAsyncThunk(
  'user/createUser',
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await createUser(formData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Error creating user');
    }
  }
);
export const updateUserData = createAsyncThunk(
  'user/updateUser',
  async ({ id, formData }: { id: string; formData: FormData }, { rejectWithValue }) => {
    try {
      const response = await updateUser(id, formData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Error updating user');
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data || [];
        state.totalPages = action?.payload?.last_page ;
        state.totalRecord = action?.payload?.total ;
        state.perPage = action?.payload?.per_page ;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setCurrentPage } = userSlice.actions;
export default userSlice.reducer;

