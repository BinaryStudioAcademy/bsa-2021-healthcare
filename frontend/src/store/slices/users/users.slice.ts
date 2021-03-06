import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userApi } from 'services/services';
import { ReducerName } from 'common/enums';
import { AppThunk } from 'common/types';
import { UserState } from 'common/interfaces';

interface StateType {
  value: number,
  users: UserState[]
}

const initialState: StateType = {
  value: 0,
  users: [
    {
      id:"1",
      Applicant:"2",
      Birthday:"3",
      Phone:"4",
      Password:"5",
      Email:"6",
      ImagePath:"7",
      Geoposition:"8",
      Diagnosis:"9",
      CreatedAt:"10",
      UpdatedAt:"11"
    },
    {
      id:"1",
      Applicant:"2",
      Birthday:"3",
      Phone:"4",
      Password:"5",
      Email:"6",
      ImagePath:"7",
      Geoposition:"8",
      Diagnosis:"9",
      CreatedAt:"10",
      UpdatedAt:"11"
    },
  ]
};

const { reducer, actions } = createSlice({
  name: ReducerName.COUNTER,
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});


// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
const incrementAsync = (amount: number): AppThunk => (dispatch) => {
  setTimeout(() => {
    dispatch(actions.incrementByAmount(amount));
  }, 1000);
};

const getUsers = (amount: number): AppThunk => (dispatch) => {
  const data = userApi.getUsers(amount);
  console.log(data);
};

const CounterActionCreator = {
  ...actions,
  incrementAsync,
};

const UsersActionCreator = {
  ...actions,
  getUsers,
};

export { CounterActionCreator, UsersActionCreator, reducer };