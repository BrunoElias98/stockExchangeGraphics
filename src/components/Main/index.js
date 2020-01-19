import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Grid from '../Grid'
import FormControl from '../FormControl'
import ButtonComponent from '../Button'
import { InputGroup } from 'react-bootstrap'

import api from '../../services/api'

export default function Main() {

    const [company, setCompany] = useState([])
    const [companyURL, setCompanyURL] = useState([])
    
    function filterList(event) {
        var updatedList = company

        updatedList = updatedList.filter(function(item){
            return item.symbol.toLowerCase().search(
            event.target.value.toLowerCase()) !== -1
        })
        
        setCompany(updatedList)
    }

    useEffect(() => {
        async function loadCompany() {
            const response = await api.get('/company/stock/list')
            
            setCompany(response.data.symbolsList)
        }

        loadCompany()
    }, [])

    const header = ['', 'Abreviação Empresa', 'Nome', 'Preço', '']

    function getSymbolCompany(value) {
        setCompanyURL(prevState => {
            return [...prevState, value];
        })
    }

    return (
        <>
            <h1>Soft Expert</h1>
            <h2>Soft Exchange Challenge - Bruno Elias de Souza</h2>
            
            <InputGroup className="mb-3">
                <FormControl
                    type='text'
                    placeholder='Search'
                    className='formControl-search'
                    onChange={filterList}
                />
                <InputGroup.Append>
                    <Link to={`/Graph/${companyURL.join(',')}`}>
                        <ButtonComponent
                            variant='secondary'
                            textButton='Comparar'
                            isAllow={false}
                            onClick={getSymbolCompany}
                        />
                    </Link>
                </InputGroup.Append>
            </InputGroup>

            <Grid
                headerGrid={header}
                company={company}
                isCheckable={true}
                type='checkbox'
                label=''
                isClickable={true}
                variantButton="light"
                textButton=''
                sizeButton='sm'
                classNameButton='buttonMoreInfo'
                isArrow={true}
                custom={true}
                getSymbolCompany={getSymbolCompany}
            />
        </>
    )
}