import React from 'react'
import { Row, Col, Container } from 'react-bootstrap'

const Footer = (props) => {
  return (
    <Container fluid>
      <Row className="bg-light mt-4">
        <Col className="mt-4 mb-4 text-center">Created By Rodrigo Pereira</Col>
      </Row>
    </Container>
  )
}

export default Footer
