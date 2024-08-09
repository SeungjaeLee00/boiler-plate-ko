import { LOGIN_USER } from "../_actions/types";

// 이전 state (비어있음), action => 다음 state 리턴
export default function (state = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      // ...: spreadOpreraion 위에 파라미터(state = {}부분) 그대로 가져옴
      return { ...state, loginSuccess: action.payload };

    default:
      return state;
  }
}
