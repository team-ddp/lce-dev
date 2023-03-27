import { combineReducers } from "redux";

// 다른 모듈 임포트 해주기
import user from "./user";

// 루트 리듀서로 다른 모듈들 하나로 합침
const rootReducer = combineReducers({
  user,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
