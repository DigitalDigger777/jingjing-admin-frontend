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
import QRCode from '../../../components/QRCode';
import QRCode1 from '../../../components/QRCode1';
import SearchBar from 'material-ui-search-bar'
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Pagination from 'material-ui-pagination';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import LangStrings from '../../../translations/admin/device/DeviceList';

import axios from 'axios';
import Config from '../../../Config';
import Core from '../Core';


export default class DeviceList extends React.Component {

    constructor(props){
        super(props);
        const config = new Config();

        this.state = {
            items: [],
            pagination: {
                page: 0,
                total: 0,
                display: 0
            },
            deviceId: 0,
            shopperId: this.props.match.params.shopperId,
            dialog: {
                assignShopper: {
                    open: false
                },
                reset: {
                    open: false
                },
                remove: {
                    open: false
                },
                firmwareUpdate: {
                    open: false
                }
            },
            onlinePurifiers: [],
            baseFrontUrl: config.baseFrontUrl,
            baseUrl: config.baseUrl
        };
        LangStrings.setLanguage(config.language);

        this.closeDialog        = this.closeDialog.bind(this);
        this.actionMenuChange   = this.actionMenuChange.bind(this);
        this.remove             = this.remove.bind(this);
        this.reset              = this.reset.bind(this);
        this.assignShopper      = this.assignShopper.bind(this);
        this.changeShopperId    = this.changeShopperId.bind(this);
        this.updateRows         = this.updateRows.bind(this);
        this.initData           = this.initData.bind(this);
    }

    componentWillMount() {
        this.initData();
    }

    initData(){
        //load items
        axios.get(this.state.baseUrl + 'device/items', {
            params: {
                page: this.state.pagination.page,
                shopperId: this.props.match.params.shopperId
            }
        })
            .then(response => {
                this.setState({
                    items: response.data
                });
            })
            .catch(response => {

            });

        //load total
        axios.get(this.state.baseUrl + 'device/total-items', {
            params: {
                shopperId: this.props.match.params.shopperId
            }
        })
            .then(response => {
                let pagination = this.state.pagination;
                pagination.total = parseInt(response.data.cnt);
                pagination.display = Math.ceil(parseInt(response.data.cnt)/10);
                this.setState({
                    pagination: pagination
                });
            });

        //load online/offline statuses
        axios.get(this.state.baseUrl + 'device/redis-load-all-online-for-shopper', {
            params: {
                shopperId: this.props.match.params.shopperId
            }
        })
            .then(response => {
                this.setState({
                    onlinePurifiers: response.data.purifiers
                });
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

        this.state.deviceId = id;
        let dialog = this.state.dialog;

        switch (parseInt(action[1]))
        {
            case 0:
                break;
            case 1:
                    //detail
                    window.location = '/admin/device/statement-list/' + id + '/' + this.state.shopperId;
                break;
            case 2:
                    //assign shopper

                    dialog.assignShopper.open = true;

                    this.setState({
                        dialog: dialog
                    });
                break;
            case 3:
                    //reset
                    dialog.reset.open = true;

                    this.setState({
                        dialog: dialog
                    });
                break;
            case 4:
                    //remove
                    dialog.remove.open = true;
                    this.setState({
                        dialog: dialog
                    });
                break;
            case 5:
                    //remove
                    dialog.firmwareUpdate.open = true;
                    this.setState({
                        dialog: dialog
                    });

                    axios.get(this.state.baseUrl + 'update-firmware/start', {
                        params: {
                            deviceId: id
                        }
                    })
                        .then(response => {
                            console.log(response.data);
                        })
                        .catch(error => {
                            console.log(error.response.data);
                        });
                break;
            case 6:
                    window.location = '/admin/device/log-list/' + id + '/' + this.state.shopperId;
                break;
            case 7:
                    window.location = '/admin/device-form/' + id;
                break;
        }
    }

    updateRows(number){
        axios.get(this.state.baseUrl + 'device/items', {
            params: {
                page: number - 1,
                shopperId: this.props.match.params.shopperId
            }
        })
            .then(response => {
                console.log(response);
                this.setState({
                    items: response.data
                });
            });
    }

    changeSearch(){

    }

    changeShopperId(e, val) {
        console.log(val);
        this.state.shopperId = val;
    }

    remove(){
        this.setState({
            dialog: {
                assignShopper: {
                    open: false
                },
                reset: {
                    open: false
                },
                remove: {
                    open: false
                },
                firmwareUpdate: {
                    open: false
                }
            }
        });

        axios.get(this.state.baseUrl + 'device/delete', {
            params: {
                id: this.state.deviceId
            }
        })
            .then(response => {
                console.log(response);

                axios.get(this.state.baseUrl + 'device/items')
                    .then(deviceResponse => {
                        console.log(deviceResponse);
                        this.setState({
                            items: deviceResponse.data
                        });
                    })
            })
            .catch(error => {
                console.log(error);
            });
    }

    reset(){
        this.setState({
            dialog: {
                assignShopper: {
                    open: false
                },
                reset: {
                    open: false
                },
                remove: {
                    open: false
                },
                firmwareUpdate: {
                    open: false
                }
            }
        });

        axios.get(this.state.baseUrl + 'device/save', {
            params: {
                id: this.state.deviceId,
                is_reset: true
            }
        })
            .then(response => {
                console.log(response);
            });
    }

    assignShopper(){
        this.setState({
            dialog: {
                assignShopper: {
                    open: false
                },
                reset: {
                    open: false
                },
                remove: {
                    open: false
                },
                firmwareUpdate: {
                    open: false
                }
            }
        });

        axios.post(this.state.baseUrl + 'device/save', {
            id: this.state.deviceId,
            shopperId: this.state.shopperId
        })
            .then(response => {
                console.log(response);
                this.initData();
            })
            .catch(response => {

            });
    }

    closeDialog(){
        this.setState({
            dialog: {
                assignShopper: {
                    open: false
                },
                reset: {
                    open: false
                },
                remove: {
                    open: false
                },
                firmwareUpdate: {
                    open: false
                }
            }
        });
    }

    render() {

        const actionsReset = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.closeDialog}
            />,
            <FlatButton
                label="Ok"
                primary={true}
                keyboardFocused={true}
                onClick={this.reset}
            />,
        ];

        const actionsRmv = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.closeDialog}
            />,
            <FlatButton
                label="Ok"
                primary={true}
                keyboardFocused={true}
                onClick={this.remove}
            />,
        ];

        const actionsAssignShopper = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.closeDialog}
            />,
            <FlatButton
                label="Ok"
                primary={true}
                keyboardFocused={true}
                onClick={this.assignShopper}
            />,
        ];

        const actionsFirmwareUpdate = [
            <FlatButton
                label="Ok"
                primary={true}
                keyboardFocused={true}
                onClick={this.closeDialog}
            />
        ];

        let qrColumnHeadre = '';

        if (this.state.shopperId != 0) {
            qrColumnHeadre = <TableHeaderColumn>{LangStrings.qrCode}</TableHeaderColumn>
        }

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
                        <RaisedButton label={LangStrings.addDevice} primary={true} onClick={() => { window.location = '/admin/device-form'; }}/>
                    </ToolbarGroup>
                </Toolbar>
                <Table selectable={false}>
                    <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                        <TableRow>
                            <TableHeaderColumn>{LangStrings.id}</TableHeaderColumn>
                            {/*<TableHeaderColumn>Temp</TableHeaderColumn>*/}
                            {qrColumnHeadre}
                            <TableHeaderColumn>{LangStrings.addTime}</TableHeaderColumn>
                            <TableHeaderColumn>{LangStrings.totalHourUsed}</TableHeaderColumn>
                            <TableHeaderColumn>{LangStrings.totalRevenue}</TableHeaderColumn>
                            <TableHeaderColumn>{LangStrings.status}</TableHeaderColumn>
                            <TableHeaderColumn>{LangStrings.action}</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false} showRowHover={true}>
                        { this.state.items.map((item, key) => {

                                const qrURL = 'http://jingjing.fenglinfl.com/public/index.php/payment/start/' + item[0].id;
                                const totalHours = typeof item[0].deviceStatistics[0] != 'undefined' ? item[0].deviceStatistics[0].total_hours : 0;
                                const totalRevenue = typeof item[0].deviceStatistics[0] != 'undefined' ? item[0].deviceStatistics[0].total_revenue : 0;
                                const date = item[1].split(' ');
                                let qrColumn = '';

                                if (this.state.shopperId != 0) {
                                    qrColumn =
                                        <TableRowColumn className={`HpQrcode` + item[0].id} style={{paddingBottom: '20px', paddingTop: '20px'}}>
                                            <QRCode value={qrURL} size={64} labelheight={20} label={`#` + item[0].deviceCode}/>
                                            <br/>
                                            <a href="#" onClick={(e, id) => this.download(e, item[0].id)}>{LangStrings.download}</a>
                                            <br/>
                                            {/*{item[0].deviceCode}*/}
                                        </TableRowColumn>
                                }

                                return (
                                    <TableRow key={key} onClick={ id => this.openDetailShopper(item[0].id) }>
                                        <TableRowColumn>{item[0].deviceCode}</TableRowColumn>
                                        {/*<TableRowColumn>*/}
                                            {/*<QRCode1 value={qrURL} size={64} labelheight={20} label={`#` + item[0].deviceCode} renderAs="canvas"/>*/}
                                        {/*</TableRowColumn>*/}
                                        {qrColumn}
                                        <TableRowColumn>{date[0]} <br/> {date[1]}</TableRowColumn>
                                        <TableRowColumn>{totalHours}</TableRowColumn>
                                        <TableRowColumn>{totalRevenue}</TableRowColumn>
                                        <TableRowColumn>{this.state.onlinePurifiers.indexOf(item[0].mac) > -1 ? LangStrings.online : LangStrings.offline}</TableRowColumn>
                                        <TableRowColumn>
                                            <DropDownMenu value={this.state.value} onChange={this.actionMenuChange}>
                                                <MenuItem value={item[0].id + `:` + 0} primaryText={LangStrings.selectAction}/>
                                                <MenuItem value={item[0].id + `:` + 1} primaryText={LangStrings.detail}/>
                                                <MenuItem value={item[0].id + `:` + 2} primaryText={LangStrings.assignShopper}/>
                                                <MenuItem value={item[0].id + `:` + 3} primaryText={LangStrings.reset}/>
                                                <MenuItem value={item[0].id + `:` + 4} primaryText={LangStrings.remove}/>
                                                <MenuItem value={item[0].id + `:` + 5} primaryText={LangStrings.updateFirmware}/>
                                                <MenuItem value={item[0].id + `:` + 6} primaryText={LangStrings.log}/>
                                                <MenuItem value={item[0].id + `:` + 7} primaryText={LangStrings.edit}/>
                                            </DropDownMenu>
                                        </TableRowColumn>
                                    </TableRow>
                                );
                            }
                        )}
                    </TableBody>
                </Table>
                {/*<Pagination*/}
                    {/*total={this.state.pagination.total}*/}
                    {/*rowsPerPage={this.state.pagination.rowsPerPage}*/}
                    {/*page={this.state.pagination.page}*/}
                    {/*numberOfRows={this.state.pagination.numberOfRows}*/}
                    {/*updateRows={this.updateRows}*/}
                {/*/>*/}

                <Pagination
                    total = { this.state.pagination.total }
                    current = { this.state.pagination.page }
                    display = { this.state.pagination.display }
                    onChange = { number => this.updateRows(number) }
                />

                <Dialog
                    title="Warning"
                    actions={actionsRmv}
                    modal={false}
                    open={this.state.dialog.remove.open}
                    onRequestClose={this.closeDialog}
                >
                    Are you sure you want to remove this Purifier?

                </Dialog>

                <Dialog
                    title="Warning"
                    actions={actionsReset}
                    modal={false}
                    open={this.state.dialog.reset.open}
                    onRequestClose={this.closeDialog}
                >
                    Are you sure you want to reset this Purifier?
                </Dialog>

                <Dialog
                    title="Firmware Update"
                    actions={actionsFirmwareUpdate}
                    modal={false}
                    open={this.state.dialog.firmwareUpdate.open}
                    onRequestClose={this.closeDialog}
                >
                    The firmware update is running, after the end, your device will be rebooted
                </Dialog>

                <Dialog
                    title="Change Shopper ID"
                    actions={actionsAssignShopper}
                    modal={false}
                    open={this.state.dialog.assignShopper.open}
                    onRequestClose={this.closeDialog}
                >

                    <span>Please Assign Shopper to This Purifier</span>
                    <br/>
                    <TextField hintText="Input shopper ID" onChange={ this.changeShopperId}/>
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
