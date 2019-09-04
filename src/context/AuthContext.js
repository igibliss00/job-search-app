import { AsyncStorage } from 'react-native'
import createDataContext from './createDataContext'
import { FB_TOKEN, FACEBOOK_LOGIN_SUCCESS, FACEBOOK_LOGIN_FAIL } from '../constants'
import * as Facebook from 'expo-facebook'
import { APP_ID } from '../apis/api'

const authReducer = (state, { type, payload }) => {
    switch (type) {
        case FACEBOOK_LOGIN_SUCCESS:
            return { token: payload }
        case FACEBOOK_LOGIN_FAIL: 
            return { token: null }
        default:
               return state
    }
}

const facebookLogin = dispatch => async () => {
    let token = await AsyncStorage.getItem(FB_TOKEN)
    if (token) {
        dispatch ({ type: FACEBOOK_LOGIN_SUCCESS, payload: token })
    } else {
        doFacebookLogin(dispatch)
    }
}

const doFacebookLogin = async dispatch => {
    let { type, token } = await Facebook.logInWithReadPermissionsAsync(APP_ID, {
        permissions: ['public_profile']
    })

    if (type ==='cancel') {
        return dispatch({ type: FACEBOOK_LOGIN_FAIL })
    }

    await AsyncStorage.setItem(FB_TOKEN, token)
    dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token })
}

export const { Provider, Context } = createDataContext(
    authReducer,
    { facebookLogin },
    { token: null }
)