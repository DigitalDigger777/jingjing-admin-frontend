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
import SearchBar from 'material-ui-search-bar'

import Core from '../Core';
import axios from 'axios';
import Config from '../../../Config';

export default class TesterList extends React.Component {

    constructor(props){
        super(props);

        const config = new Config();
        this.state = {
            items: [],
            baseUrl: config.baseUrl
        };
    }

    componentDidMount() {
        axios.get(this.state.baseUrl + 'user/items', {
            params: {
                role: 'ROLE_TESTER'
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


    openFormTester(){
        window.location = '/admin/tester-form';
    }

    save(){
        axios.post();
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
                        <RaisedButton label="Add Tester" primary={true} onClick={this.openFormTester.bind(this)}/>
                    </ToolbarGroup>
                </Toolbar>

                <Table selectable={false}>
                    <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                        <TableRow>
                            <TableHeaderColumn>ID</TableHeaderColumn>
                            <TableHeaderColumn>Name</TableHeaderColumn>
                            <TableHeaderColumn>Pass code</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false} showRowHover={true}>
                        { this.state.items.map((item, key) =>
                            <TableRow  key={key} onClick={ id => this.openDetailShopper(item.id) }>
                                <TableRowColumn>{item.id}</TableRowColumn>
                                <TableRowColumn>{item.name}</TableRowColumn>
                                <TableRowColumn>{item.pin}</TableRowColumn>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </Core>
        );
    };
}