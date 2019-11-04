import React, {Component, Fragment} from 'react';
import {Card, Col, Container, Form, Row} from "react-bootstrap";
const API = 'https://api.github.com/users/';
const axios = require('axios');

class Github extends Component {

    constructor(){
        super();

        this.state = {
            username: '',
            name: '',
            avatar_url: '',
            public_repos: '',
            public_gists: '',
            followers: '',
            following: '',
            isSubmited: false,
        }
        this.submitUsername = this.submitUsername.bind(this);
    }

    submitUsername(event){
        event.preventDefault();
        var userName = event.target.username.value;
        var fullUrl = `${API}${userName}`;

        axios.get(fullUrl)
            .then(res=>{
                this.setState({
                    username: userName,
                    name: res.data.name,
                    avatar_url: res.data.avatar_url,
                    public_repos: res.data.public_repos,
                    public_gists: res.data.public_gists,
                    followers: res.data.followers,
                    following: res.data.following,
                    isSubmited: true,
                })

            })
    }
    render() {
        var profileSubmited = '';
        if(this.state.isSubmited === true){
            profileSubmited = <Container className="mt-5 mb-5">
                <Row>
                    <Col lg={4} md={4} sm={12}>
                        <Card className="mb-3">
                            <Card.Img variant="top" src={this.state.avatar_url} />
                            <Card.Body>
                                <Card.Title>{this.state.name}</Card.Title>
                                <Card.Text>
                                    {this.state.username}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={8} md={8} sm={12}>
                        <Row>
                            <Col lg={6} md={6} sm={12}>
                                <Card className="mb-3">
                                    <Card.Body>
                                        <Card.Title>Repositories {this.state.public_repos}</Card.Title>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col lg={6} md={6} sm={12}>
                                <Card className="mb-3">
                                    <Card.Body>
                                        <Card.Title>Gits {this.state.public_gists}</Card.Title>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col lg={6} md={6} sm={12}>
                                <Card className="mb-3">
                                    <Card.Body>
                                        <Card.Title>Followers {this.state.followers}</Card.Title>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col lg={6} md={6} sm={12}>
                                <Card className="mb-3">
                                    <Card.Body>
                                        <Card.Title>Following {this.state.following}</Card.Title>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        }
        return (
            <Fragment>
                <Container className="mt-5 mb-5">
                    <Row>
                        <Col lg={{span:6, offset:3}}>
                            <div className="searchForm">
                                <Form onSubmit={this.submitUsername}>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Enter Github Username</Form.Label>
                                        <Form.Control type="text" placeholder="Useranem" name="username" ref="username" />
                                    </Form.Group>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </Container>

                {profileSubmited}

            </Fragment>
        );
    }
}

export default Github;