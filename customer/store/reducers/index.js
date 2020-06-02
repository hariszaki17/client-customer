import { SET_QUEUES, SET_MERCHANTS, SET_SERVICES, GET_MY_COORDINATES, SET_CUSTOMER, SET_TOKEN, SET_SERVICE_ID_PENDING, SET_QUEUE_ID, SET_IS_UPDATE, SET_MERCHANT_NAME, SET_SUCCESS_BOOK } from '../actions'

const initialState = {
  CustomerId: 8,
  queues: [],
  merchants: [],
  services: [],
  myCoordinate: '',
  token: '',
  ServiceId: 1,
  QueueId: '',
  isUpdate: false,
  statusQueue: '',
  merchantName: '',
  successBook: false
}



export default function reducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case SET_SUCCESS_BOOK:
      return { ...state, successBook: payload }
    case SET_MERCHANT_NAME:
      return { ...state, merchantName: payload }
    case SET_IS_UPDATE:
      return { ...state, isUpdate: payload }
    case SET_QUEUE_ID:
      return { ...state, QueueId: payload }
    case SET_SERVICE_ID_PENDING:
      return { ...state, ServiceId: payload }
    case SET_TOKEN:
      return { ...state, token: payload }
    case SET_CUSTOMER:
      return { ...state, CustomerId: payload }
    case GET_MY_COORDINATES:
      return { ...state, myCoordinate: payload }
    case SET_QUEUES:
      return { ...state, queues: payload }
    case SET_MERCHANTS:
      return { ...state, merchants: payload }
    case SET_SERVICES:
      return { ...state, services: payload }
    default:
      return state
  }
}
