/**
 * Created by korman on 07.02.18.
 */
import React from 'react';
// import {Page, Form, FormCell, CellHeader, CellBody, Label, Input, Button} from 'react-weui';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import { Grid, Row, Col } from 'react-flexbox-grid';
import LangStrings from '../../../translations/admin/shopper/ShopperForm';

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
        LangStrings.setLanguage(config.language);

        this.state = {
            id: typeof props.match.params.id != 'undefined' ? props.match.params.id : 0,
            item: {
                email:                  '',
                password:               '',
                name:                   '',
                address:                '',
                contact:                '',
                cell:                   '',
                rate:                   '',
                rateCommission:         '',
                passCode:               '',
                hoursObtainOwnership:   ''
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
        item.passCode = e.target.value;
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

    changeCommission(e){
        const item = this.state.item;
        item.rateCommission = e.target.value;
        this.setState({
            item: item
        });
    }

    changeHoursObtainOwnership(e){
        const item = this.state.item;
        item.hoursObtainOwnership = e.target.value;
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
            password: this.state.item.password,
            name: this.state.item.name,
            address: this.state.item.address,
            contact: this.state.item.contact,
            cell: this.state.item.cell,
            role: 'ROLE_SHOPPER',
            rate: this.state.item.rate,
            rateCommission: this.state.item.rateCommission,
            hoursObtainOwnership: this.state.item.hoursObtainOwnership
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
                            <Col md={7} xsOffset={2}>
                                <Row>
                                    <Col md={4} style={{margin: 'auto'}}>
                                        Shopper Name
                                    </Col>
                                    <Col md={8}>
                                        <TextField className="formInput" hintText="Shopper Name"
                                                   value={this.state.item.name} onChange={e => this.changeName(e)}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={4} style={{margin: 'auto'}}>
                                        Address
                                    </Col>
                                    <Col md={8}>
                                        <TextField className="formInput" hintText="Shopper Address"
                                                   value={this.state.item.address}
                                                   onChange={e => this.changeAddress(e)}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={4} style={{margin: 'auto'}}>
                                        Contact
                                    </Col>
                                    <Col md={8}>
                                        <TextField className="formInput" hintText="Contact Person"
                                                   value={this.state.item.contact}
                                                   onChange={e => this.changeContact(e)}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={4} style={{margin: 'auto'}}>
                                        Cell
                                    </Col>
                                    <Col md={8}>
                                        <TextField className="formInput" hintText="Contact Person Cell Number"
                                                   value={this.state.item.cell} onChange={e => this.changeCell(e)}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={4} style={{margin: 'auto'}}>
                                        Hour Rate
                                    </Col>
                                    <Col md={8}>
                                        <TextField className="formInput" hintText="Hour Rate"
                                                   value={this.state.item.rate} onChange={e => this.changeRate(e)}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={4} style={{margin: 'auto'}}>
                                        Commission Rate
                                    </Col>
                                    <Col md={8}>
                                        <TextField className="formInput" hintText="Commission Rate"
                                                   value={this.state.item.rateCommission} onChange={e => this.changeCommission(e)}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={4} style={{margin: 'auto'}}>
                                        Hours
                                    </Col>
                                    <Col md={8}>
                                        <TextField className="formInput" hintText="Hours"
                                                   value={this.state.item.hoursObtainOwnership} onChange={e => this.changeHoursObtainOwnership(e)}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={4} style={{margin: 'auto'}}>
                                        Passcode
                                    </Col>
                                    <Col md={8}>
                                        <TextField className="formInput" hintText="Passcode"
                                                   value={this.state.item.passCode} onChange={e => this.changePassword(e)}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <RaisedButton className="saveButton" label={this.state.id == 0 ? `Add` : `Save`}
                                                      primary={true} onClick={this.save.bind(this)}/>
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