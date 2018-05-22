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
import LangStrings from '../../../translations/admin/tester/TesterList';

import Core from '../Core';
import axios from 'axios';
import Config from '../../../Config';

export default class TesterList extends React.Component {

    constructor(props){
        super(props);

        const config = new Config();
        LangStrings.setLanguage(config.language);
        const user = JSON.parse(window.localStorage.getItem('user'));

        this.state = {
            items: [],
            user: user,
            baseUrl: config.baseUrl
        };
    }

    componentDidMount() {
        axios.get(this.state.baseUrl + 'user/items', {
            params: {
                token: this.state.user.token,
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

    }


    changeName(e, name, id) {
        console.log(id);

        setTimeout(() => {
            axios.post(this.state.baseUrl + 'user/save', {
                id: id,
                name: name,
                token: this.state.user.token,
                role: 'ROLE_TESTER'
            })
                .then(response => {
                    console.log(response);
                })
                .catch(response => {

                });
        }, 2000);


    }

    changePin(e, pin, id) {
        console.log(e);
        setTimeout(() => {
            axios.post(this.state.baseUrl + 'user/save', {
                id: id,
                pin: pin,
                token: this.state.user.token,
                role: 'ROLE_TESTER'
            })
                .then(response => {
                    console.log(response);
                })
                .catch(response => {

                });
        }, 2000);
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
                        <RaisedButton label={LangStrings.addTester} primary={true} onClick={this.openFormTester.bind(this)}/>
                    </ToolbarGroup>
                </Toolbar>

                <Table selectable={false}>
                    <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                        <TableRow>
                            <TableHeaderColumn>{LangStrings.id}</TableHeaderColumn>
                            <TableHeaderColumn>{LangStrings.name}</TableHeaderColumn>
                            <TableHeaderColumn>{LangStrings.passCode}</TableHeaderColumn>
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
                                           onChange={(e, name, id) => this.changeName(e, name, item.id)} />
                                </TableRowColumn>
                                <TableRowColumn>
                                    {/*<span id={`textPin` + item.id} style={{cursor:'pointer'}} onClick={(id, name) => this.editPin(item.id, item.pin)}>{item.pin}</span>*/}
                                    <TextField id={`pin` + item.id}
                                               type="text"
                                               defaultValue={item.pin}
                                               onChange={(e, pin, id) => this.changePin(e, pin, item.id)} />
                                </TableRowColumn>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </Core>
        );
    };
}