/**
 * Created by korman on 07.02.18.
 */
import React from 'react';
// import {Page, Form, FormCell, CellHeader, CellBody, Label, Input, Button} from 'react-weui';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import { Grid, Row, Col } from 'react-flexbox-grid';
import LangStrings from '../../../translations/admin/coupon/CouponForm';
import DatePicker from 'material-ui/DatePicker';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

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


export default class CouponForm extends React.Component {

    constructor(props){
        super(props);

        const config = new Config();
        LangStrings.setLanguage(config.language);

        const user = JSON.parse(window.localStorage.getItem('user'));

        this.state = {
            id: typeof props.match.params.id != 'undefined' ? props.match.params.id : 0,
            item: {
                shopperId: '',
                fromNumber: '',
                toNumber: '',
                expiredDate: null,
            },
            error: {
                open: false,
                message: ''
            },
            user: user,
            load: false,
            baseUrl: config.baseUrl
        };
    }

    openCouponList() {
        window.location = '/admin/coupon-list';
    }

    changeShopperId(e) {
        const item = this.state.item;
        item.shopperId = e.target.value;
        this.setState({
            item: item
        });
    }

    changeFromNumber(e){
        const item = this.state.item;
        item.fromNumber = e.target.value;
        this.setState({
            item: item
        });
    }

    changeToNumber(e){
        const item = this.state.item;
        item.toNumber = e.target.value;
        this.setState({
            item: item
        });
    }

    changeExpiredDate(e, date){

        const item = this.state.item;
        item.expiredDate = date.toLocaleDateString('en-US');
        this.setState({
            item: item
        });
        console.log(e, date, this.state.item.expiredDate);
    }

    save(){
        this.setState({
            load: true
        });

        axios.post(this.state.baseUrl + 'coupon/save', {
            shopperId: this.state.item.shopperId,
            fromNumber: this.state.item.fromNumber,
            toNumber: this.state.item.toNumber,
            expiredDate: this.state.item.expiredDate,
            token: this.state.user.token
        })
            .then(response => {
                console.log(response);
                this.setState({
                    load: false
                });
                //window.location = '/admin/coupon-list';
            })
            .catch(error => {
                console.log(error.response.data);
                this.setState({
                    error: {
                        open: true,
                        message: error.response.data.message
                    },
                    load: false
                });
            });
    }

    dialogClose = () => {
        let error = this.state.error;
        error.open = false;
        this.setState({error: error});
    };

    render() {
        const {classes, children} = this.props;

        if (!this.state.load) {
            const actions = [
                <FlatButton
                    label="Ok"
                    primary={true}
                    onClick={this.dialogClose}
                />
            ];

            return (
                <Core>
                    <Grid className={classes.shopperForm}>
                        <Row>
                            <Col md={6} xsOffset={3}>
                                <Row>
                                    <Col md={12}>
                                        <TextField className="formInput" hintText={LangStrings.shopperId}
                                                   value={this.state.item.shopperId}
                                                   onChange={e => this.changeShopperId(e)}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <TextField className="formInput" hintText={LangStrings.fromNumber}
                                                   value={this.state.item.fromNumber}
                                                   onChange={e => this.changeFromNumber(e)}/>
                                    </Col>
                                    <Col md={6}>
                                        <TextField className="formInput" hintText={LangStrings.toNumber}
                                                   value={this.state.item.toNumber}
                                                   onChange={e => this.changeToNumber(e)}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <DatePicker hintText={LangStrings.expiredDate}
                                                    onChange={this.changeExpiredDate.bind(this)}
                                                    locale="en-US"/>
                                        {/*<TextField className="formInput" hintText={LangStrings.expiredDate}*/}
                                                   {/*value={this.state.item.expiredDate}*/}
                                                   {/*onChange={e => this.changeExpiredDate(e)}/>*/}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <RaisedButton className="saveButton" label={LangStrings.save}
                                                      primary={true} onClick={this.save.bind(this)}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <RaisedButton className="shopperListButton" label={LangStrings.accessToCouponList}
                                                      primary={true} onClick={() => this.openCouponList()}/>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Grid>
                    <Dialog
                        actions={actions}
                        modal={false}
                        open={this.state.error.open}
                        onRequestClose={this.dialogClose}
                    >
                        {this.state.error.message}
                    </Dialog>
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