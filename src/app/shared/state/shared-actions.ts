import { createAction } from "@ngrx/store";
import { StatusDetails } from "@shared/models/status-details";
import { UserDetails } from "@shared/models/user-details";

export const getStatusData = createAction(
  '[Dashboard] Load Status Details',
  //() => ({ payload })
);

export const getStatusSuccess = createAction(
  '[Dashboard] Load Status Details Success',
  (payload: StatusDetails) => ({ payload })
);

export const getStatusFailure = createAction(
  '[Dashboard] Load Status Failure',
  (payload: { error: string }) => ({ payload })
);

export const getUserDetails = createAction(
    '[Dashboard] Load User Details',
  );
  
  export const getUserSuccess = createAction(
    '[Dashboard] Load User Details Success',
    (payload: UserDetails) => ({ payload })
  );
  
  export const getUserFailure = createAction(
    '[Dashboard] Load User Failure',
    (payload: { error: string }) => ({ payload })
  );