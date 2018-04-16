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
import LangStrings from '../../../translations/admin/shopper/ShopperList';

import Core from '../Core';
import axios from 'axios';
import Config from '../../../Config';

export default class DeviceShopperList extends React.Component {

    constructor(props){
        super(props);

        const config = new Config();
        LangStrings.setLanguage(config.language);

        this.state = {
            items: [],
            countUnassigned: 0,
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
    }

    openDetailShopper(id) {
        window.location = '/admin/shopper-detail/' + id;
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
                        <RaisedButton label={LangStrings.addShopper} primary={true} onClick={this.openFormShopper.bind(this)}/>
                    </ToolbarGroup>
                </Toolbar>

                <Table selectable={false}>
                    <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                        <TableRow>
                            <TableHeaderColumn>{LangStrings.id}</TableHeaderColumn>
                            <TableHeaderColumn>{LangStrings.name}</TableHeaderColumn>
                            <TableHeaderColumn>{LangStrings.countPurifiers}</TableHeaderColumn>
                            <TableHeaderColumn>{LangStrings.action}</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false} showRowHover={true}>
                        { this.state.items.map((item, key) =>
                            <TableRow  key={key} onClick={ id => this.openDetailShopper(item.id) }>
                                <TableRowColumn>{item.id}</TableRowColumn>
                                <TableRowColumn>{item.name}</TableRowColumn>
                                <TableRowColumn>{item.countDevices ? item.countDevices : 0}</TableRowColumn>
                                <TableRowColumn>
                                    <RaisedButton label={LangStrings.detail} primary={true} onClick={ id => this.openDetailShopper(item.id) }/>
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