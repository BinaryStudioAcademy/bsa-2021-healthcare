import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { notification as notificationService, userApi } from 'services';
import { ReducerName, DataStatus } from 'common/enums';
import { AppThunk } from 'common/types';
import { IAppointment, ICreateAppointment, IDoctorDetails } from 'common/interfaces';
import { HttpError } from 'exceptions';
import { appointment } from 'services';

interface IState {
  doctorDetails: IDoctorDetails | null;
  appointments: IAppointment[];
  dataStatus: DataStatus;
}

const initialState: IState = {
  doctorDetails: null,
  appointments: [],
  dataStatus: DataStatus.PENDING,
};

const { reducer, actions } = createSlice({
  name: ReducerName.DOCTOR_DETAILS,
  initialState,
  reducers: {
    setDoctorDetail: (state, action: PayloadAction<IDoctorDetails>) => {
      state.doctorDetails = action.payload;
      state.dataStatus = DataStatus.SUCCESS;
    },
  },
});

const getDoctorDetailsAsync = (id: string): AppThunk => async (dispatch) => {
  try {
    const doctorDetails = await userApi.getDoctorDetails(id);
    dispatch(actions.setDoctorDetail(doctorDetails));
  } catch (error) {
    if (error instanceof HttpError) {
      notificationService.error(`Error ${error.status}`, error.messages);
    }
    throw error;
  }
};

const createAppointmentAsync = (payload:ICreateAppointment): AppThunk => async (_, getState) => {
  try {
    const { auth } = getState();
    payload.userId = auth.user?.id;
    const data = await appointment.createAppointment(payload);
    // eslint-disable-next-line no-console
    console.log(data);
    notificationService.success('Appointment was created', []);
  } catch (error) {
    if (error instanceof HttpError) {
      notificationService.error(`Error ${error.status}`, error.messages);
    }
    throw error;
  }
};

const DoctorDetailsActionCreator = {
  ...actions,
  getDoctorDetailsAsync,
  createAppointmentAsync,
};

export { DoctorDetailsActionCreator, reducer };
