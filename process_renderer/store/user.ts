import { userInfo_type, userInfo_type_class } from "../types/user";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toggle: false,
  userInfo: {},
  rank: {},
  recentMatchList: {},
  getMatchInfo: [],
  getMatchDetail: [],
};

const userSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setStatus: (state, action) => {
      state.toggle = action.payload;
    },
    setDefaultInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    setRankInfo: (state, action) => {
      state.rank = action.payload;
    },
    getRecentMatchList: (state, action) => {
      state.recentMatchList = action.payload;
    },
    getMatchInfo: (state, action) => {
      state.getMatchInfo = action.payload;
    },
    getMatchDetail: (state, action) => {
      state.getMatchDetail = action.payload;
    },
  },
});

export const {
  setDefaultInfo,
  setRankInfo,
  setStatus,
  getRecentMatchList,
  getMatchInfo,
  getMatchDetail,
} = userSlice.actions;
export default userSlice.reducer;
