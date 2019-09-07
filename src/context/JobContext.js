import axios from 'axios'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import qs from 'qs'
import _ from 'lodash'

import createDataContext from './createDataContext'
import { FETCH_JOBS, LIKE_JOB } from '../constants'
import { GOOGLE_API } from '../apis/api';
import yelp from '../apis/yelp'

const INITIAL_STATE = {
    results: [],
    jobs: [],
    likedJobs: [],
}

const jobReducer = (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case FETCH_JOBS:
            return {
                jobs: payload
            }
        case LIKE_JOB: 
            return _.uniqBy([
                { likedJobs: payload }
              ], 'id');
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

// const ROOT_URL = 'https://api.yelp.com/v3/businesses/search?'
// const buildUrl = ({ name, street, region }) => {
//     const query = qs.stringify({ location: `${name}${street}` })
//     return `${ROOT_URL}${query}`
// }

// { name, street, region, postalCode, city, country } 

const fetchJobs = dispatch => async (region, searchTerm, callback) => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
 
    const { latitude, longitude } = region;
 
    Location.setApiKey(GOOGLE_API)
    
    try {
        const address = await Location.reverseGeocodeAsync({ latitude, longitude })
        const { name, street, city, region, country } = address[0]
        const response = await yelp.get('/search', {
            params: {
                limit: 5,
                location: `${name} ${street} ${city} ${region}`,
                ...(searchTerm ? { term: searchTerm } : null),
            }
        })
        // console.log("response", response.data.businesses)
        dispatch({ type: FETCH_JOBS, payload: response.data.businesses })
        callback()
    } catch (err) {
        console.log(err)
    }
}

const likeJob = dispatch => (job) => {
    dispatch({ type: LIKE_JOB , payload: job })
}

export const { Provider, Context } = createDataContext(
    jobReducer,
    { fetchJobs, likeJob },
    { jobs: [], likedJobs: [] }
)
