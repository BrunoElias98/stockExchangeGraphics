import React from 'react'
import { Button } from 'react-bootstrap'

export default function ButtonComponent(props) {

    const { variant, size, className, isArrow, textButton } = props

    return (
        <Button 
            variant={variant}
            size={size}
            className={className}
        >
        {isArrow ? <i className="arrow right"></i> : textButton}
        </Button>
    )
}