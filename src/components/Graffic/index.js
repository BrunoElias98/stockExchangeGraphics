import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ButtonGrid from '../Button'

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import api from '../../services/api'
import { formatNumber } from '../../utils'

export default function Graffic(props) {

    const url = props.location.pathname.split('/')
    const urlSeparateParam = url[2]

    const [info, setInfo] = useState([])
    
    useEffect(() => {
        async function loadInfos() {
            const response = await api.get(`/financials/income-statement/${urlSeparateParam}`)
         
            setInfo(response.data.financials)
        }

        loadInfos()
    }, [])
    
    var revenue = []

    info && (
        info.map(info => {
        const numberFormatedRevenue = formatNumber(info.Revenue)
        revenue.push(numberFormatedRevenue)
        
        return 0
    }))

    const optionsRevenue = {
        chart: {
          type: 'spline'
        },
        title: {
          text: 'Chart SE'
        },
        series: [
          {
            data: revenue.length !== 0 ? [parseInt(revenue[0]), parseInt(revenue[1]), parseInt(revenue[2]), parseInt(revenue[3]), parseInt(revenue[4]), parseInt(revenue[5]), parseInt(revenue[6]), parseInt(revenue[7]), parseInt(revenue[8], parseInt(revenue[9]), parseInt(revenue[10]))] : ''
          }
        ]
    }

    return (
        <>
            <HighchartsReact highcharts={Highcharts} options={optionsRevenue} />

            <Link to='/'>
                <ButtonGrid variant='light' size='sm' isArrow={false} textButton='Voltar' ></ButtonGrid>
            </Link>
        </>
    ) 
}