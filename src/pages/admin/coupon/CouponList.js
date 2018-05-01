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
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import SearchBar from 'material-ui-search-bar';
import LangStrings from '../../../translations/admin/coupon/CouponList';

import Core from '../Core';
import axios from 'axios';
import Config from '../../../Config';

export default class CouponList extends React.Component {

    constructor(props){
        super(props);

        const config = new Config();
        LangStrings.setLanguage(config.language);

        this.state = {
            items: [],
            baseUrl: config.baseUrl
        };
    }

    componentDidMount() {
        axios.get(this.state.baseUrl + 'coupon/items', {
            params: {
                shopperId: 151
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


    openForm(){
        window.location = '/admin/coupon-form';
    }

    render() {
        return (
            <Core>
                <Toolbar style={{marginTop: '15px', paddingTop: '15px', paddingBottom: '15px'}}>
                    <ToolbarGroup>
                        <RaisedButton label={LangStrings.addCoupon} primary={true} onClick={this.openForm.bind(this)}/>
                    </ToolbarGroup>
                </Toolbar>

                <Table selectable={false}>
                    <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                        <TableRow>
                            <TableHeaderColumn>{LangStrings.code}</TableHeaderColumn>
                            <TableHeaderColumn>{LangStrings.expiredDate}</TableHeaderColumn>
                            <TableHeaderColumn>{LangStrings.status}</TableHeaderColumn>
                            <TableHeaderColumn>{LangStrings.redeemedDate}</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false} showRowHover={true}>
                        { this.state.items.map((item, key) =>
                            <TableRow  key={key} onClick={ id => this.openDetailShopper(item.id) }>
                                <TableRowColumn>{item[0].code}</TableRowColumn>
                                <TableRowColumn>{item.expiredDate}</TableRowColumn>
                                <TableRowColumn>{item[0].status}</TableRowColumn>
                                <TableRowColumn>{item.redeemedDate}</TableRowColumn>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </Core>
        );
    };
}