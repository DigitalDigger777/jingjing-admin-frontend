/**
 * Created by korman on 07.02.18.
 */
import React from 'react';
import injectSheet from 'react-jss';

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
import LangStrings from '../../../translations/admin/device/DeviceLog';

import axios from 'axios';
import Core from '../Core';
import Config from '../../../Config';

const styles = {
    page: {
        backgroundColor: '#EEE',
        paddingBottom: '100px'
    }
};

@injectSheet(styles)

export default class DeviceLogList extends React.Component {

    constructor(props){
        super(props);
        const config = new Config();

        this.state = {
            items: [],
            deviceId: props.match.params.deviceId,
            shopperId: props.match.params.shopperId,
            baseUrl: config.baseUrl
        };
    }

    componentWillMount(){
        axios.get(this.state.baseUrl + 'device-activity-log/items', {
            params: {
                deviceId: this.state.deviceId,
                shopperId: this.state.shopperId
            }
        })
            .then(response => {
                this.setState({
                    items: response.data
                });
            })
            .catch(response => {

            });
    }

    changeSearch(){

    }

    render() {
        const {classes, children} = this.props;

        return (
            <Core>
                <Toolbar style={{marginTop: '15px', paddingTop: '15px', paddingBottom: '15px'}}>
                    <ToolbarGroup>
                        <h4></h4>
                    </ToolbarGroup>
                </Toolbar>
                <Table selectable={false}>
                    <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                        <TableRow>
                            <TableHeaderColumn>{LangStrings.action}</TableHeaderColumn>
                            <TableHeaderColumn>{LangStrings.date}</TableHeaderColumn>
                            <TableHeaderColumn></TableHeaderColumn>
                            {/*<TableHeaderColumn>Revenue</TableHeaderColumn>*/}
                            {/*<TableHeaderColumn>Paid</TableHeaderColumn>*/}
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false} showRowHover={true}>
                        { this.state.items.map((item, key) => {

                                let action = '';

                                switch (item[0].action) {
                                    case 0:
                                        action = LangStrings.online;
                                        break;
                                    case 1:
                                        action = LangStrings.offline;
                                        break;
                                }

                                return (
                                    <TableRow key={key}>
                                        <TableRowColumn>{action}</TableRowColumn>
                                        <TableRowColumn>{item.date}</TableRowColumn>
                                        <TableRowColumn>{item[0].minutes}</TableRowColumn>
                                    </TableRow>
                                )
                            }
                        )}
                    </TableBody>
                </Table>
            </Core>
        );
    };
}