import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { roleListing } from '../../services/action/role';

interface Role {
    guard_name: string;
    id: string;
    landing_page: string;
    name: string;
}

interface RoleState {
    role: Role[];
    loading: boolean;
    error: string | null;
    currentPage: number;
}

const initialState: RoleState = {
    role: [],
    loading: false,
    error: null,
    currentPage: 1,
};


export const fetchRoles = createAsyncThunk(
    'user/fetchRoles',
    async (
        { page = 1, per_page = 10, search = '', filter = '', sort = '', order_by = 'asc' }: any,
        { rejectWithValue }
    ) => {
        try {
            const response = await roleListing({ page, per_page, search, filter, sort, order_by });
            return response.data; 
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Error fetching roles');
        }
    }
);

export const roleSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRoles.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRoles.fulfilled, (state, action) => {
                state.loading = false;
                state.role = action.payload || [];
            })
            .addCase(fetchRoles.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { setCurrentPage } = roleSlice.actions;
export default roleSlice.reducer;
