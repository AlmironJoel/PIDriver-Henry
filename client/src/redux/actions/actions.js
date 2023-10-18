import axios from "axios";
import {
  GET_ALL_DRIVERS,
  GET_DRIVER_BY_NAME,
  GET_TEAMS,
  SET_CURRENT_PAGE,
  FILTER_DRIVERS,
  ORDER_DRIVERS,
  GET_DRIVER_BY_ID,
  CLEAR_DETAIL,
} from "./action_types";

const URL_BASE = "http://localhost:3001/drivers";

export const getAllDrivers = () => {
  return async function (dispatch) {
    const response = await axios(`${URL_BASE}`);
    return dispatch({
      type: GET_ALL_DRIVERS,
      payload: response.data,
    });
  };
};

export function getDriverByName(name) {
  return async function (dispatch) {
    const response = await axios(`${URL_BASE}/?name=${name}`);
    console.log(response);
    return dispatch({
      type: GET_DRIVER_BY_NAME,
      payload: response.data,
    });
  };
}

export const getDriversById = (id) => {
  return async function (dispatch) {
    const response = await axios(`${URL_BASE}/${id}`);
    console.log(response);
    return dispatch({
      type: GET_DRIVER_BY_ID,
      payload: response.data,
    });
  };
};

export const clearDetail = () => {
  return async function (dispatch) {
    return dispatch({
      type: CLEAR_DETAIL,
    });
  };
};

export const getTeams = () => {
  return async (dispatch) => {
    const { data } = await axios.get("http://localhost:3001/teams");
    dispatch({
      type: GET_TEAMS,
      payload: data,
    });
  };
};



export const setCurrentPage = (page) => {
  return {
    type: SET_CURRENT_PAGE,
    payload: page,
  };
};

export const filterDrivers = (team, source, order) => {
  return {
    type: FILTER_DRIVERS,
    payload: { team, source, order },
  };
};

export const orderDrivers = (order) => {
  return {
    type: ORDER_DRIVERS,
    payload: order,
  };
};
