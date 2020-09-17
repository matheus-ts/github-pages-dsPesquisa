import React, { useEffect, useState } from 'react';

import { barOptions, pieOptions } from './chart-option'
import Chart from 'react-apexcharts'

import Filter from '../../components/Filters';
import './styles.css';
import axios from 'axios'
import { buildBarSeries, getGenderChartData, getPlatformChartData } from './helpers';

type PieChartData = {
    labels: string[];
    series: number[];
}

type barChartData = {
    x: string;
    y: number;
}

const initialPieData = {
    labels: [],
    series: []
}

const BASE_URL = "https://sds1-matheus-dev.herokuapp.com"


const Charts = () => {

    const [barChartData, setBarChartData] = useState<barChartData[]>([]);

    const [platformData, setPlatformData] = useState<PieChartData>(initialPieData)

    const [genderData, setGenderData] = useState<PieChartData>(initialPieData)


    useEffect(() => {
        async function getData() {
            const recordsResponse = await axios.get(`${BASE_URL}/records`);
            const gamesResponse = await axios.get(`${BASE_URL}/games`);

            const barData = buildBarSeries(gamesResponse.data, recordsResponse.data.content);
            setBarChartData(barData)

            const platformChartData = getPlatformChartData(recordsResponse.data.content);
            setPlatformData(platformChartData);

            const genreChartData = getGenderChartData(recordsResponse.data.content);
            setGenderData(genreChartData)

        }
        getData();
    }, [])

    return (
        <div className="page-container">
            <Filter link="/records" linkText="Ver tabelas" />
            <div className="chart-container">
                <div className="top-related">
                    <h1 className="top-related-title">
                        Jogos mais votados !
                    </h1>
                    <div className="games-container">
                        <Chart options={barOptions} type="bar" width="800" height="650" series={[{ data: barChartData }]} />
                    </div>
                </div>
                <div className="charts">
                    <div className="platform-chart">
                        <h2 className="chart-title">Plataformas</h2>
                        <Chart
                            type="donut"
                            series={platformData?.series}
                            width="350"
                            options={{ ...pieOptions, labels: genderData?.labels }}
                        />
                    </div>
                    <div className="gender-chart">
                        <h2 className="chart-title">Gêneros</h2>
                        <Chart
                            type="donut"
                            series={genderData?.series}
                            width="350"
                            options={{ ...pieOptions, labels: genderData?.labels }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Charts