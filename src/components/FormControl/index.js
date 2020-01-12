import React from 'react'
import { Form } from 'react-bootstrap'

export default function FormControl(props) {

    const { type, placeholder, className } = props

    return (
        <Form.Control type={type} placeholder={placeholder} className={className} />
    )
}