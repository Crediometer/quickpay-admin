import { WEBHOOK_REQUEST, WEBHOOK_SUCCESS,WEBHOOK_FALIURE } from "./Webhooktype";
import axios from "axios"

export const webhookRequest = () =>{
    return{
        type: WEBHOOK_REQUEST
    }
}

export const webhookSuccess = (response) =>{
    return{
        type: WEBHOOK_SUCCESS,
        payload: response
    }
}

export const webhookFaliure = (error) =>{
    return{
        type: WEBHOOK_FALIURE,
        payload: error
    }
}

const baseUrl = "https://fe-sandbox-quick-pay.onrender.com/api/v1"


export const putwebhook = (id, hookState, history, setErrorHandler) => {
    return async (dispatch) => {
        dispatch(webhookRequest())
        console.log(`${localStorage.getItem("auth")}`)
        let datas = JSON.parse(localStorage.getItem("auth"))
        console.log(`data ----- ${datas}`)
        console.log(`this is data ${datas?.token?.data?.token?.token}`)
        try {
            const response = await axios.put(`${baseUrl}/profile/clients/${id}/webhook`, hookState, {headers: {
                Authorization: `Bearer ${datas?.token?.data?.token?.token}`,
            }})
            const data = response.data
            console.log(`this is web hook--- ${data}`)
            console.log(data)
            dispatch(webhookSuccess(data))
            if(response.status === 200){
                history()
            }
        }catch(error) {
            if (error.response) {
            dispatch(webhookFaliure(error?.response?.data?.message))
          // setErrorHandler({ hasError: true, message: error.response.data.message });
        }
        setErrorHandler({ hasError: true, message: error?.response?.data?.message });
        }
    }
}
