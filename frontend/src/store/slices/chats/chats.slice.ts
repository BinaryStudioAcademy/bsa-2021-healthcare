import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { notification as notificationService, chatApi } from 'services';
import { ReducerName } from 'common/enums';
import { AppThunk } from 'common/types';
import { IMember, IMessage, IMessagePayload } from 'common/interfaces';
import { HttpError } from 'exceptions';

interface IChats {
  messages: IMessage[];
  members: IMember[];
  selectedMember?: IMember;
}

const initialState: IChats = {
  messages: [],
  members: [],
  selectedMember: undefined,
};

const { reducer, actions } = createSlice({
  name: ReducerName.CHATS,
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<IMessage>) => {
      state.messages.push(action.payload);
    },

    setMessages: (state, action: PayloadAction<IMessage[]>) => {
      state.messages = action.payload;
    },

    addMember: (state, action: PayloadAction<IMember>) => {
      !state.members.some(member => member.id === action.payload.id) && state.members.unshift(action.payload);
    },

    setMembers: (state, action: PayloadAction<IMember[]>) => {
      state.members = action.payload;
    },

    selectMember: (state, action: PayloadAction<string>) => {
      state.selectedMember = state.members.find(
        (member: IMember) => member.id === action.payload,
      );
    },

  },
});

const sendMessage = (formData: IMessagePayload): AppThunk => async dispatch => {
  try {
    const response = await chatApi.sendMessage(formData);
    dispatch(actions.addMessage(response));

  } catch (error) {
    if (error instanceof HttpError) {
      notificationService.error(`Error ${error.status}`, error.messages);
    }
    throw error;
  }
};

const addMember = (member: IMember): AppThunk => dispatch => {
  dispatch(actions.addMember(member));
  dispatch(selectMember(member.id));
};

const selectMember = (id: string): AppThunk => async dispatch => {
  try {
    dispatch(actions.selectMember(id));

    const response = await chatApi.loadMemberMessages(id);
    dispatch(actions.setMessages(response));

  } catch (error) {
    if (error instanceof HttpError) {
      notificationService.error(`Error ${error.status}`, error.messages);
    }
    throw error;
  }
};

const loadFilteredMembersAsOptions = (name: string, callback: any): AppThunk => async () => {
  try {
    const response = await chatApi.getMembersByName(name);
    callback(response.map((member: IMember) => ({
      label: member.name,
      value: member,
    })));

  } catch (error) {
    if (error instanceof HttpError) {
      notificationService.error(`Error ${error.status}`, error.messages);
    }
    throw error;
  }
};

const loadMembersAsChats = (): AppThunk => async dispatch => {
  try {
    const response = await chatApi.loadMembersAsChats();
    dispatch(actions.setMembers(response));
    response?.length && dispatch(selectMember(response[0].id));

  } catch (error) {
    if (error instanceof HttpError) {
      notificationService.error(`Error ${error.status}`, error.messages);
    }
    throw error;
  }
};

const ChatsActionCreator = {
  ...actions,
  addMember,
  selectMember,
  sendMessage,
  loadFilteredMembersAsOptions,
  loadMembersAsChats,
};

export { ChatsActionCreator, reducer };
