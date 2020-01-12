import React, { useEffect, useState } from 'react'
import Grid from '../Grid'

import api from '../../services/api'

export default function Main() {

    const [company, setCompany] = useState([])
    
    useEffect(() => {
        async function loadCompany() {
            const response = await api.get('/company/stock/list')
            
            setCompany(response.data.symbolsList)
        }

        loadCompany()
    }, [])

    const header = ['', 'Abreviação Empresa', 'Nome', 'Preço', '']

    return (
        <>
            <h1>Soft Expert</h1>
            <h2>Soft Exchange Challenge - Bruno Elias de Souza</h2>

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
            />
        </>
    )
}