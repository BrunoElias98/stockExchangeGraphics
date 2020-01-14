import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ButtonComponent from '../Button'

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import api from '../../services/api'
import { formatNumber } from '../../utils'

export default function Graffic(props) {

    const url = props.location.pathname.split('/')
    const idCompany = url[2]

    const [info, setInfo] = useState([])
    
    useEffect(() => {
        async function loadInfos() {
            const response = await api.get(`/financials/income-statement/${idCompany}`)
         
            setInfo(response.data.financials)
        }

        loadInfos()
    }, [])
    
    var revenue = []
    var revenueGrowth = []
    var operatingExpenses = []
    var ebitdaMargin = []
    var ebitda = []
    var consolidatedIncome = []

    info && (
        info.map(info => {

        revenue.push(formatNumber(info.Revenue))

        revenueGrowth.push(formatNumber(info['Revenue Growth']))

        operatingExpenses.push(formatNumber(info['Operating Expenses']))

        ebitdaMargin.push(formatNumber(info['EBITDA Margin']))

        ebitda.push(formatNumber([info.EBITDA]))

        consolidatedIncome.push(formatNumber([info['Consolidated Income']]))

        return 0
    }))

    const optionsRevenue = {
        chart: {
            type: 'spline'
        },
        title: {
            text: 'Receita'
        },
        series: [
            {
                data: revenue.length !== 0 ?  revenue.map(revenue => ( [ revenue ] ))  : ''
            }
        ]
    }

    const optionsRevenueGrowth = {
        chart: {
            type: 'spline'
        },
            title: {
            text: 'Crescimento da Receita'
        },
        series: [
            {
                data: revenueGrowth.length !== 0 ? revenueGrowth.map(revenueGrowth => ( [ revenueGrowth ] )) : ''
            }
        ]
    }

    const optionsOperatingExpenses = {
        chart: {
            type: 'spline'
        },
            title: {
            text: 'Despesas Operacionais'
        },
        series: [
            {
                data: operatingExpenses.length !== 0 ? operatingExpenses.map(operatingExpenses => ( [ operatingExpenses ] )) : ''
            }
        ]
    }

    const optionsEbtidaMargin = {
        chart: {
            type: 'spline'
        },
            title: {
            text: 'Margem EBTIDA'
        },
        series: [
            {
                data: ebitdaMargin.length !== 0 ? ebitdaMargin.map(ebitdaMargin => ( [ ebitdaMargin ] )) : ''
            }
        ]
    }

    const optionsEbtida = {
        chart: {
            type: 'spline'
        },
            title: {
            text: 'EBTIDA'
        },
        series: [
            {
                data: ebitda.length !== 0 ? ebitda.map(ebitda => ( [ ebitda ] )) : '' 
            }
        ]
    }

    const optionsConsolidatedIncome = {
        chart: {
            type: 'spline'
        },
            title: {
            text: 'Renda Consolidada'
        },
        series: [
            {
                data: consolidatedIncome.length !== 0 ? consolidatedIncome.map(consolidatedIncome => ( [ consolidatedIncome ] )) : ''
            }
        ]
    }

    return (
        <>
            <HighchartsReact highcharts={Highcharts} options={optionsRevenue} />
            <HighchartsReact highcharts={Highcharts} options={optionsRevenueGrowth} />
            <HighchartsReact highcharts={Highcharts} options={optionsOperatingExpenses} />
            <HighchartsReact highcharts={Highcharts} options={optionsEbtidaMargin} />
            <HighchartsReact highcharts={Highcharts} options={optionsEbtida} />
            <HighchartsReact highcharts={Highcharts} options={optionsConsolidatedIncome} />

            <Link to='/'>
                <ButtonComponent variant='outline-dark' size='sm' isArrow={false} textButton='Voltar' className='button-back' ></ButtonComponent>
            </Link>
        </>
    ) 
}