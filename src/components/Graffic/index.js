import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ButtonComponent from '../Button'

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
                data: revenue.length !== 0 ? [ revenue[0], revenue[1], revenue[2], revenue[3], revenue[4], revenue[5], revenue[6], revenue[7], revenue[8], revenue[9], revenue[10] ] : ''
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
                data: revenueGrowth.length !== 0 ? [ revenueGrowth[0], revenueGrowth[1], revenueGrowth[2], revenueGrowth[3], revenueGrowth[4], revenueGrowth[5], revenueGrowth[6], revenueGrowth[7], revenueGrowth[8], revenueGrowth[9], revenueGrowth[10] ] : ''
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
                data: operatingExpenses.length !== 0 ? [ operatingExpenses[0], operatingExpenses[1], operatingExpenses[2], operatingExpenses[3], operatingExpenses[4], operatingExpenses[5], operatingExpenses[6], operatingExpenses[7], operatingExpenses[8], operatingExpenses[9], operatingExpenses[10] ] : ''
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
                data: ebitdaMargin.length !== 0 ? [ ebitdaMargin[0], ebitdaMargin[1], ebitdaMargin[2], ebitdaMargin[3], ebitdaMargin[4], ebitdaMargin[5], ebitdaMargin[6], ebitdaMargin[7], ebitdaMargin[8], ebitdaMargin[9], ebitdaMargin[10] ] : ''
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
                data: ebitda.length !== 0 ? [ ebitda[0], ebitda[1], ebitda[2], ebitda[3], ebitda[4], ebitda[5], ebitda[6], ebitda[7], ebitda[8], ebitda[9], ebitda[10] ] : ''
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
                data: consolidatedIncome.length !== 0 ? [ consolidatedIncome[0], consolidatedIncome[1], consolidatedIncome[2], consolidatedIncome[3], consolidatedIncome[4], consolidatedIncome[5], consolidatedIncome[6], consolidatedIncome[7], consolidatedIncome[8], consolidatedIncome[9], consolidatedIncome[10] ] : ''
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