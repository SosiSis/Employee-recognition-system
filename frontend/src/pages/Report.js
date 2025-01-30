import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminHeader from '../components/AdminHeader';
import report from '../Assets/report.png';
import setting from '../Assets/setting.png';
import support_icon from '../Assets/support.png';
import { Table } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem(<p style={{color:'white'}}>Setting</p>, 'sub1', <img className="w-5 h-5" src={setting}/>, [
    getItem(<Link className='link' to={'/admin/setting1'}><p>Recognition type Setting</p></Link>, '1'),
    getItem(<Link className='link' to={'/admin/setting2'}><p>Reward type setting</p></Link>, '2'),
    getItem(<Link className='link' to={'/admin/setting3'}><p>Nomination date setting</p></Link>, '3'),
    getItem(<Link className='link' to={'/admin/setting4'}><p>Approval date setting</p></Link>, '4'),
    getItem(<Link className='link' to={'/admin/setting5'}><p>Reward Setting</p></Link>, '5')
  ]),
  getItem(<Link className='header__link' to="/admin/report"><p style={{color:'white'}}>Report</p></Link>, '6', <img className="w-5 h-5" src={report}/>),
  getItem(<Link className='header__link' to="/admin/support"><p style={{color:'white'}}>Support</p></Link>, '7', <img className="w-5 h-5" src={support_icon}/>),
];

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
    title: 'Nomination Count',
    dataIndex: 'nomination_count',
    width: 150,
  },
  {
    title: 'Recognition Type',
    dataIndex: 'recognition_type',
    width: 150,
  },
  {
    title: 'Recognition Count',
    dataIndex: 'recognition_count',
    width: 150,
  },
  {
    title: 'Reward',
    dataIndex: 'reward',
    width: 150,
  },
  {
    title: 'Reward Count',
    dataIndex: 'reward_count',
    width: 150,
  },
];

const Report = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [data, setData] = useState([]);
  
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
 const token = localStorage.getItem('authToken')
  useEffect(() => {
    fetch('http://localhost:3010/api/report/all',{headers:{'authToken':token}}) // replace with your endpoint URL
      .then(response => response.json())
      .then(data => {
        // Transform the API data to match the table's data structure
        const transformedData = data.employeesWithDetails.map((employee, index) => ({
          key: index,
          name: employee.name,
          department: employee.department,
          nomination_type: Object.keys(employee.nominations)[0], // assuming there's only one nomination type per employee
          nomination_count: Object.values(employee.nominations)[0],
          recognition_type: Object.keys(employee.recognitions)[0], // assuming there's only one recognition type per employee
          recognition_count: Object.values(employee.recognitions)[0],
          reward: Object.keys(employee.rewards)[0], // assuming there's only one reward type per employee
          reward_count: Object.values(employee.rewards)[0],
        }));
        setData(transformedData);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <>
      <AdminHeader/>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider width={'250'} style={{backgroundColor:'#19a44a',color:'white'}} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div style={{color:'white', backgroundColor:'white'}} className="demo-logo-vertical" />
          <Menu style={{backgroundColor:'#1E9648'}} theme="light" defaultSelectedKeys={['1']} mode="inline" items={items} />
        </Sider>
        <Layout>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Report</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, minHeight: 360, background: colorBgContainer, borderRadius: borderRadiusLG }}>
              <Table
                columns={columns}
                dataSource={data}
                pagination={{ pageSize: 50 }}
                scroll={{ y: 440 }}
              />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default Report;
