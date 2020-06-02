import axios from 'axios'
const baseUrl = "http://192.168.0.7:3000"
export const SET_QUEUES = 'SET_QUEUES'
export const SET_DESTINATION = 'SET_DESTINATION'
export const SET_MERCHANTS = 'SET_MERCHANTS'
export const SET_SERVICES = 'SET_SERVICES'
export const GET_MY_COORDINATES = 'GET_COORDINATES'
export const SET_CUSTOMER = 'SET_CUSTOMER'
export const SET_TOKEN = 'SET_TOKEN'
export const SET_SERVICE_ID_PENDING = 'SET_SERVICE_PENDING'
export const SET_QUEUE_ID = 'SET_QUEUE_ID'
export const SET_IS_UPDATE = 'SET_IS_UPDATE'
export const SET_MERCHANT_NAME = 'SET_MERCHANT_NAME'
export const SET_SUCCESS_BOOK = 'SUCCESS'


export const setSuccessBook = (status) => {
  return {
    type: status,
    payload: status
  }
}

export const setMerchantName = (name) => {
  return {
    type: SET_MERCHANT_NAME,
    payload: name
  }
}

export const setIsUpdate = (status) => {
  return {
    type: SET_IS_UPDATE,
    payload: status
  }
}

export const setQueueId = (id) => {
  return {
    type: SET_QUEUE_ID,
    payload: id
  }
}

export const setServiceIdPending = (id) => {
  return {
    type: SET_SERVICE_ID_PENDING,
    payload: id
  }
}

export const setCustomer = (id) => {
  return {
    type: SET_CUSTOMER,
    payload: id
  }
}

export const setToken = (token) => {
  return {
    type: SET_TOKEN,
    payload: token
  }
}

export const setQueues = (data) => {
  return {
    type: SET_QUEUES,
    payload: data
  }
}

export const setMerchants = (data) => {
  return {
    type: SET_MERCHANTS,
    payload: data
  }
}

export const setServices = (data) => {
  return {
    type: SET_SERVICES,
    payload: data
  }
}



// export const setDestination = (coordinate) => {
//   return {
//     type: SET_DESTINATION,
//     payload: coordinate
//   }
// }
export const getMyCoordinate = (coordinate) => {
  return {
    type: GET_MY_COORDINATES,
    payload: coordinate
  }
}


const fetchMerchants = () => {
  return axios.get(baseUrl + "/merchant")
}

export const getMerchants = () => {
  return async dispatch => {
    try {
      const { data } = await fetchMerchants()
      if (data) dispatch(setMerchants(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const fetchServicesByMerchantId = (id) => {
  return axios.get(baseUrl + `/service/${id}`)
}


export const getServicesByMerchantId = (id) => {
  return async dispatch => {

    try {
      const { data } = await fetchServicesByMerchantId(id)
      if (data) dispatch(setServices(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const fetchQueuesByServiceId = (ServiceId) => {
  return axios.get(baseUrl + `/queue/service/${ServiceId}`)
}

export const getQueuesByServiceId = (ServiceId) => {
  return dispatch => {
    fetchQueuesByServiceId(ServiceId)
      .then(({ data }) => {
        // if (data) console.log('OOOOKKKK', data)
        dispatch(setQueues(data))
        dispatch(setIsUpdate(false))
      })
      .catch(console.log)
  }
}

export const postQueue = (CustomerId, ServiceId) => {
  return axios({
    method: 'post',
    url: baseUrl + '/queue',
    data: {
      CustomerId, ServiceId
    }
  })
}

export const bookQueue = (CustomerId, ServiceId) => {
  return dispatch => {
    postQueue(CustomerId, ServiceId)
      .then(({ data }) => {
        dispatch(setQueueId(data.id))
        dispatch(setSuccessBook(true))
        return readTokenQueue(data.id)
      })
      .then(({ data }) => {
        dispatch(setToken(data.token))
      })
      .catch(err => {
        setSuccessBook(false)
      })
  }
}

export const readTokenQueue = async (QueueId) => {
  return axios.get(baseUrl + `/queue/${QueueId}`)
  // return async dispatch => {
  // const { data } = await axios.get(baseUrl + `/queue/${QueueId}`)
  // try {
  //   return data
  // } catch (error) {
  //   console.log(error)
  // }
  // }
}