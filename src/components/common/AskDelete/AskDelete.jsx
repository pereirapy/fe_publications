import React from 'react'
import { Button } from 'react-bootstrap'
import Swal from 'sweetalert2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const AskDelete = (props) => {
  const askForSureWantDelete = () => {
    Swal.fire({
      title: 'Are you sure that you want delete this record?',
      icon: 'question',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        props.funcToCallAfterConfirmation(props.id)
      }
    })
  }

  return (
    <Button
      variant="danger"
      title={'delete'}
      onClick={() => askForSureWantDelete()}
    >
      <FontAwesomeIcon icon={faTrash} />
    </Button>
  )
}

export default AskDelete
