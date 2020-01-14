import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ButtonComponent from '../Button'

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import api from '../../services/api'
import { formatNumber } from '../../utils'

export default function Graph(props) {
    
    const url = props.location.pathname.split('/')
    const idCompany = url[2]

    const [info, setInfo] = useState([])
    
    useEffect(() => {
        async function loadInfos() {
            const response = await api.get(`/financials/income-statement/${idCompany}`)
         
            setInfo(response.data.financials)
        }

        loadInfos()
    }, [idCompany])
    
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
    
    const charts = [
        revenue = {
            chart: {
                type: 'spline'
            },
            title: {
                text: 'Receita'
            },
            series: [
                {
                    name: 'Receita',
                    data: revenue.length !== 0 ?  revenue.map(revenue => ( [ revenue ] ))  : ''
                }
            ],
            plotOptions: {
                series: {
                    label: {
                        connectorAllowed: false
                    },
                    pointStart: 2010
                }
            },
        },
    
        revenueGrowth = {
            chart: {
                type: 'spline'
            },
                title: {
                text: 'Crescimento da Receita'
            },
            series: [
                {
                    name: 'Crescimento da Receita',
                    data: revenueGrowth.length !== 0 ? revenueGrowth.map(revenueGrowth => ( [ revenueGrowth ] )) : ''
                }
            ],
            plotOptions: {
                series: {
                    label: {
                        connectorAllowed: false
                    },
                    pointStart: 2010
                }
            },
        },
    
        operatingExpenses = {
            chart: {
                type: 'spline'
            },
                title: {
                text: 'Despesas Operacionais'
            },
            series: [
                {
                    name: 'Despesas Operacionais',
                    data: operatingExpenses.length !== 0 ? operatingExpenses.map(operatingExpenses => ( [ operatingExpenses ] )) : ''
                }
            ],
            plotOptions: {
                series: {
                    label: {
                        connectorAllowed: false
                    },
                    pointStart: 2010
                }
            },
        },
    
        ebitdaMargin = {
            chart: {
                type: 'spline'
            },
                title: {
                text: 'Margem EBTIDA'
            },
            series: [
                {
                    name: 'Margem EBTIDA',
                    data: ebitdaMargin.length !== 0 ? ebitdaMargin.map(ebitdaMargin => ( [ ebitdaMargin ] )) : ''
                }
            ],
            plotOptions: {
                series: {
                    label: {
                        connectorAllowed: false
                    },
                    pointStart: 2010
                }
            },
        },
    
        ebitda = {
            chart: {
                type: 'spline'
            },
                title: {
                text: 'EBTIDA'
            },
            series: [
                {
                    name: 'EBTIDA',
                    data: ebitda.length !== 0 ? ebitda.map(ebitda => ( [ ebitda ] )) : '' 
                }
            ],
            plotOptions: {
                series: {
                    label: {
                        connectorAllowed: false
                    },
                    pointStart: 2010
                }
            },
        },
    
        consolidatedIncome = {
            chart: {
                type: 'spline'
            },
                title: {
                text: 'Renda Consolidada'
            },
            series: [
                {
                    name: 'Renda Consolidada',
                    data: consolidatedIncome.length !== 0 ? consolidatedIncome.map(consolidatedIncome => ( [ consolidatedIncome ] )) : ''
                }
            ],
            plotOptions: {
                series: {
                    label: {
                        connectorAllowed: false
                    },
                    pointStart: 2010
                }
            },
        }
    ]   

    return (
        <>
            {charts.map((chart, index) => 
                <HighchartsReact key={index} highcharts={Highcharts} options={chart} />  
            )}

            <Link to='/'>
                <ButtonComponent variant='outline-dark' size='sm' isArrow={false} textButton='Voltar' className='button-back' ></ButtonComponent>
            </Link>
        </>
    ) 
}