/**
 * Created by korman on 07.02.18.
 */
import React from 'react';
import {Page,
    Cells,
    CellsTitle,
    Cell,
    CellHeader,
    CellBody,
    CellFooter,
    Form,
    FormCell,
    Input,
    Button,
    Flex,
    FlexItem
} from 'react-weui';
import Core from '../Core';
import axios from 'axios';
import Config from '../../../Config';

import injectSheet from 'react-jss';

const styles  = {
    cells: {
        marginTop: '0px'
    }
};

@injectSheet(styles)

export default class ShopperDetail extends React.Component {

    constructor(props){
        super(props);

        const config = new Config();
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

    editShopper(id) {
        window.location = '/admin/shopper-form/' + id;
    }

    deleteShopper(id) {
        axios.delete(this.state.baseUrl + 'shopper/delete/' + id)
            .then(response => {
                console.log(response.data.message);
            })
            .catch(response => {
                console.log(response.data);
            });
    }

    render() {
        const {classes, children} = this.props;

        if (this.state.item) {
            return (
                <Core>
                    <Cells>
                        <Cell>
                            <CellBody>Shopper Name</CellBody>
                            <CellFooter>{this.state.item.name}</CellFooter>
                        </Cell>
                    </Cells>
                    <Cells className={classes.cells}>
                        <Cell>
                            <CellBody>Address</CellBody>
                            <CellFooter>{this.state.item.address}</CellFooter>
                        </Cell>
                    </Cells>
                    <Cells className={classes.cells}>
                        <Cell>
                            <CellBody>Contact</CellBody>
                            <CellFooter>{this.state.item.contact}</CellFooter>
                        </Cell>
                    </Cells>
                    <Cells className={classes.cells}>
                        <Cell>
                            <CellBody>Cell</CellBody>
                            <CellFooter>{this.state.item.cell}</CellFooter>
                        </Cell>
                    </Cells>
                    <Cells className={classes.cells}>
                        <Cell>
                            <CellBody>Shopper #</CellBody>
                            <CellFooter>{this.state.item.id}</CellFooter>
                        </Cell>
                    </Cells>

                    <Cells>
                        <Cell>
                            <CellBody>

                                <Flex>
                                    <FlexItem style={{margin:'4px'}}>
                                        <Button onClick={ id => this.editShopper(this.state.item.id) }>Edit</Button>
                                    </FlexItem>
                                    <FlexItem style={{margin:'4px'}}>
                                        <Button type="warn" onClick={ id => this.deleteShopper(this.state.item.id) }>Delete</Button>
                                    </FlexItem>
                                </Flex>

                            </CellBody>
                        </Cell>
                    </Cells>
                </Core>
            );
        } else {
            return (
                <Page transition={true} infiniteLoader={true} ptr={false}>
                    Load...
                </Page>
            );
        }
    };
}