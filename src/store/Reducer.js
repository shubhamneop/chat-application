import * as actionType from "./ActionType";

const initialState = {
  isLogin: false,
  user: null,
  messages: [],
  users: [],
  loading: false,
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
    case actionType.REGISTER: {
      state = { ...state };
      state.isLogin = true;
      state.user = action.payload;
      return state;
    }
    case actionType.SENDMESSAGE: {
      state = { ...state };
      state["messages"] = [...state.messages, action.payload];
      return state;
    }
    case actionType.GETMESSAGE: {
      state = { ...state };
      let data = [...state.messages, action.payload];
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
      state["messages"] = result;
      //   state["messages"] = Array.from(
      //     ...new Set(data.map((item) => item.id)).map((id) => {
      //       return {
      //         id: id,
      //         room_id: data.find((s) => s.id === id).room_id,
      //         data: data.find((s) => s.id === id).data,
      //       };
      //     }),
      //   );
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
