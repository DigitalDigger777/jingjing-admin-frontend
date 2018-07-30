/**
 * Created by korman on 07.02.18.
 */
import React from 'react';
// import {Page, Form, FormCell, CellHeader, CellBody, Label, Input, Button} from 'react-weui';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import { Grid, Row, Col } from 'react-flexbox-grid';
import LangStrings from '../../../translations/admin/device/DeviceForm';

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
                id: 0,
                shopperId: '',
                iccid: '',
                imei: ''
            },
            load: false,
            baseUrl: config.baseUrl
        };

        this.changeHandler = this.changeHandler.bind(this);
    }

    componentWillMount() {
        //shopper/load/10

        if (this.state.id > 0) {
            axios.get(this.state.baseUrl + 'device/load/' + this.state.id)
                .then(response => {
                    console.log(response.data);

                    this.setState({
                        item: {
                            id: response.data.id,
                            shopperId: response.data.shopperId,
                            iccid: response.data.iccid ? response.data.iccid : '',
                            imei: response.data.imei ? response.data.imei : ''
                        }
                    });
                })
                .catch(response => {
                    console.log(response);
                })
        }
    }

    changeHandler(e, name)
    {
        this.state.item[name] = e.target.value;
        this.setState({
            item: this.state.item
        });
    }

    save(){
        this.setState({
            load: true
        });

        axios.post(this.state.baseUrl + 'device/save', this.state.item)
            .then(response => {
                console.log(response);
                this.setState({
                    load: false
                });
                window.location = '/admin/device-list/' + this.state.item.shopperId;
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
                                        {LangStrings.shopperId}
                                    </Col>
                                    <Col md={8}>
                                        <TextField className="formInput" hintText={LangStrings.shopperId}
                                                   value={this.state.item.shopperId}
                                                   onChange={e => this.changeHandler(e, 'shopperId')}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={4} style={{margin: 'auto'}}>
                                        {LangStrings.ICCID}
                                    </Col>
                                    <Col md={8}>
                                        <TextField className="formInput" hintText={LangStrings.ICCID}
                                                   value={this.state.item.iccid}
                                                   onChange={e => this.changeHandler(e, 'iccid')}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={4} style={{margin: 'auto'}}>
                                        {LangStrings.IMEI}
                                    </Col>
                                    <Col md={8}>
                                        <TextField className="formInput" hintText={LangStrings.IMEI}
                                                   value={this.state.item.imei}
                                                   onChange={e => this.changeHandler(e, 'imei')}/>
                                    </Col>
                                </Row>


                                <Row>
                                    <Col md={12}>
                                        <RaisedButton className="saveButton"
                                                      label={this.state.id == 0 ? LangStrings.add : LangStrings.save}
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