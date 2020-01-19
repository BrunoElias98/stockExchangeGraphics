import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ButtonComponent from '../Button'

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import api from '../../services/api'
import { formatNumber } from '../../utils'

export default function Graph(props) {
    
    const url = props.location.pathname.split('/Graph/')
    const idCompany = url[1]

    const [infoCompanies, setInfoCompanies] = useState([])
    const [infoCompany, setInfoCompany] = useState([])
    const [companyName, setCompanyName] = useState('')
    
    useEffect(() => {
        async function loadInfos() {
            const response = await api.get(`/financials/income-statement/${idCompany}`)
         
            if(response.data.financialStatementList){
                setInfoCompanies(response.data.financialStatementList)
            } else {
                setInfoCompany(response.data.financials)
                setCompanyName(response.data.symbol)
            }
        }

        loadInfos()
    }, [idCompany])

    var seriesRevenue = []
    var seriesRevenueGrowth = []
    var seriesOperatingExpenses = []
    var seriesEbtidaMargin = []
    var seriesEbitda = []
    var seriesConsolidatedIncome = []

    infoCompanies && (
        infoCompanies.map(infoCompanies => {
            seriesRevenue.push({
                name: infoCompanies.symbol,
                data: infoCompanies.financials.map(revenue => formatNumber(revenue.Revenue) )
            })

            seriesRevenueGrowth.push({
                name: infoCompanies.symbol,
                data: infoCompanies.financials.map(revenueGrowth => formatNumber(revenueGrowth['Revenue Growth']) )
            })

            seriesOperatingExpenses.push({
                name: infoCompanies.symbol,
                data: infoCompanies.financials.map(operatingExpenses => formatNumber(operatingExpenses['Operating Expenses']) )
            })

            seriesEbtidaMargin.push({
                name: infoCompanies.symbol,
                data: infoCompanies.financials.map(ebitdaMargin => formatNumber(ebitdaMargin['EBITDA Margin']) ) 
            })

            seriesEbitda.push({
                name: infoCompanies.symbol,
                data: infoCompanies.financials.map(ebitda => formatNumber(ebitda.EBITDA) )
            })

            seriesConsolidatedIncome.push({
                name: infoCompanies.symbol,
                data: infoCompanies.financials.map(consolidatedIncome => formatNumber(consolidatedIncome['Consolidated Income']) )
            })

            return 0
        })
    )

    var revenue = []
    var revenueGrowth = []
    var operatingExpenses = []
    var ebitdaMargin = []
    var ebitda = []
    var consolidatedIncome = []

    infoCompany && (
        infoCompany.map(infoCompany => {

        revenue.push(formatNumber(infoCompany.Revenue))

        revenueGrowth.push(formatNumber(infoCompany['Revenue Growth']))

        operatingExpenses.push(formatNumber(infoCompany['Operating Expenses']))

        ebitdaMargin.push(formatNumber(infoCompany['EBITDA Margin']))

        ebitda.push(formatNumber([infoCompany.EBITDA]))

        consolidatedIncome.push(formatNumber([infoCompany['Consolidated Income']]))

        return 0
    }))
    
    const charts = [
        seriesRevenue = {
            chart: {
                type: 'spline'
            },
            title: {
                text: 'Receita'
            },
            series: seriesRevenue.length !== 0 ? seriesRevenue : 
            {
                name : companyName,
                data : revenue.map(revenue => ( [ revenue ] ))
            },
            plotOptions: {
                series: {
                    label: {
                        connectorAllowed: false
                    },
                    pointStart: 2010
                }
            },
        },
    
        seriesRevenueGrowth = {
            chart: {
                type: 'spline'
            },
            title: {
                text: 'Crescimento da Receita'
            },
            series: seriesRevenueGrowth.length !== 0 ? seriesRevenueGrowth : 
            {
                name : companyName,
                data : revenueGrowth.map(revenueGrowth => ( [ revenueGrowth ] ))
            },
            plotOptions: {
                series: {
                    label: {
                        connectorAllowed: false
                    },
                    pointStart: 2010
                }
            }
        },
    
        seriesOperatingExpenses = {
            chart: {
                type: 'spline'
            },
            title: {
                text: 'Despesas Operacionais'
            },
            series: seriesOperatingExpenses.length !== 0 ? seriesOperatingExpenses : 
            {
                name : companyName,
                data : operatingExpenses.map(operatingExpenses => ( [ operatingExpenses ] ))
            },
            plotOptions: {
                series: {
                    label: {
                        connectorAllowed: false
                    },
                    pointStart: 2010
                }
            }
        },
    
        seriesEbtidaMargin = {
            chart: {
                type: 'spline'
            },
            title: {
                text: 'Margem EBTIDA'
            },
            series: seriesEbtidaMargin.length !== 0 ? seriesEbtidaMargin : 
            {
                name : companyName,
                data : ebitdaMargin.map(ebitdaMargin => ( [ ebitdaMargin ] ))
            },
            plotOptions: {
                series: {
                    label: {
                        connectorAllowed: false
                    },
                    pointStart: 2010
                }
            },
            
        },

        seriesEbitda = {
            chart: {
                type: 'spline'
            },
            title: {
                text: 'EBTIDA'
            },
            series: seriesEbitda.length !== 0 ? seriesEbitda : 
            {
                name : companyName,
                data : ebitda.map(ebitda => ( [ ebitda ] ))
            },
            plotOptions: {
                series: {
                    label: {
                        connectorAllowed: false
                    },
                    pointStart: 2010
                }
            },  
        },

        seriesConsolidatedIncome = {
            chart: {
                type: 'spline'
            },
            title: {
                text: 'Renda Consolidada'
            },
            series: seriesConsolidatedIncome.length !== 0 ? seriesConsolidatedIncome : 
            {
                name : companyName,
                data : consolidatedIncome.map(consolidatedIncome => ( [ consolidatedIncome ] ))
            },
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
            <div className='highcharts-align'>
                {charts.map((chart, index) => 
                    <HighchartsReact key={index} highcharts={Highcharts} options={chart} />  
                )}

                <Link to='/'>
                    <ButtonComponent variant='outline-dark' size='sm' isArrow={false} textButton='Voltar' className='button-back' ></ButtonComponent>
                </Link>
            </div>
        </>
    ) 
}