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
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import SearchBar from 'material-ui-search-bar'

import axios from 'axios';
import Config from '../../../Config';
import Core from '../Core';

export default class DeviceList extends React.Component {

    constructor(props){
        super(props);
        const config = new Config();

        this.state = {
            items: [],
            baseUrl: config.baseUrl
        };
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

    changeSearch(){

    }

    render() {
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
                            <TableHeaderColumn>Name</TableHeaderColumn>
                            <TableHeaderColumn>Room</TableHeaderColumn>
                            <TableHeaderColumn>Action</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false} showRowHover={true}>
                        { this.state.items.map((item, key) =>
                            <TableRow  key={key} onClick={ id => this.openDetailShopper(item.id) }>
                                <TableRowColumn>{item.id}</TableRowColumn>
                                <TableRowColumn>{item.name}</TableRowColumn>
                                <TableRowColumn>{item.room}</TableRowColumn>
                                <TableRowColumn>
                                    <RaisedButton label="Change" primary={true} onClick={ id => this.openDeviceDetail(item.id) }/>
                                </TableRowColumn>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
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
