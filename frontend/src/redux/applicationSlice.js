import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";

export const fetchApplicants = createAsyncThunk(
  "application/fetchApplicants",
  async (jobId = null, { rejectWithValue }) => {
    try {
      const url = jobId 
        ? `${APPLICATION_API_END_POINT}/job/${jobId}`
        : APPLICATION_API_END_POINT
      const response = await axios.get(url, { withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const applicationSlice = createSlice({
    name:'application',
    initialState:{
        applicants:[],
        loading:false,
        error:null,
    },
    reducers:{
        setAllApplicants:(state,action) => {
            state.applicants = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchApplicants.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchApplicants.fulfilled, (state, action) => {
                state.loading = false;
                state.applicants = action.payload;
            })
            .addCase(fetchApplicants.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const {setAllApplicants} = applicationSlice.actions;
export default applicationSlice.reducer;
