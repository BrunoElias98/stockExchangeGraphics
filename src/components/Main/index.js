import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { InputGroup } from 'react-bootstrap'

import Grid from '../Grid'
import FormControl from '../FormControl'
import ButtonComponent from '../Button'

import api from '../../services/api'

export default function Main() {

    const [company, setCompany] = useState([])
    const [allCompany, setAllCompany] = useState([])
    const [companyURL, setCompanyURL] = useState([])
    
    function filterList(event) {
        var updatedList = allCompany

        updatedList = updatedList.filter(function(item){
            return item.symbol.toLowerCase().search(
            event.target.value.toLowerCase()) !== -1
        })

        setCompany(updatedList.slice(0 , 20))
    }

    useEffect(() => {
        async function loadCompany() {
            const response = await api.get('/company/stock/list')

            var arraySymbolsList = response.data.symbolsList.slice(0 , 20)
            setCompany(arraySymbolsList)
            setAllCompany(response.data.symbolsList)
        }

        loadCompany()
    }, [])

    const header = ['', 'Abreviação Empresa', 'Nome', 'Preço', '']

    function getSymbolCompany(value, checked) {
        setCompanyURL(prevState => {
            if(checked === false){
                return prevState.filter(element => element !== value)
            } else {
                return [...prevState, value]
            }
        })
    }

    return (
        <>
            <h2 className='title-main'>Soft Exchange Challenge - Bruno Elias de Souza</h2>
            
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