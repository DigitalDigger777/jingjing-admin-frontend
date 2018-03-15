/**
 * Created by korman on 07.02.18.
 */
import React from 'react';
// import {Page, Form, FormCell, CellHeader, CellBody, Label, Input, Button} from 'react-weui';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import { Grid, Row, Col } from 'react-flexbox-grid';

import Core from '../Core';
import axios from 'axios';
import Config from '../../../Config';

import injectSheet from 'react-jss';

const styles  = {
    shopperForm: {
        padding: '20px',
        '& .saveButton': {
            width: '100%',
            marginTop: '20px'
        },
        '& .shopperListButton': {
            width: '100%',
            marginTop: '20px'
        },
        '& .formInput': {
            width: ['100% !important']
        }
    }
};

@injectSheet(styles)


export default class ShopperForm extends React.Component {

    constructor(props){
        super(props);

        const config = new Config();
        this.state = {
            id: typeof props.match.params.id != 'undefined' ? props.match.params.id : 0,
            item: {
                email: '',
                password: '',
                name: '',
                address: '',
                contact: '',
                cell: '',
                rate: ''
            },
            load: false,
            baseUrl: config.baseUrl
        };
    }

    componentWillMount() {
        //shopper/load/10

        if (this.state.id > 0) {
            axios.get(this.state.baseUrl + 'shopper/load/' + this.state.id)
                .then(response => {
                    this.setState({
                        item: response.data
                    });
                })
                .catch(response => {
                    console.log(response);
                })
        }
    }

    openShopperList() {
        window.location = '/admin/shopper-list';
    }

    changeEmail(e){
        const item = this.state.item;
        item.email = e.target.value;
        this.setState({
            item: item
        });
    }

    changePassword(e){
        const item = this.state.item;
        item.password = e.target.value;
        this.setState({
            item: item
        });
    }

    changeName(e){
        const item = this.state.item;
        item.name = e.target.value;
        this.setState({
            item: item
        });
    }

    changeAddress(e){
        const item = this.state.item;
        item.address = e.target.value;
        this.setState({
            item: item
        });
    }

    changeContact(e){
        const item = this.state.item;
        item.contact = e.target.value;
        this.setState({
            item: item
        });
    }

    changeCell(e){
        const item = this.state.item;
        item.cell = e.target.value;
        this.setState({
            item: item
        });
    }

    changeRate(e){
        const item = this.state.item;
        item.rate = e.target.value;
        this.setState({
            item: item
        });
    }

    save(){
        this.setState({
            load: true
        });

        axios.post(this.state.baseUrl + 'user/save', {
            id: this.state.id,
            email: this.state.item.email,
            password: this.state.item.password,
            name: this.state.item.name,
            address: this.state.item.address,
            contact: this.state.item.contact,
            cell: this.state.item.cell,
            rate: this.state.item.rate,
            role: 'ROLE_SHOPPER'
        })
            .then(response => {
                console.log(response);
                this.setState({
                    load: false
                });
                window.location = '/admin/shopper-list';
            })
            .catch(response => {

            });
    }

    render() {
        const {classes, children} = this.props;

        if (!this.state.load) {
            return (
                <Core>
                    <Grid className={classes.shopperForm}>
                        <Row>
                            <Col md={6} xsOffset={3}>
                                <Row>
                                    <Col md={12}>
                                        <TextField className="formInput" hintText="Shopper Name"
                                                   value={this.state.item.name} onChange={e => this.changeName(e)}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <TextField className="formInput" hintText="Shopper Address"
                                                   value={this.state.item.address}
                                                   onChange={e => this.changeAddress(e)}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <TextField className="formInput" hintText="Contact Person"
                                                   value={this.state.item.contact}
                                                   onChange={e => this.changeContact(e)}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <TextField className="formInput" hintText="Contact Person Cell Number"
                                                   value={this.state.item.cell} onChange={e => this.changeCell(e)}/>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={12}>
                                        <TextField className="formInput" hintText="Enter Email"
                                                   value={this.state.item.email} onChange={e => this.changeEmail(e)}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <TextField className="formInput" hintText="Rate"
                                                   value={this.state.item.rate} onChange={e => this.changeRate(e)}/>
                                    </Col>
                                </Row>
                                {/*<Row>*/}
                                    {/*<Col md={12}>*/}
                                        {/*<TextField className="formInput" hintText="Enter Password" type="password" onChange={e => this.changePassword(e)}/>*/}
                                    {/*</Col>*/}
                                {/*</Row>*/}


                                <Row>
                                    <Col md={12}>
                                        <RaisedButton className="saveButton" label={this.state.id == 0 ? `Add` : `Save`}
                                                      primary={true} onClick={this.save.bind(this)}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <RaisedButton className="shopperListButton" label="Access To Shopper List"
                                                      primary={true} onClick={() => this.openShopperList()}/>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Grid>
                </Core>
            );
        } else {
            return (
                    <Core>
                        <div style={{height: '100%', textAlign: 'center', paddingTop: '100px', paddingBottom: '100px'}}>
                            <CircularProgress/>
                        </div>
                    </Core>
            );
        }
    };
}