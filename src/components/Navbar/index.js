import React from 'react'
import { Navbar } from 'react-bootstrap'

export default function NavBar(props) {

    const { bgColor, variant, textNavbar } = props

    return (
        <Navbar
            bg={bgColor}
            variant={variant}
        >
            <Navbar.Brand>{textNavbar}</Navbar.Brand>
        </Navbar>
    )
}