import React from 'react'

export default function Header(props) {
    
    const { headerGrid } = props
    
    return (
        <>
            <tr>
                {headerGrid.map((header, index) => (
                    <th key={index}>{header}</th>
                ))}
            </tr>
        </>
    )
}