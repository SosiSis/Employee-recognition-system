import React, { useEffect, useState } from 'react';
import './Approver.css';
import ContainerTwo from '../components/ContainerTwo';
import ContainerOne from '../components/ContainerOne';
import ApprovalHeader from '../components/ApprovalHeader';
import Footer from '../components/Footer';
import { Table } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    fontFamily: "Poppins",
    width: 150,
  },
  {
    title: 'Department',
    dataIndex: 'department',
    width: 150,
  },
  {
    title: 'Nomination Type',
    dataIndex: 'nomination_type',
    width: 150,
  },
  {
    title: 'Count',
    dataIndex: 'count',
    width: 150,
  },
  {
    title: 'See More',
    dataIndex: 'see_more',
    width: 150,
  }
];

function Approver() {
  const [data, setData] = useState([]);
  const token=localStorage.getItem('authToken')
  const navigate = useNavigate();
  const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL  
  const approvement = (first, last, email, id,type) => {
    navigate('/approvement', {
      state: {
        first,
        last,
        email,
        id,
        type
      }
    });
  };
  useEffect(() => {
    fetch(`${REACT_APP_BASE_URL}/api/nomination/nomination-count`, {headers: {
      'Content-Type': 'application/json',
      'authToken': token,
    },
    method: "GET",
  })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.nominations)
        const formattedData = data.nominations.map((item, index) => ({
          key: index,
          name: `${item.nominee.firstName} ${item.nominee.lastName}`,
          department: item.nominee.department,
          nomination_type: item.recognitionType.recognitionType,
          count:item.count,
          see_more: (
            
           
            <button onClick={() => approvement(item.nominee.firstName, item.nominee.lastName, item.nominee.email,item.nomineeID
              ,item.
              recognitionTypeID
              )} style={{ margin: '0px', padding: '0px' }} className='button'>See More</button>
           
          )
        }));
        setData(formattedData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <ApprovalHeader />
      <div className='flex justify-start'>
        <h1 className=' text-left text-2xl font-bold'>Nominees for different types of recognitions</h1>
       
      </div>
      <div style={{ fontFamily: "Poppins" }}>
        <Table
          columns={columns}
          dataSource={data}
          pagination={{
            pageSize: 50,
          }}
          scroll={{
            y: 440,
          }}
        />
      </div>
      <Footer />
    </div>
  );
}

export default Approver;
