import { DASHBOARD_FALIURE, 
    DASHBOARD_REQUEST, 
    DASHBOARD_SUCCESS, 
    RECENT_TRANSACTION_REQUEST, 
    RECENT_TRANSACTION_SUCCESS, 
    RECENT_TRANSACTION_FALIURE,
    SUM_TRANSACTION_REQUEST,
    SUM_TRANSACTION_SUCCESS,
    SUM_TRANSACTION_FALIURE
} from "./DashboardType"
import axios from 'axios'

//ACTION FOR ANALYTICS
export const dashboardRequest = () =>{
    return{
        type: DASHBOARD_REQUEST
    }
}

export const dashboardSuccess = (response) =>{
    return{
        type: DASHBOARD_SUCCESS,
        payload: response
    }
}

export const dashboardFaliure = (error) =>{
    return{
        type: DASHBOARD_FALIURE,
        payload: error
    }
}

//ACTION FOR RECENT TRANSACTION
export const recenttranRequest = () =>{
    return{
        type: RECENT_TRANSACTION_REQUEST
    }
}

export const recenttranSuccess = (response) =>{
    return{
        type: RECENT_TRANSACTION_SUCCESS,
        payload: response
    }
}

export const recenttranFaliure = (error) =>{
    return{
        type: RECENT_TRANSACTION_FALIURE,
        payload: error
    }
}

//ACTION FOR SUM TRANSACTION
export const sumtranRequest = () =>{
    return{
        type: SUM_TRANSACTION_REQUEST
    }
}

export const sumtranSuccess = (response) =>{
    return{
        type: SUM_TRANSACTION_SUCCESS,
        payload: response
    }
}

export const sumtranFaliure = (error) =>{
    return{
        type: SUM_TRANSACTION_FALIURE,
        payload: error
    }
}
const baseUrl = "https://fe-sandbox-quick-pay.onrender.com/api/v1"

//FOR ANALYTICS
export const fetchanalytics = () => {
    return(dispatch) => {
        dispatch(dashboardRequest)
        // console.log(`${localStorage.getItem("auth")}`)
        // let datas = JSON.parse(localStorage.getItem("auth"))
        // console.log(`data ----- ${datas}`)
        // console.log(`this is data ${datas.token.token.token}`)
        axios.get(`${baseUrl}/dashboard/analytics`)
            .then( response => {
                const data = response.data
                console.log(`this is dashboard analytics--- ${data}`)
                dispatch(dashboardSuccess(data))
            })
            .catch(error =>{
                const errorMsg = error.message
                dispatch(dashboardFaliure(errorMsg))
            })
    }
}

//FOR RECENT TRANSACTION
export const fetchrecenttran = () => {
    return(dispatch) => {
        dispatch(recenttranRequest)
        // console.log(`${localStorage.getItem("auth")}`)
        // let datas = JSON.parse(localStorage.getItem("auth"))
        // console.log(`data ----- ${datas}`)
        // console.log(`this is data ${datas.token.token.token}`)
        axios.get(`${baseUrl}/dashboard/selectRecentTransactions`)
            .then( response => {
                const data = response.data
                console.log(`this is dashboard analytics--- ${data}`)
                dispatch(recenttranSuccess(data))
            })
            .catch(error =>{
                const errorMsg = error.message
                dispatch(recenttranFaliure(errorMsg))
            })
    }
}

//FOR SUM TRANSACTION
export const fetchsumtran = () => {
    return(dispatch) => {
        dispatch(sumtranRequest)
        // console.log(`${localStorage.getItem("auth")}`)
        // let datas = JSON.parse(localStorage.getItem("auth"))
        // console.log(`data ----- ${datas}`)
        // console.log(`this is data ${datas.token.token.token}`)
        axios.get(`${baseUrl}/dashboard/calculateTransactionSum`)
            .then( response => {
                const data = response.data
                console.log(`this is dashboard analytics--- ${data}`)
                dispatch(sumtranSuccess(data))
            })
            .catch(error =>{
                const errorMsg = error.message
                dispatch(sumtranFaliure(errorMsg))
            })
    }
}