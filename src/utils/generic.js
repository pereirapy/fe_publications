import { get, isEmpty, isNumber } from 'lodash/fp'
import moment from 'moment'
import Swal from 'sweetalert2'

const formatDate = (date) =>
  date ? moment(date).format('YYYY-MM-DD HH:mm') : null

const parseErrorMessage = (error) => {
  const message = get('message', error)
  const errorConstraint = get('response.data.error.constraint', error)
  const errorCode = get('response.data.error.code', error)
  const errorMessage = get('response.data.error', error)
  return errorConstraint
    ? errorConstraint
    : errorCode
    ? errorCode
    : errorMessage
    ? errorMessage
    : message
    ? message
    : 'errorTextUndefined'
}


const showError = (error) => {

  Swal.fire({
    icon: 'error',
    title: 'Error',
    text: parseErrorMessage(error),
  })
}


const showSuccessful = (title) => {
  Swal.fire({
    title,
    icon: 'success',
    timer: 2000,
    timerProgressBar: true,
  })
}

const ifEmptySetNull = (value) =>
  isEmpty(value) && !isNumber(value) ? null : value

export {
  parseErrorMessage,
  formatDate,
  showError,
  showSuccessful,
  ifEmptySetNull,
}
