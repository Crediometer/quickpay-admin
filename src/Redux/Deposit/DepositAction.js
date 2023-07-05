import {
  DEPOSIT_FALIURE,
  DEPOSIT_REQUEST,
  DEPOSIT_SUCCESS,
} from "./DepositType";
import axios from "axios";
export const depositRequest = () => {
  return {
    type: DEPOSIT_REQUEST,
  };
};
export const depositSuccess = (deposit) => {
  return {
    type: DEPOSIT_SUCCESS,
    payload: deposit,
  };
};


export const depositFaliure = (error) => {
  return {
    type: DEPOSIT_FALIURE,
    payload: error,
  };
};
const baseUrl = "https://fe-sandbox-quick-pay.onrender.com/api/v1"

export const depositData = (depositState, history, historyError) => {
  return async (dispatch) => {
    dispatch(depositRequest())
    console.log(depositState)
    try {
      console.log(`${localStorage.getItem("auth")}`);
      let datas = JSON.parse(localStorage.getItem("auth"));
      console.log(`data ----- ${datas}`);
      console.log(`this is data ${datas.token.data.token.token}`);
      const headers = {
        "Content-Type": "application/json",
        authorization: `Bearer ${datas.token.data.token.token}`,
      };
      console.log(depositState);
      const res = await axios.post(
        `${baseUrl}/transfers/transfer`,
        depositState,
        { headers: headers }
      );
      const { data } = res;
      console.log(res);
      console.log(data);
      if (res.status === 200) {
        history()
        dispatch(depositSuccess(data)); 
      }
    } catch (error) {
      if (error.response) {
        console.log(error)
        dispatch(depositFaliure(error.response));
        historyError()
      }
     
    }
  };
};
