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


    changeName(e, id) {
        console.log(id);
        axios.post(this.state.baseUrl + 'user/save', {
            id: id,
            pin: this.state.item.pin,
            role: 'ROLE_TESTER'
        })
            .then(response => {
                console.log(response);
            })
            .catch(response => {

            });
    }

    changePin(e, id) {
        axios.post(this.state.baseUrl + 'user/save', {
            id: id,
            name: this.state.item.name,
            role: 'ROLE_TESTER'
        })
            .then(response => {
                console.log(response);
            })
            .catch(response => {

            });
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
                                <TableRowColumn>
                                    {/*<span id={`textName` + item.id} style={{cursor:'pointer'}} onClick={(id, name) => this.editName(item.id, item.name)}>{item.name}</span>*/}
                                    <TextField id={`name` + item.id}
                                           type="text"
                                           defaultValue={item.name}
                                           onChange={(e, id) => this.changeName(e, id)} />
                                </TableRowColumn>
                                <TableRowColumn>
                                    {/*<span id={`textPin` + item.id} style={{cursor:'pointer'}} onClick={(id, name) => this.editPin(item.id, item.pin)}>{item.pin}</span>*/}
                                    <TextField id={`pin` + item.id}
                                               type="text"
                                               defaultValue={item.pin}
                                               onChange={(e, id) => this.changePin(e, id)} />
                                </TableRowColumn>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </Core>
        );
    };
}