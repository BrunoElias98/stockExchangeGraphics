import React from 'react'
import { Form } from 'react-bootstrap'

export default function FormCheck(props) {

    const { type, id, label, custom, onChange } = props
    
    return (
        <Form.Check
            custom={custom}
            type={type}
            id={id}
            label={label}
            onChange={onChange}
        />
    )
}