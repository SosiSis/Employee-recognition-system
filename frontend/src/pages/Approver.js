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
      <div className='flex justify-between'>
        <h1 className=' text-left text-2xl font-bold'>Nominees for different types of recognitions</h1>
        <div className='flexed__container justify-center items-center'>
          <div className='flexed' style={{ marginTop: '10px' }}>
            <div className='flex-center'>
              <svg width='20px' height='20px' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
              </svg>
              <p>Filter</p>
            </div>
            <select>
              <option>Nomination for on time on budget delivery</option>
              <option></option>
              <option></option>
            </select>
          </div>
        </div>
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
