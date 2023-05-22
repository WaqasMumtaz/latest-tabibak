import AsyncStorage from '@react-native-async-storage/async-storage';
// const BASE_URL = 'http://localhost:8000/';

//const BASE_URL = 'https://getboxxie.com/doctorportal/public/api';
// const BASE_URL = 'https://pakjazba.com/api';
// const BASE_URL = 'https://fahadoman.com/doctorportal/api/v1';
const BASE_URL = 'https://tabibak.om/api/v1';



const headersFor = (token) => {
    let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
    if (token) headers['Authorization'] = 'Bearer ' + token;
    return headers;
}

const credentials = "same-origin";

const handleErrors = (response) => {
    return response.json().then(responseData => {
        if (responseData.errors) {
            if (responseData.errors.indexOf('Invalid token') !== -1) {
                return AsyncStorage.removeItem('auth_token').then(() => {
                    let err = Error('Invalid auth token')
                   // Sentry.captureException(err)
                    throw err
                })
            } else {
                let err = Error(responseData.errors.join('. ') + '.')
                //Sentry.captureException(err)
                throw err
            }
        }
        return responseData

    });
}

const hitEndpoint = (method, endpoint, token, body) => {
    let headers = headersFor(token)
    let url = [BASE_URL, endpoint].join('/')
    
    //console.log(method, endpoint, token, body)
    //  console.log('Check HeadersFor >>>>', headers);
      console.log('URL Calling ***>>>', url);
   // return;
    return fetch(url, { method, credentials, headers, body }).then((response) => {
        return handleErrors(response)
    }).catch((err) => {
        if (err.message === 'Network request failed')
        //Sentry.captureException(err)
        throw err
    });
}

 const HttpUtilsFile = {
    get: (endpoint, token) => hitEndpoint('GET', endpoint, token),
    delete: (endpoint, token) => hitEndpoint('DELETE', endpoint, token),
    post: (endpoint, data, token) => {
        let body = JSON.stringify(data);
        //console.log('Body Data >>>', body);
        return hitEndpoint('POST', endpoint, token, body)
    },
    put: (endpoint, data, token) => {
        let body = JSON.stringify(data)
        return hitEndpoint('PUT', endpoint, token, body)
    }
}

export default HttpUtilsFile;