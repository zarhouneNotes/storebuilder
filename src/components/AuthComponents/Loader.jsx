import React from 'react'
import { Spinner } from 'react-bootstrap'


function Loader({size}) {
  return (
        <Spinner className='' animation="border" role="status" size={size ? size : "sm"} />
  )
}

export default Loader