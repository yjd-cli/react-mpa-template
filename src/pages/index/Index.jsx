import * as styles from './index.less';
import 'antd/dist/antd.css';
import '@assets/styles/reset.less';
import React from 'react';
import ReactDOM from 'react-dom';
import 'moment/locale/zh-cn';
import { ConfigProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import logo from '@assets/images/logo.svg';
import { objectUtils } from '@utils/object-utils';


class IndexPage extends React.Component {

    constructor(props) {
        super(props);

        console.log(objectUtils.get(document, 'title'));
    }


    handleBtnClick = () => {
        console.log('跳转到个人中心页');
        window.location.href = './personal.html';
    };

    render() {
        return (<div className={styles.indexContainer}>
                <header className={styles.appHeader}>
                    <img src={logo} className={styles.appLogo} alt="logo"/>
                    <div onClick={this.handleBtnClick} className={styles.jumpBtn}>跳转到个人中心页</div>
                </header>
            </div>);
    }
}


function renderPage() {
    ReactDOM.render(
        <ConfigProvider locale={zh_CN}>
            <IndexPage/>
        </ConfigProvider>
        , document.getElementById('root'));
}

renderPage();

if (process.env.NODE_ENV === 'development') {
    if (module.hot) {
        module.hot.accept();
    }
}




