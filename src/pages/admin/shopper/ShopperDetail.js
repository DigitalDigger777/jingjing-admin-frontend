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
                                        Shopper Name
                                    </Col>
                                    <Col md={8}>
                                        <TextField className="formInput" hintText="Shopper Name" value={this.state.item.name} disabled={true}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={4} style={{margin: 'auto'}}>
                                        Address
                                    </Col>
                                    <Col md={8}>
                                        <TextField className="formInput" hintText="Shopper Address" value={this.state.item.address} disabled={true}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={4} style={{margin: 'auto'}}>
                                        Contact
                                    </Col>
                                    <Col md={8}>
                                        <TextField className="formInput" hintText="Contact Person" value={this.state.item.contact} disabled={true}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={4} style={{margin: 'auto'}}>
                                        Cell
                                    </Col>
                                    <Col md={8}>
                                        <TextField className="formInput" hintText="Contact Person Cell Number" value={this.state.item.cell} disabled={true}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={4} style={{margin: 'auto'}}>
                                        Shopper #
                                    </Col>
                                    <Col md={8}>
                                        <TextField className="formInput" hintText="Shopper #" value={this.state.item.id} disabled={true}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={4} style={{margin: 'auto'}}>
                                        Hour Rate
                                    </Col>
                                    <Col md={8}>
                                        <TextField className="formInput" hintText="Hour Rate" value={this.state.item.rate} disabled={true}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={4} style={{margin: 'auto'}}>
                                        Commission
                                    </Col>
                                    <Col md={8}>
                                        <TextField className="formInput" hintText="Commission Rate" value={this.state.item.rateCommission} disabled={true}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={4} style={{margin: 'auto'}}>
                                        Hours
                                    </Col>
                                    <Col md={8}>
                                        <TextField className="formInput" hintText="Hours" value={this.state.item.hoursObtainOwnership} disabled={true}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={4} style={{margin: 'auto'}}>
                                        Passcode
                                    </Col>
                                    <Col md={8}>
                                        <TextField className="formInput" hintText="Passcode" value={this.state.item.passCode} disabled={true}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <RaisedButton className="changeButton" label={`Change`} primary={true} onClick={id => this.changeShopper(this.state.id)}/>
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
                    {/*<Cells>*/}
                        {/*<Cell>*/}
                            {/*<CellBody>Shopper Name</CellBody>*/}
                            {/*<CellFooter>{this.state.item.name}</CellFooter>*/}
                        {/*</Cell>*/}
                    {/*</Cells>*/}
                    {/*<Cells className={classes.cells}>*/}
                        {/*<Cell>*/}
                            {/*<CellBody>Address</CellBody>*/}
                            {/*<CellFooter>{this.state.item.address}</CellFooter>*/}
                        {/*</Cell>*/}
                    {/*</Cells>*/}
                    {/*<Cells className={classes.cells}>*/}
                        {/*<Cell>*/}
                            {/*<CellBody>Contact</CellBody>*/}
                            {/*<CellFooter>{this.state.item.contact}</CellFooter>*/}
                        {/*</Cell>*/}
                    {/*</Cells>*/}
                    {/*<Cells className={classes.cells}>*/}
                        {/*<Cell>*/}
                            {/*<CellBody>Cell</CellBody>*/}
                            {/*<CellFooter>{this.state.item.cell}</CellFooter>*/}
                        {/*</Cell>*/}
                    {/*</Cells>*/}
                    {/*<Cells className={classes.cells}>*/}
                        {/*<Cell>*/}
                            {/*<CellBody>Shopper #</CellBody>*/}
                            {/*<CellFooter>{this.state.item.id}</CellFooter>*/}
                        {/*</Cell>*/}
                    {/*</Cells>*/}

                    {/*<Cells>*/}
                        {/*<Cell>*/}
                            {/*<CellBody>*/}

                                {/*<Flex>*/}
                                    {/*<FlexItem style={{margin:'4px'}}>*/}
                                        {/*<Button onClick={ id => this.editShopper(this.state.item.id) }>Edit</Button>*/}
                                    {/*</FlexItem>*/}
                                    {/*<FlexItem style={{margin:'4px'}}>*/}
                                        {/*<Button type="warn" onClick={ id => this.deleteShopper(this.state.item.id) }>Delete</Button>*/}
                                    {/*</FlexItem>*/}
                                {/*</Flex>*/}

                            {/*</CellBody>*/}
                        {/*</Cell>*/}
                    {/*</Cells>*/}
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