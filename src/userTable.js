import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './DataTable.css';

const UsersTable = () => {
  const [data, setData] = useState([]);

  const fetchData = () => {
    axios.get('https://back.qrcds.site/userstable')
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
    document.title = 'Пользователи';

    return () => clearInterval(intervalId);


  }, []);

  return (
    <div>
      <table className="logbook">
        <thead>
          <tr>
            <th>№</th>
            <th>ФИО</th>
            <th>ИТ</th>
            <th>АСУТП</th>
            <th>АХО</th>
            <th>IMEI</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.fio}</td>
              <td>{item.it}</td>
              <td>{item.asutp}</td>
              <td>{item.aho}</td>
              <td>{item.imei}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
