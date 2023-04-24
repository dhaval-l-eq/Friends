import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import { USERDATA_URL } from "../helpers/config";
import { database } from "./firebase";
import { set, ref } from "firebase/database";

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    usersPath: null,
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
      window.localStorage.setItem("authUserEmail", authEmail);
    },

    resetChange(state) {
      state.changedUsers = false;
    },

    resetAuthUser(state) {
      state.authUser = null;
    },

    addUsersPath(state, { payload }) {
      state.usersPath = payload;
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
