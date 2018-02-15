/**
 * Created by korman on 07.02.18.
 */
import React from 'react';
// import {Page, Form, FormCell, CellHeader, CellBody, Label, Input, Button, Toast} from 'react-weui';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';

import axios from 'axios';
import Config from '../Config';

import injectSheet from 'react-jss';

const styles  = {
    loginForm: {
        textAlign: 'center',
        padding: '30px',
        position: 'absolute',
        height: '98%',
        width: '98%',
        '& .containerLoginForm': {
            width: '300px',
            padding: '30px',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: '150px'
        },
        '& .snackBar': {
            top: 0,
            bottom: 'auto',
            left: (window.innerWidth - 288) / 2
        }
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
            error: {
                open: false,
                message: ''
            },
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
                            //window.location = 'consumer/buy-time-slots';
                            //you do not have administrator rights
                            this.setState({
                                error: {
                                    open: true,
                                    message: 'You do not have administrator permission'
                                }
                            });

                            setTimeout(() => {
                                this.setState({
                                    error: {
                                        open: false,
                                        message: ''
                                    }
                                });
                            }, 3000);
                        break;
                    case 'ROLE_SHOPPER':
                            //window.location = 'shopper/device-list';
                            this.setState({
                                error: {
                                    open: true,
                                    message: 'You do not have administrator permission'
                                }
                            });

                            setTimeout(() => {
                                this.setState({
                                    error: {
                                        open: false,
                                        message: ''
                                    }
                                });
                            }, 3000);
                        break;
                }
            })
            .catch(error => {
                console.log(error.response.data.error.message);

                this.setState({
                    error: {
                        open: true,
                        message: error.response.data.error.message
                    }
                });

                setTimeout(() => {
                    this.setState({
                        error: {
                            open: false,
                            message: ''
                        }
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
            <Paper className={classes.loginForm}>
                <Paper className="containerLoginForm" zDepth={4}>
                    <div>
                        <TextField hintText="Enter Email" onChange={ e => this.changeEmail(e)}/>
                    </div>
                    <div>
                        <TextField hintText="Enter Password" type="password"  onChange={ e => this.changePassword(e)}/>
                    </div>
                    <div>
                        <RaisedButton label="Login" primary={true} onClick={this.login.bind(this)}/>
                    </div>
                        {/*<FormCell>*/}
                            {/*<CellHeader>*/}
                                {/*<Label>Email</Label>*/}
                            {/*</CellHeader>*/}
                            {/*<CellBody>*/}
                                {/*<Input type="email" placeholder="Enter Email" onChange={ e => this.changeEmail(e)}/>*/}
                            {/*</CellBody>*/}
                        {/*</FormCell>*/}
                        {/*<FormCell>*/}
                            {/*<CellHeader>*/}
                                {/*<Label>Password</Label>*/}
                            {/*</CellHeader>*/}
                            {/*<CellBody>*/}
                                {/*<Input type="password" placeholder="Password" onChange={ e => this.changePassword(e)}/>*/}
                            {/*</CellBody>*/}
                        {/*</FormCell>*/}
                        {/*<FormCell>*/}
                            {/*<CellBody>*/}
                                {/*<Button onClick={this.login.bind(this)}>Login</Button>*/}
                            {/*</CellBody>*/}
                        {/*</FormCell>*/}

                    {/*<Toast icon="warn" show={this.state.showError}>Incorrect User or Password</Toast>*/}
                </Paper>
                <Snackbar
                    className="snackBar"
                    open={this.state.error.open}
                    message={this.state.error.message}
                    autoHideDuration={4000}
                    onRequestClose={this.handleRequestClose}
                />
            </Paper >
        );
    };
}
