import React from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import Header from './header'
import ButtonComponent from '../Button'
import FormCheck from '../FormCheck'

export default function Grid(props) {

    const { headerGrid, company, isCheckable, type, label, isClickable, variantButton, sizeButton, classNameButton, isArrow, custom, getSymbolCompany } = props
   
    function handleChange(companyId) {
        let checked =  document.getElementById(`custom-${companyId}`).checked
        return getSymbolCompany(companyId, checked)
    }
    
    return (
        <Table striped hover className='Grid'>
            <thead>
                <Header 
                    headerGrid={headerGrid} 
                />
            </thead>
            <tbody>
                {company && (
                    company.map(company => (
                        <tr key={company.symbol}>
                            <td>{isCheckable ? <FormCheck custom={custom} type={type} id={`custom-${company.symbol}`} label={label} onChange={() => handleChange(company.symbol)} /> : ''}</td>
                            <td>{company.symbol}</td>
                            <td>{company.name}</td>
                            <td>R${company.price}</td>
                            <td>{isClickable ? <Link to={`/Graph/${company.symbol}`}><ButtonComponent variant={variantButton} size={sizeButton} className={classNameButton} isArrow={isArrow} /></Link> : ''}</td>
                        </tr>
                    ))
                )}
            </tbody>
      </Table>
    )
}