import { Row, Col, Button, Flex } from 'antd';
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login', { replace: true });
    }

    const handleRegister = () => {
        navigate('/register', { replace: true });
    }

    return (
        <div className="home">
            <Row justify="center" align="middle" style={{ height: '100vh' }}>
                <Col>
                    <h1 style={{ textAlign: 'center' }}>Welcome to Ticket Page</h1>
                    <Flex gap="large" wrap="wrap">
                        <Button onClick={() => handleLogin()} style={{ marginLeft: '10vh' }} type="primary">Login</Button>
                        <Button onClick={() => handleRegister()} type="primary">Sign Up</Button>
                    </Flex>
                </Col>
            </Row>
        </div>
    );
}

export default Home;