import { postServerData } from '../helper/helper'
import * as Action from '../redux/result_reducer'

//const REACT_APP_HOST = "http://localhost:5000";
const REACT_APP_HOST = "https://look-book-act-group42.herokuapp.com/"
export const PushAnswer = (result) => async (dispatch) => {
    try {
        await dispatch(Action.pushResultAction(result))
    } catch (error) {
        console.log(error)
    }
}
export const updateResult = (index) => async (dispatch) => {
    try {
        dispatch(Action.updateResultAction(index));
    } catch (error) {
        console.log(error)
    }
}

/** insert user data */
export const usePublishResult = (resultData) => {
    const { result, username } = resultData;
    (async () => {
        try {
            if(result !== [] && !username) throw new Error("Couldn't get Result");
            await postServerData(`${REACT_APP_HOST}/api/result`, resultData, data => data)
        } catch (error) {
            console.log(error)
        }
    })();
}