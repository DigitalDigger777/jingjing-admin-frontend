/**
 * Created by korman on 06.02.18.
 */
import React from 'react';
// import {Page,
//         Cells,
//         CellsTitle,
//         Cell,
//         CellHeader,
//         CellBody,
//         CellFooter,
//         SearchBar
// } from 'react-weui';

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import QRCode from 'qrcode.react';
import SearchBar from 'material-ui-search-bar'
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import axios from 'axios';
import Config from '../../../Config';
import Core from '../Core';

export default class DeviceList extends React.Component {

    constructor(props){
        super(props);
        const config = new Config();

        this.state = {
            items: [],
            dialog: {
                open: false
            },
            baseFrontUrl: config.baseFrontUrl,
            baseUrl: config.baseUrl
        };

        this.closeDialog = this.closeDialog.bind(this);
    }

    componentWillMount() {
        axios.get(this.state.baseUrl + 'device/items')
            .then(response => {
                console.log(response);
                this.setState({
                    items: response.data
                });
            })
            .catch(response => {

            });
    }

    openDeviceDetail(id){
        window.location = '/admin/device-detail/' + id;
    }

    download(e, id){
        const canvas = document.querySelector('.HpQrcode' + id + ' > canvas');
        e.target.href = canvas.toDataURL();
        e.target.download = 'QR-' + id + '.png';
    }

    actionMenuChange(e, index, value) {
        const action = value.split(':');
        const id = action[0];

        console.log(action[1], id);

        switch (parseInt(action[1]))
        {
            case 0:
                break;
            case 1:
                    //detail
                    window.location = '/admin/device-detail/' + id;
                break;
            case 2:
                    //assign shopper
                break;
            case 3:
                    //reset
                break;
            case 4:
                    //remove
                break;
        }
    }

    changeSearch(){

    }

    save(){

    }

    closeDialog(){
        this.setState({open: false});
    }

    render() {

        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.closeDialog}
            />,
            <FlatButton
                label="Ok"
                primary={true}
                keyboardFocused={true}
                onClick={this.save}
            />,
        ];

        return (
            <Core>
                <Toolbar style={{marginTop: '15px', paddingTop: '15px', paddingBottom: '15px'}}>
                    <ToolbarGroup>
                        <SearchBar
                            onChange={() => console.log('onChange')}
                            onRequestSearch={() => console.log('onRequestSearch')}
                            style={{
                                margin: '0 auto',
                                maxWidth: 800
                            }}
                        />
                    </ToolbarGroup>
                    <ToolbarGroup>
                        {/*<RaisedButton label="Add Device" primary={true} />*/}
                    </ToolbarGroup>
                </Toolbar>
                <Table selectable={false}>
                    <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                        <TableRow>
                            <TableHeaderColumn>ID</TableHeaderColumn>
                            <TableHeaderColumn>QR Code</TableHeaderColumn>
                            <TableHeaderColumn>Add Time</TableHeaderColumn>
                            <TableHeaderColumn>Total Hour Used</TableHeaderColumn>
                            <TableHeaderColumn>Total Revenue</TableHeaderColumn>
                            <TableHeaderColumn>Action</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false} showRowHover={true}>
                        { this.state.items.map((item, key) => {

                                const qrURL = this.state.baseFrontUrl + 'public/index.php/payment/start/' + item[0].id;

                                return (<TableRow key={key} onClick={ id => this.openDetailShopper(item[0].id) }>
                                    <TableRowColumn>{item[0].id}</TableRowColumn>
                                    <TableRowColumn className={`HpQrcode` + item[0].id}>
                                        <QRCode value={qrURL} size="64"/>
                                        <br/>
                                        <a href="#" onClick={(e, id) => this.download(e, item[0].id)}>Download</a>

                                    </TableRowColumn>
                                    <TableRowColumn>{item[1]}</TableRowColumn>
                                    <TableRowColumn>{item[0].deviceStatistics[0].total_hours}</TableRowColumn>
                                    <TableRowColumn>{item[0].deviceStatistics[0].total_revenue}</TableRowColumn>
                                    <TableRowColumn>
                                        <DropDownMenu value={this.state.value} onChange={this.actionMenuChange}>
                                            <MenuItem value={item[0].id + `:` + 0} primaryText="Select Action"/>
                                            <MenuItem value={item[0].id + `:` + 1} primaryText="Detail"/>
                                            <MenuItem value={item[0].id + `:` + 2} primaryText="Assign Shopper"/>
                                            <MenuItem value={item[0].id + `:` + 3} primaryText="Reset"/>
                                            <MenuItem value={item[0].id + `:` + 4} primaryText="Remove"/>
                                        </DropDownMenu>
                                    </TableRowColumn>
                                </TableRow>);
                            }
                        )}
                    </TableBody>
                </Table>

                <Dialog
                    title="Warning"
                    actions={actions}
                    modal={false}
                    open={this.state.dialog.open}
                    onRequestClose={this.closeDialog}
                >
                    Are you sure you want to remove this Purifier?

                </Dialog>

                <Dialog
                    title="Warning"
                    actions={actions}
                    modal={false}
                    open={this.state.dialog.open}
                    onRequestClose={this.closeDialog}
                >
                    Are you sure you want to reset this Purifier?
                </Dialog>

                <Dialog
                    title="Change Shopper ID"
                    actions={actions}
                    modal={false}
                    open={this.state.dialog.open}
                    onRequestClose={this.closeDialog}
                >

                    Please Assign Shopper to This Purifier
                    <TextField hintText="Input shopper ID" />
                </Dialog>
                {/*<Cells style={{paddingBottom: '100px'}}>*/}
                    {/*{this.state.items.map((item, key) => {*/}
                        {/*return (*/}
                            {/*<Cell key={key} access onClick={(id) => this.openDeviceDetail(item.id)}>*/}
                                {/*<CellBody>{item.name}</CellBody>*/}
                                {/*<CellFooter>{item.room}</CellFooter>*/}
                            {/*</Cell>*/}
                        {/*);*/}
                    {/*})}*/}
                {/*</Cells>*/}
            </Core>
        );
    };
}
