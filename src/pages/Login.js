/**
 * Created by korman on 07.02.18.
 */
import React from 'react';
import {Page, Form, FormCell, CellHeader, CellBody, Label, Input, Button, Toast} from 'react-weui';
import axios from 'axios';
import Config from '../Config';

import injectSheet from 'react-jss';

const styles  = {
    loginForm: {
        position: 'absolute',
        width: '100%',
        top: '30%'
    }
};

@injectSheet(styles)

export default class Login extends React.Component {

    constructor(props){
        super(props);

        const config = new Config();
        this.state = {
            email: '',
            password: '',
            showError: false,
            baseUrl: config.baseUrl
        };

        this.changeEmail = this.changeEmail.bind(this);
        this.changePassword = this.changePassword.bind(this);
    }

    login(){
        axios.post(this.state.baseUrl + 'user/login', {
                email: this.state.email,
                password: this.state.password
        })
            .then(response => {
                //console.log(response);
                const role = response.data.role;
                window.localStorage.setItem('user', JSON.stringify(response.data));

                switch (role)
                {
                    case 'ROLE_ADMIN':
                            window.location = 'admin/shopper-list';
                        break;
                    case 'ROLE_CONSUMER':
                            window.location = 'consumer/buy-time-slots';
                        break;
                    case 'ROLE_SHOPPER':
                            window.location = 'shopper/device-list';
                        break;
                }
            })
            .catch(response => {
                console.log(response);
                this.setState({
                    showError: true
                });

                setTimeout(() => {
                    this.setState({
                        showError: false
                    });
                }, 3000);
            });

        //window.location = 'shopper/device-list';
    }

    changeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    changePassword(e) {

        this.setState({
            password: e.target.value
        });
        //this.state.password = e.target.value;
    }

    render() {
        const {classes, children} = this.props;

        return (
            <Page transition={true} infiniteLoader={true} ptr={false}>
                <Form className={classes.loginForm}>
                    <FormCell>
                        <CellHeader>
                            <Label>Email</Label>
                        </CellHeader>
                        <CellBody>
                            <Input type="email" placeholder="Enter Email" onChange={ e => this.changeEmail(e)}/>
                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            <Label>Password</Label>
                        </CellHeader>
                        <CellBody>
                            <Input type="password" placeholder="Password" onChange={ e => this.changePassword(e)}/>
                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellBody>
                            <Button onClick={this.login.bind(this)}>Login</Button>
                        </CellBody>
                    </FormCell>
                </Form>
                <Toast icon="warn" show={this.state.showError}>Incorrect User or Password</Toast>
            </Page>
        );
    };
}
