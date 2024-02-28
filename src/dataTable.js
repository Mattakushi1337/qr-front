import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

import './DataTable.css';

const DataTable = () => {
  const [data, setData] = useState([]);

  const fetchData = () => {
    axios.get('https://back.qrcds.site/data')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    fetchData();

    const intervalId = setInterval(() => {
      fetchData();
    }, 10);
    document.title = 'Заявки';

    return () => clearInterval(intervalId);


  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'dd.MM.yyyy hh:mm:ss');
  };

  return (
    <div>
      <table className="logbook">
        <thead>
          <tr>
            <th>№</th>
            <th>Дата создания</th>
            <th>Инициатор</th>
            <th>Тема</th>
            <th>Описание</th>
            <th>Группа исполнителей</th>
            <th>ТМЦ</th>
            <th>Местоположение ТМЦ</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{formatDate(item.date)}</td>
              <td>{item.fromWho}</td>
              <td>{item.theme}</td>
              <td>{item.description}</td>
              <td>{item.executorGroup}</td>
              <td>{item.object}</td>
              <td>{item.place}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
