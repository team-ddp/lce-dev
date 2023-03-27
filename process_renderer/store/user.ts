import { userInfo_type, userInfo_type_class } from "../types/user";
import { createSlice } from "@reduxjs/toolkit";

// 액션 타입 생성
// const SET_USER = "user/SET_USER";
// const GET_RECENT_MATCHLIST = "user/GET_RECENT_MATCHLIST";

// 액션 생성 함수
// export const setUser = createAction(SET_USER, (userInfo) => userInfo);

// type userInfoAction = ReturnType<typeof setUser>;

// 리듀서

// export default createReducer(initialState, {
//   [setUser]: (state, {payload: userInfo}) =>{
//     return
//   }
// })

// export default function user(state: userInfo_type, action: userInfoAction) {
//   switch (action.type) {
//     case SET_USER:
//       return action.payload;
//   }
// }

const initialState = { toggle: false, userInfo: {}, rank: {} };

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
  },
});

export const { setDefaultInfo, setRankInfo, setStatus } = userSlice.actions;
export default userSlice.reducer;
