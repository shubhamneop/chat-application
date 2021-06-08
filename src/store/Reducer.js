import * as actionType from "./ActionType";

const initialState = {
  isLogin: false,
  user: null,
  messages: [],
  users: [],
  loading: false,
};

const uniqueData = (data) => {
  const result = [];
  const map = new Map();
  for (const item of data) {
    if (!map.has(item.id)) {
      map.set(item.id, true); // set any value to Map
      result.push({
        id: item.id,
        room_id: item.room_id,
        data: item.data,
      });
    }
  }
  return result;
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.INIT: {
      state = { ...state };
      state.loading = true;
      return state;
    }
    case actionType.LOGIN: {
      state = { ...state };
      state["isLogin"] = true;
      state["user"] = action.payload;
      state["loading"] = false;
      return state;
    }
    case actionType.LOGIN_FAIL: {
      state = { ...state };
      state["isLogin"] = false;
      state["loading"] = false;
      return state;
    }
    case actionType.REGISTER: {
      state = { ...state };
      state.isLogin = true;
      state.user = action.payload;
      return state;
    }
    case actionType.REGISTER_FAIL: {
      state = { ...state };
      state["isLogin"] = false;
      state["loading"] = false;
      return state;
    }
    case actionType.SENDMESSAGE: {
      state = { ...state };
      let data = [...state.messages, action.payload];

      state["messages"] = uniqueData(data);
      return state;
    }
    case actionType.GETMESSAGE: {
      state = { ...state };
      let data = [...state.messages, action.payload];

      state["messages"] = uniqueData(data);
      return state;
    }
    case actionType.USERS: {
      state = { ...state };
      state["users"] = action.payload;
      return state;
    }
    case actionType.LOGOUT: {
      state = { ...state };
      state["user"] = null;
      state["isLogin"] = false;
      state["loading"] = false;
      state["messages"] = [];
      state["users"] = [];
      return state;
    }
    default:
      return state;
  }
};

export default Reducer;
