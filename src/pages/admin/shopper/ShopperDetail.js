/**
 * Created by korman on 07.02.18.
 */
import React from 'react';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Grid, Row, Col } from 'react-flexbox-grid';
import LangStrings from '../../../translations/admin/shopper/ShopperDetail';

import Core from '../Core';
import axios from 'axios';
import Config from '../../../Config';

import injectSheet from 'react-jss';

const styles  = {
    shopperDetail: {
        paddingBottom: '15px',
        '& .changeButton': {
            width: '100%',
            marginTop: '15px'
        },
        '& .nextButton': {
            width: '100%',
            marginTop: '15px'
        },
        '& .formInput': {
            width: ['100% !important']
        }
    }
};

@injectSheet(styles)

export default class ShopperDetail extends React.Component {

    constructor(props){
        super(props);

        const config = new Config();
        LangStrings.setLanguage(config.language);

        this.state = {
            id: props.match.params.id,
            item: null,
            baseUrl: config.baseUrl
        };
    }

    componentWillMount() {
        //shopper/load/10
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

    changeShopper(id) {
        window.location = '/admin/shopper-form/' + id;
    }

    nextShopper(id) {
        window.location = '/admin/shopper-detail/' + (parseInt(id) + 1);
    }


    render() {
        const {classes, children} = this.props;

        if (this.state.item) {
            return (
                <Core>
                    <Grid className={classes.shopperDetail}>
                        <Row>
                            <Col md={6} xsOffset={3}>
                                <Row>
                                    <Col md={4} style={{margin: 'auto'}}>
                                        {LangStrings.shopperName}
                                    </Col>
                                    <Col md={8}>
                                        <TextField className="formInput" hintText={LangStrings.shopperName} value={this.state.item.name} disabled={true}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={4} style={{margin: 'auto'}}>
                                        {LangStrings.address}
                                    </Col>
                                    <Col md={8}>
                                        <TextField className="formInput" hintText={LangStrings.address} value={this.state.item.address} disabled={true}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={4} style={{margin: 'auto'}}>
                                        {LangStrings.contact}
                                    </Col>
                                    <Col md={8}>
                                        <TextField className="formInput" hintText={LangStrings.contact} value={this.state.item.contact} disabled={true}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={4} style={{margin: 'auto'}}>
                                        {LangStrings.cell}
                                    </Col>
                                    <Col md={8}>
                                        <TextField className="formInput" hintText={LangStrings.contactPersonCellNumber} value={this.state.item.cell} disabled={true}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={4} style={{margin: 'auto'}}>
                                        {LangStrings.shopperId}
                                    </Col>
                                    <Col md={8}>
                                        <TextField className="formInput" hintText={LangStrings.shopperId} value={this.state.item.id} disabled={true}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={4} style={{margin: 'auto'}}>
                                        {LangStrings.hourRate}
                                    </Col>
                                    <Col md={8}>
                                        <TextField className="formInput" hintText={LangStrings.hourRate} value={this.state.item.rate} disabled={true}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={4} style={{margin: 'auto'}}>
                                        {LangStrings.commission}
                                    </Col>
                                    <Col md={8}>
                                        <TextField className="formInput" hintText={LangStrings.commission} value={this.state.item.rateCommission} disabled={true}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={4} style={{margin: 'auto'}}>
                                        {LangStrings.hours}
                                    </Col>
                                    <Col md={8}>
                                        <TextField className="formInput" hintText={LangStrings.hours} value={this.state.item.hoursObtainOwnership} disabled={true}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={4} style={{margin: 'auto'}}>
                                        {LangStrings.passcode}
                                    </Col>
                                    <Col md={8}>
                                        <TextField className="formInput" hintText={LangStrings.passcode} value={this.state.item.passCode} disabled={true}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <RaisedButton className="changeButton" label={LangStrings.change} primary={true} onClick={id => this.changeShopper(this.state.id)}/>
                                    </Col>
                                </Row>
                                {/*<Row>*/}
                                    {/*<Col md={12}>*/}
                                        {/*<RaisedButton className="nextButton" label="Next" primary={true} onClick={id => this.nextShopper(this.state.id)}/>*/}
                                    {/*</Col>*/}
                                {/*</Row>*/}
                            </Col>
                        </Row>
                    </Grid>
                </Core>
            );
        } else {
            return (
                <Core>
                    Load...
                </Core>
            );
        }
    };
}