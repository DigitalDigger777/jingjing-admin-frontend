/**
 * Created by korman on 07.02.18.
 */
import React from 'react';
// import {Page, Form, FormCell, CellHeader, CellBody, Label, Input, Button} from 'react-weui';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import { Grid, Row, Col } from 'react-flexbox-grid';
import LangStrings from '../../../translations/admin/tester/TesterForm';

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


export default class TesterForm extends React.Component {

    constructor(props){
        super(props);

        const config = new Config();
        LangStrings.setLanguage(config.language);

        this.state = {
            id: typeof props.match.params.id != 'undefined' ? props.match.params.id : 0,
            item: {
                name: '',
                cell: '',
                pin: '',
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

    openTesterList() {
        window.location = '/admin/tester-list';
    }

    changeName(e){
        const item = this.state.item;
        item.name = e.target.value;
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

    changePin(e){
        const item = this.state.item;
        item.pin = e.target.value;
        this.setState({
            item: item
        });
    }

    save(){
        this.setState({
            load: true
        });

        axios.post(this.state.baseUrl + 'user/save', {
            name: this.state.item.name,
            cell: this.state.item.cell,
            pin: this.state.item.pin,
            role: 'ROLE_TESTER'
        })
            .then(response => {
                console.log(response);
                this.setState({
                    load: false
                });
                window.location = '/admin/tester-list';
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
                                        <TextField className="formInput" hintText="Tester Name"
                                                   value={this.state.item.name} onChange={e => this.changeName(e)}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <TextField className="formInput" hintText="Passcode"
                                                   value={this.state.item.pin}
                                                   onChange={e => this.changePin(e)}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <TextField className="formInput" hintText="Cell"
                                                   value={this.state.item.cell} onChange={e => this.changeCell(e)}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <RaisedButton className="saveButton" label={this.state.id == 0 ? `Add` : `Save`}
                                                      primary={true} onClick={this.save.bind(this)}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <RaisedButton className="shopperListButton" label="Access To Tester List"
                                                      primary={true} onClick={() => this.openTesterList()}/>
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