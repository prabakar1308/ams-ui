import { createReducer, on } from "@ngrx/store";
import { UserState } from "@shared/models/user-state";
import * as SharedActions from './shared-actions';

export const initialState: UserState = {
    address: null,
    createdAt: null,
    createdBy: 0,
    dateOfBirth: null,
    dateOfJoining: null,
    departmetUnit: null,
    designation: null,
    email: null,
    firstName: null,
    id: 0,
    lastName: null,
    mobileNumber: null,
    password: null,
    remarks: null,
    role: null,
    updatedAt: null,
    updatedBy: 0,
    userId: null,
    meta: {
      isLoading: false,
      error: '',
    },
}


export const UserReducer = createReducer(
  initialState,
  // Handle the actions here
  on(SharedActions.getUserSuccess, (state, { payload }) => ({
    ...state,
    address: payload.address,
    createdAt: payload.createdAt,
    createdBy: payload.createdBy,
    dateOfBirth: payload.dateOfBirth,
    dateOfJoining: payload.dateOfJoining,
    departmetUnit: payload.departmetUnit,
    designation: payload.designation,
    email: payload.email,
    firstName: payload.firstName,
    id: payload.id,
    lastName: payload.lastName,
    mobileNumber: payload.mobileNumber,
    password: payload.password,
    remarks: payload.remarks,
    role: payload.role,
    updatedAt: payload.updatedAt,
    updatedBy: payload.updatedBy,
    userId: payload.userId,

    meta: {
      ...state.meta,
      isLoading: true,
    },
  })),
  on(SharedActions.getUserDetails, (state) => ({
    ...state,
    meta: {
      ...state.meta,
      isLoading: false,
    },
  }))
);