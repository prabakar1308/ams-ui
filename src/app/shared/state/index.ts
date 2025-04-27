import { StatusState } from '@shared/models/status-state';
import * as fromRoot from '../../state/app-state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from '@shared/models/user-state';

export interface AppState extends fromRoot.AppState {
  status: StatusState;
  user: UserState;
}

const getStatusFeatureState =
  createFeatureSelector<StatusState>('status');

export const getStatusData = createSelector(
    getStatusFeatureState,
  (state: StatusState) => ({
    id: state.id,
    value: state.value,
    createdAt: state.createdAt,
    updatedAt: state.updatedAt,
    description: state.description,
    createdBy: state.createdBy,
    updatedBy: state.updatedBy,
  })
);

export const getMetaInfo = createSelector(
    getStatusFeatureState,
  (state) => state.meta
);

const getUserFeatureState =
  createFeatureSelector<UserState>('userDerails');

export const getUserData = createSelector(
  getUserFeatureState,
  (state: UserState) => ({
    id: state.id,
    userId: state.userId,
    firstName: state.firstName,
    lastName: state.lastName,
    password: state.password,
    email: state.email,
    mobileNumber: state.mobileNumber,
    role: state.role,
    designation: state.designation,
    departmetUnit: state.departmetUnit,
    dateOfBirth: state.dateOfBirth,
    address: state.address,
    dateOfJoining: state.dateOfJoining,
    remarks: state.remarks,
    createdBy: state.createdBy,
    createdAt: state.createdAt,
    updatedBy: state.updatedBy,
    updatedAt: state.updatedAt,
  })
);