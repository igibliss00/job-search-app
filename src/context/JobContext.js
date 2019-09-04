import axios from 'axios'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import qs from 'qs'

import createDataContext from './createDataContext'
import { FETCH_JOBS } from '../constants'
import { GOOGLE_API } from '../apis/api';

const INITIAL_STATE = {
    results: []
}

const jobReducer = (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case FETCH_JOBS:
        console.log("payload", payload)
            return {
                state: payload
            }
        default:
            break;
    }
}    

// const JOB_ROOT_URL = 'http://api.indeed.com/ads/apisearch?'
// const JOB_QUERY_PARAMS = {
//     publisher: '4201738803816157',
//     format: 'json',
//     v: '2',
//     latlong: 1,
//     radius: 10,
//     q: 'javascript'
// }

// const buildJobsUrl = zip => {
//     const query = qs.stringify({ ...JOB_QUERY_PARAMS, l: zip })
//     return `${JOB_ROOT_URL}${query}`
// }

const ROOT_URL = 'https://api.yelp.com/v3/businesses/search?'
const buildUrl = ({ name, street, region }) => {
    const query = qs.stringify({ location: `${name}${street}` })
    return `${ROOT_URL}${query}`
}

// { name, street, region, postalCode, city, country } 

const fetchJobs = (dispatch) => async region => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
 
    const { latitude, longitude } = region;
 
    Location.setApiKey(GOOGLE_API)
    
    try {
        const address = await Location.reverseGeocodeAsync({ latitude, longitude })
        console.log("address", )
        const url = buildUrl(address[0])      
        console.log("url", url) 
        let { data } = await axios.get(url)
        dispatch({ type: FETCH_JOBS, payload: data })
    } catch (err) {
        console.log(err)
    }
 
}

export const { Provider, Context } = createDataContext(
    jobReducer,
    { fetchJobs },
    {}
)
