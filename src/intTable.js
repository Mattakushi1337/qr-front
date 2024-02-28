import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './intTable.css';

const IntTable = () => {
    const [data, setData] = useState([]);

    const fetchData = () => {
        axios.get('https://back.qrcds.site/intdata')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    useEffect(() => {
        document.title = 'Инвентаризация';
        fetchData();

        const intervalId = setInterval(() => {
            fetchData();
        }, 10);

        return () => clearInterval(intervalId);

    }, []);
    const updateCheck = async (id, currentCheck) => {
        try {
            if (currentCheck === 1) {
                await axios.patch(`https://back.qrcds.site/intData/${id}/update-checkno`);
            } else {
                await axios.patch(`https://back.qrcds.site/intData/${id}/update-check`);
            }
            fetchData();
        } catch (error) {
            console.error('Error updating check:', error);
        }
    };
    return (
        <table className="secondTable">
            <thead>
                <tr>
                    <th>№</th>
                    <th>Название</th>
                    <th>Инвентарный номер</th>
                    <th>Местоположение</th>
                    <th>Модель</th>
                    <th>Серийный номер</th>
                    <th>Описание</th>
                    <th>Дата ввода</th>
                    <th>Проверено?</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.intNumber}</td>
                        <td>{item.place}</td>
                        <td>{item.model}</td>
                        <td>{item.serialNumber}</td>
                        <td>{item.description}</td>
                        <td>{item.inDate}</td>
                        <td>{item.check === 1 ? '✔' : '❌'}
                            <button className='changeButton' onClick={() => updateCheck(item.id, item.check)}>
                                Изменить
                            </button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default IntTable;
