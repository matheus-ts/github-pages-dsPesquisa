import React, { useEffect, useState } from 'react';
import './styles.css';
import axios from 'axios';
import { RecordsResponse } from './types';
import { formatDate } from './helpers';
import Pagination from './Pagination';

import Filter from '../../components/Filters';

const BASE_URL = "https://sds1-matheus-dev.herokuapp.com"

const Records = () => {

    const [recordsResponse, setRecordsResponse] = useState<RecordsResponse>();

    const [activePage, setActivePage] = useState(0);

    useEffect(() => {
        axios.get(`${BASE_URL}/records?linesPerPage=12&page=${activePage}`).then(response => setRecordsResponse(response.data))
    }, [activePage])
    return (
        <div className="page-container">
            <Filter link="/charts" linkText="Ver grafícos" />
            <table className="records-table" cellPadding="0" cellSpacing="0">
                <thead>
                    <tr>
                        <th>INSTANTE</th>
                        <th>NOME</th>
                        <th>IDADE</th>
                        <th>PLATAFORMA</th>
                        <th>GÊNERO</th>
                        <th>TÍTULO DO GAME</th>
                    </tr>
                </thead>
                <tbody>
                    {recordsResponse?.content.map(record => (
                        <tr key={record.id}>
                            <td>{formatDate(record.moment)}</td>
                            <td>{record.name}</td>
                            <td>{record.age}</td>
                            <td className="text-secondary">{record.gamePlatform}</td>
                            <td>{record.genreName}</td>
                            <td className="text-primary">{record.gameTitle}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination
                activePage={activePage}
                goToPage={(index: number) => setActivePage(index)}
                totalPages={recordsResponse?.totalPages}
            />
        </div>
    )
}

export default Records;