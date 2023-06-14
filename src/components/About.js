import React from 'react';

import { Card } from 'react-bootstrap';
import Header from './Header';

function About() {
    return (
        <>
            <Header />
            <Card className="about">
                <Card.Body>
                    <Card.Title>О себе</Card.Title>
                    <Card.Text>
                        Текст
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    );
};

export default About;