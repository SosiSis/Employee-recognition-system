import React from 'react';
import { Table } from 'antd';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
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
    title: 'Nomination amount',
    dataIndex: 'nomination_amount',
    width: 150,
  },
  {
    title:'See More',
    dataIndex: 'see_more',
    width: 150,
  }
];
const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `Abebe Kebede`,
    department: 'developer',
    nomination_type: 'cooperation incentive',
    nomination_amount:90 - i,
    see_more:<Link to='/approvement'> <button style={{margin:'0px',padding:'0px',}} className='button'>See More</button></Link>
  });
}

const Ant = () => {
  const navigation=useNavigate()

  const approvement=()=>{
    navigation('/aprovement')
  }

  return(


  <div style={{margin:'30px'}}>
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
)};
export default Ant;