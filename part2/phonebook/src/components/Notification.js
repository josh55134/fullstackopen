import React from 'react'

const Notification = ({ successMessage, errorMessage }) => {
  if (successMessage === null && errorMessage === null) {
    return null
  }
  else if(successMessage !== null) {
    return (
      <div className='success'>
        {successMessage}
      </div>
    )
  }
  else if(errorMessage !== null) {
    return (
      <div className='error'>
        {errorMessage}
      </div>
    )
  }
}

export default Notification