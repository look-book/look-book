import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
  LOVE,
  HAPPY,
  SCARED,
  SAD,
  ANGRY,
} from "../constants/actionTypes";

// eslint-disable-next-line import/no-anonymous-default-export
export default function (uploads = [], action) {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case LOVE:
      return uploads.map((upload) =>
        upload._id === action.payload._id ? action.payload : upload
      );
    case HAPPY:
      return uploads.map((upload) =>
        upload._id === action.payload._id ? action.payload : upload
      );
    case SAD:
      return uploads.map((upload) =>
        upload._id === action.payload._id ? action.payload : upload
      );
    case SCARED:
      return uploads.map((upload) =>
        upload._id === action.payload._id ? action.payload : upload
      );
    case ANGRY:
      return uploads.map((upload) =>
        upload._id === action.payload._id ? action.payload : upload
      );
    case CREATE:
      return [...uploads, action.payload];
      
    case UPDATE:
      return uploads.map((upload) =>
        upload._id === action.payload._id ? action.payload : upload
      );
    case DELETE:
      return uploads.filter((upload) => upload._id !== action.payload);
    default:
      return uploads;
  }
}
