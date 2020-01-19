import React from 'react'
import { Navbar } from 'react-bootstrap'

export default function NavBar(props) {

    const { bgColor, variant, textNavbar, fixed } = props

    return (
        <Navbar
            bg={bgColor}
            variant={variant}
            fixed={fixed}
        >
            <Navbar.Brand>{textNavbar}</Navbar.Brand>
        </Navbar>
    )
}