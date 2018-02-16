/**
 * Created by korman on 06.02.18.
 */
import React from 'react';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import { Grid, Row, Col } from 'react-flexbox-grid';

import axios from 'axios';
import Config from '../../../Config';
import Core from '../Core';

import injectSheet from 'react-jss';

const styles  = {
    deviceForm: {
        padding: '20px',
        '& .saveButton': {
            width: '100%',
            marginTop: '20px'
        },
        '& .purifiersListButton': {
            width: '100%',
            marginTop: '20px'
        },
        '& .formInput': {
            width: ['100% !important']
        }
    }
};

@injectSheet(styles)

export default class DeviceDetail extends React.Component {

    constructor(props){
        super(props);
        const config = new Config();

        this.state = {

            id: typeof props.match.params.id != 'undefined' ? props.match.params.id : 0,
            item: {
                id: 0,
                is_enabled: false,
                mac: '',
                name: '',
                room: '',
                shopperId: ''
            },
            shopper: '',
            load: false,
            baseUrl: config.baseUrl
        };
        this.changeName = this.changeName.bind(this);
        this.changeShopper = this.changeShopper.bind(this);
    }

    componentWillMount() {
        axios.get(this.state.baseUrl + 'device/load/' + this.state.id)
            .then(response => {
                console.log(response);
                this.setState({
                    item: response.data
                });
            })
            .catch(response => {

            });
    }

    changeName(e){
        const item = this.state.item;
        item.name = e.target.value;

        this.setState({
            item: item
        });

    }

    changeRoom(e){
        const item = this.state.item;
        item.room = e.target.value;

        this.setState({
            item: item
        });
    }

    changeShopper(e){

        const item = this.state.item;
        item.shopperId = e.target.value;

        this.setState({
            item: item
        });
    }

    save(){
        this.setState({
            load: true
        });

        axios.post(this.state.baseUrl + 'device/save', {
            id: this.state.item.id,
            name: this.state.item.name,
            shopperId: this.state.item.shopperId
        })
            .then(response => {
                console.log(response);
                this.setState({
                    load: false
                });
                window.location = '/admin/device-list';
            })
            .catch(response => {

            });
    }

    openPurifiersList(){
        window.location = '/admin/device-list';
    }

    render() {
        const {classes, children} = this.props;

        if (!this.state.load) {
            return (
                <Core>
                    <Grid className={classes.deviceForm}>
                        <Row>
                            <Col md={6} xsOffset={3}>
                                <Row>
                                    <Col md={12}>
                                        <TextField className="formInput" hintText="Name"
                                                   value={this.state.item.name} onChange={ e => this.changeName(e)}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <TextField className="formInput" hintText="Room"
                                                   value={this.state.item.room} onChange={ e => this.changeRoom(e)}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <TextField className="formInput" hintText="Shopper ID"
                                                   value={this.state.item.shopperId}
                                                   onChange={ e => this.changeShopper(e)}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <TextField className="formInput" hintText="MAC Address"
                                                   value={this.state.item.mac} disabled={true}/>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={12}>
                                        <RaisedButton className="saveButton" label={`Save`}
                                                      primary={true} onClick={this.save.bind(this)}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <RaisedButton className="purifiersListButton" label="Access To Purifiers List"
                                                      primary={true} onClick={() => this.openPurifiersList()}/>
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