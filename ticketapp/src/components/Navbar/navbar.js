import { Layout, Menu } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

const { Header } = Layout;


const Navbar = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('access')
        navigate('/login', { replace: true });
    }

    return (
        <Header>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                <Menu.Item key="1" style={{ color: 'white' }}>
                    <Link to='/project'>Home</Link>
                </Menu.Item>
                <Menu.Item key="logout" style={{ color: 'white', marginLeft: 'auto' }} onClick={handleLogout}>
                    Logout
                </Menu.Item>
            </Menu>
        </Header>
    );
};

export default Navbar;
