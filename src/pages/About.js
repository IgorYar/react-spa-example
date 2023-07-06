import { Card, Container } from 'react-bootstrap';
import Header from '../components/Header';

function About() {
    return (
        <>
            <Header />
            <Container className="m-4 mx-auto fs-4">
                <Card className="about">
                    <Card.Body>
                        <Card.Title className="fs-2">Привет, меня зовут Игорь!</Card.Title>
                        <Card.Text>
                            Я работаю в IT с 2014 года. В основном занимался ручным и автоматизированным тестированием, а также немного Backend-разработкой web-приложений.
                        </Card.Text>
                        <Card.Text>
                            В настоящее время имею огромное желание развиваться во Frontend-разработке и в качестве тестового задания сделал этот одностраничный блог.
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};

export default About;