import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import { USERDATA_URL } from "../helpers/config";
import { database } from "./firebase";
import { set, ref } from "firebase/database";

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    authUser: null,
    changedUsers: false,
  },
  reducers: {
    addUser(state, { payload }) {
      const newUser = payload;
      state.users.push({
        id: uuid(),
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        userName: newUser.firstName + " " + newUser.lastName,
        email: newUser.email,
        gender: newUser.gender,
        birthDate: newUser.birthDate,
        phoneNumber: newUser.phoneNumber || null,
        friends: [],
        friendRequests: [],
        profilePicture: newUser.profilePictureURL || null,
      });

      state.changedUsers = true;
    },

    replaceUsers(state, { payload }) {
      state.users = payload || [];
    },

    setAuthUser(state, { payload }) {
      const authEmail = payload;

      state.authUser = state.users.find((user) => user.email === authEmail);
    },

    resetChange(state) {
      state.changedUsers = false;
    },

    resetAuthUser(state) {
      state.authUser = null;
    },

    sendFriendRequest(state, { payload }) {
      const friendIndex = state.users.findIndex(
        (user) => payload.friendId === user.id
      );

      if (!state.users[friendIndex].friendRequests)
        state.users[friendIndex].friendRequests = [];

      state.users[friendIndex].friendRequests.push({
        userId: payload.userId,
        userName: payload.userName,
        userDp: payload.userDp,
      });
      state.changedUsers = true;
    },

    undoFriendRequest(state, { payload }) {
      const friendIndex = state.users.findIndex(
        (user) => payload.friendId === user.id
      );

      const friendRequests = state.users[friendIndex].friendRequests;

      const requestIndex = friendRequests.findIndex(
        (request) => request.userId === payload.userId
      );
      friendRequests.splice(requestIndex, 1);
      state.changedUsers = true;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice;

export function sendUserData(userData) {
  return async function () {
    try {
      set(ref(database, "users"), userData);
    } catch (error) {
      console.log(error);
    }
  };
}

export function fetchUserData() {
  return async function (dispatch) {
    const res = await fetch(USERDATA_URL);

    if (!res.ok) throw new Error("Failed to send data!");

    const data = await res.json();

    dispatch(userActions.replaceUsers(data));
  };
}
