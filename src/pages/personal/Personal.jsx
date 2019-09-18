import * as styles from './personal.less';
import 'antd/dist/antd.css';
import '@assets/styles/reset.less';
import React from 'react';
import ReactDOM from 'react-dom';
import 'moment/locale/zh-cn';
import { ConfigProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import logo from '@assets/images/logo.svg';
import { objectUtils } from '../../utils/object-utils';


class PersonalPage extends React.Component {

  constructor(props) {
    super(props);
    console.log(objectUtils.get(document, 'title'));
  }

  handleBtnClick = () => {
    console.log('跳转到首页');
    window.location.href = './index.html';
  };

  render() {
    return (
      <div className={styles.personalContainer}>
        <header className={styles.appHeader}>
          <img src={logo} className={styles.appLogo} alt="logo"/>
          <div onClick={this.handleBtnClick} className={styles.jumpBtn}>跳转到首页</div>
        </header>
      </div>
    );
  }
}


function renderPage() {
  ReactDOM.render(
    <ConfigProvider locale={zh_CN}>
      <PersonalPage/>
    </ConfigProvider>
    , document.getElementById('root'));
}

renderPage();

if (process.env.NODE_ENV === 'development') {
  if (module.hot) {
    module.hot.accept();
  }
}





