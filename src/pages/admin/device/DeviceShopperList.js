/**
 * Created by korman on 07.02.18.
 */
import React from 'react';

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
import SearchBar from 'material-ui-search-bar';
import LangStrings from '../../../translations/admin/device/DeviceShopperList';

import Core from '../Core';
import axios from 'axios';
import Config from '../../../Config';

export default class ShopperList extends React.Component {

    constructor(props){
        super(props);

        const config = new Config();
        LangStrings.setLanguage(config.language);

        this.state = {
            items: [],
            countUnassigned: 0,
            onlinePurifiers: [],
            baseUrl: config.baseUrl
        };
    }

    componentDidMount() {
        axios.get(this.state.baseUrl + 'user/items', {
            params: {
                role: 'ROLE_SHOPPER'
            }
        })
            .then(response => {
                console.log(response.data);
                this.setState({
                    items: response.data
                });
            })
            .catch(response => {
                console.log('error');
            });

        axios.get(this.state.baseUrl + 'device/total-items', {
            params: {
                shopperId: 0
            }
        })
            .then(response => {
                this.setState({
                    countUnassigned: response.data.cnt
                });
            });


        axios.get(this.state.baseUrl + 'device/redis-count-online')
            .then(response => {
                this.setState({
                    onlinePurifiers: response.data.data
                });
            });
    }

    openDetailShopper(id) {
        window.location = '/admin/device-list/' + id;
    }

    openFormShopper(){
        window.location = '/admin/shopper-form';
    }

    save(){
        axios.post();
    }

    changeSearch(){

    }

    render() {
        return (
            <Core>
                {/*<SearchBar*/}
                    {/*onChange={this.changeSearch.bind(this)}*/}
                    {/*defaultValue={this.state.searchText}*/}
                    {/*placeholder="Shopper Name or # Search"*/}
                    {/*lang={{*/}
                        {/*cancel: 'Cancel'*/}
                    {/*}}*/}
                {/*/>*/}
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
                        {/*<RaisedButton label="Add Shopper" primary={true} onClick={this.openFormShopper.bind(this)}/>*/}
                    </ToolbarGroup>
                </Toolbar>

                <Table selectable={false}>
                    <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                        <TableRow>
                            <TableHeaderColumn style={{width: '10%'}}>{LangStrings.shopperId}</TableHeaderColumn>
                            <TableHeaderColumn style={{width: '40%'}}>{LangStrings.name}</TableHeaderColumn>
                            <TableHeaderColumn>{LangStrings.countPurifiers}</TableHeaderColumn>
                            <TableHeaderColumn>{LangStrings.onlineMachine}</TableHeaderColumn>
                            <TableHeaderColumn>{LangStrings.action}</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false} showRowHover={true}>
                        <TableRow  onClick={ id => this.openDetailShopper(0) }>
                            <TableRowColumn style={{width: '10%'}}>-</TableRowColumn>
                            <TableRowColumn style={{width: '40%'}}>{LangStrings.unassigned}</TableRowColumn>
                            <TableRowColumn>{this.state.countUnassigned}</TableRowColumn>
                            <TableHeaderColumn>-</TableHeaderColumn>
                            <TableRowColumn>
                                <RaisedButton label={LangStrings.detail} primary={true} onClick={ id => this.openDetailShopper(0) }/>
                            </TableRowColumn>
                        </TableRow>
                        { this.state.items.map((item, key) =>
                            <TableRow  key={key} onClick={ id => this.openDetailShopper(item.id) }>
                                <TableRowColumn style={{width: '10%'}}>{item.id}</TableRowColumn>
                                <TableRowColumn style={{width: '40%'}}>{item.name}</TableRowColumn>
                                <TableRowColumn>{item.countDevices ? item.countDevices : 0}</TableRowColumn>
                                <TableHeaderColumn>{this.state.onlinePurifiers[item.id]}</TableHeaderColumn>
                                <TableRowColumn>
                                    <RaisedButton label={LangStrings.list} primary={true} onClick={ id => this.openDetailShopper(item.id) }/>
                                </TableRowColumn>
                            </TableRow>
                        )}
                    </TableBody>
                    {/*<Cell>*/}
                        {/*<CellBody>*/}
                            {/*<Button type="primary" plain onClick={() => this.openFormShopper() }>Add Shopper</Button>*/}
                        {/*</CellBody>*/}
                    {/*</Cell>*/}
                    {/*{ this.state.items.map((item, key) =>*/}
                        {/*<Cell key={key} access onClick={ id => this.openDetailShopper(item.id) }>*/}
                            {/*<CellBody>{item.name}</CellBody>*/}
                            {/*<CellFooter/>*/}
                        {/*</Cell>*/}
                    {/*)}*/}

                </Table>
            </Core>
        );
    };
}