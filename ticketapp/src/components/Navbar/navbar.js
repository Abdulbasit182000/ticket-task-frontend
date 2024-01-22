import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

const { Header } = Layout;


const Navbar = () => {

    return (
        <Header>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                <Link to='/project'>
                    <Menu.Item key="1" style={{ color: 'white' }}>
                        Home
                    </Menu.Item>
                </Link>
            </Menu>
        </Header>
    );
};

export default Navbar;
