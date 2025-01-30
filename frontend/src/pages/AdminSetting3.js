import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import AdminHeader from '../components/AdminHeader';
import report from '../Assets/report.png'
import setting from '../Assets/setting.png'
import support_icon from '../Assets/support.png'

import { Breadcrumb, Layout, Menu, theme } from 'antd';
import RecognitionType from '../components/RecognitionType';
import AdminSetting1 from './AdminSetting1';
import NominatonSetting from '../components/NominatonSetting';
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
  
  getItem( <p style={{color:'white'}}>Setting</p>, 'sub1', <img  className="w-5 h-5" src={setting}/>
, [
    getItem( <Link className='link' to={'/admin/setting1'}><p>Recognition type Setting</p></Link> , '1'),
    getItem(<Link className='link' to={'/admin/setting2'}><p>Reward type setting</p></Link>, '2'),
    getItem(<Link className='link' to={'/admin/setting3'}><p>Nomination date setting</p></Link>, '3'),
    getItem( <Link className='link' to={'/admin/setting4'}><p>Approval date setting</p></Link>, '4'),
    getItem(<Link className='link' to={'/admin/setting5'}><p>Reward Setting</p></Link> , '5')
  ]),
  getItem(
    <Link className='header__link' to="/admin/report"> <p style={{color:'white'}}>Report</p></Link>, '6', <img  className="w-5 h-5" src={report}/>),
  getItem(<Link className='header__link' to="/admin/support"><p style={{color:'white'}}>Support</p></Link>, '7',  <img  className="w-5 h-5" src={support_icon}/>),
];
const AdminSetting3 = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <>
     <AdminHeader/>
    <Layout
      style={{
        minHeight: '100vh',
       
      }}
    >
      <Sider  width={'250'} style={{backgroundColor:'#19a44a',color:'white'}}  collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div style={{color:'white', backgroundColor:'white',}} className="demo-logo-vertical" />
        <Menu  style={{backgroundColor:'#1E9648'}} theme="light" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout>
       
         
        <Content
          style={{
            margin: '0 16px',
           
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>Setting</Breadcrumb.Item>
            <Breadcrumb.Item>Nomination Date Setting</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <NominatonSetting/>
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
    </>
   
  );
};
export default AdminSetting3;