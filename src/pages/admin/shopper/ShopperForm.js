/**
 * Created by korman on 07.02.18.
 */
import React from 'react';
import {Page, Form, FormCell, CellHeader, CellBody, Label, Input, Button} from 'react-weui';
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
                cell: ''
            },
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

    save(){
        axios.post(this.state.baseUrl + 'user/save', {
            id: this.state.id,
            email: this.state.item.email,
            password: this.state.item.password,
            name: this.state.item.name,
            address: this.state.item.address,
            contact: this.state.item.contact,
            cell: this.state.item.cell,
            role: 'ROLE_SHOPPER'
        })
            .then(response => {
                console.log(response);
            })
            .catch(response => {

            });
    }

    render() {
        const {classes, children} = this.props;

        return (
            <Core>
                <Form>
                    <FormCell>
                        <CellHeader>
                            <Label>Email</Label>
                        </CellHeader>
                        <CellBody>
                            <Input type="text" placeholder="Enter email" value={this.state.item.email} onChange={e => this.changeEmail(e)}/>
                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            <Label>Password</Label>
                        </CellHeader>
                        <CellBody>
                            <Input type="password" placeholder="Enter Password" value={this.state.item.password} onChange={e => this.changePassword(e)}/>
                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            <Label>Name</Label>
                        </CellHeader>
                        <CellBody>
                            <Input type="text" placeholder="Shopper Name" value={this.state.item.name} onChange={e => this.changeName(e)}/>
                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            <Label>Address</Label>
                        </CellHeader>
                        <CellBody>
                            <Input type="text" placeholder="Shoppe Address" value={this.state.item.address} onChange={e => this.changeAddress(e)}/>
                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            <Label>Contact</Label>
                        </CellHeader>
                        <CellBody>
                            <Input type="text" placeholder="Contact Person" value={this.state.item.contact} onChange={e => this.changeContact(e)}/>
                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            <Label>Cell</Label>
                        </CellHeader>
                        <CellBody>
                            <Input type="text" placeholder="Contact Person Cell Number" value={this.state.item.cell} onChange={e => this.changeCell(e)}/>
                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellBody>
                            <Button onClick={this.save.bind(this)}>{this.state.id == 0 ? `Add` : `Save`}</Button>
                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellBody>
                            <Button onClick={() => this.openShopperList()}>Access To Shopper List</Button>
                        </CellBody>
                    </FormCell>
                </Form>
            </Core>
        );
    };
}