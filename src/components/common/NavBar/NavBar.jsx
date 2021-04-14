import React from 'react'
import { Navbar, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookReader } from '@fortawesome/free-solid-svg-icons'

const NavBarMenu = (props) => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Navbar.Brand as={Link} to="/">
        <Button
          className="bg-primary text-white"
          size="lg"
          variant="outlined"
          title={'Change the order'}
        >
          <FontAwesomeIcon icon={faBookReader} />
        </Button>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav"></Navbar.Collapse>
    </Navbar>
  )
}

export default NavBarMenu
