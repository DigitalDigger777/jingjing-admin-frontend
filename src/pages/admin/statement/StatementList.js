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
import SearchBar from 'material-ui-search-bar';
import LangStrings from '../../../translations/admin/statement/StatementList';

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

export default class StatementList extends React.Component {

    constructor(props){
        super(props);
        const config = new Config();
        LangStrings.setLanguage(config.language);

        this.state = {
            items: [],
            baseUrl: config.baseUrl
        };
    }

    componentWillMount(){
        axios.get(this.state.baseUrl + 'statement/items')
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
                        <SearchBar
                            onChange={() => console.log('onChange')}
                            onRequestSearch={() => console.log('onRequestSearch')}
                            style={{
                                margin: '0 auto',
                                maxWidth: 800
                            }}
                        />
                    </ToolbarGroup>
                </Toolbar>
                <Table selectable={false}>
                    <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                        <TableRow>
                            <TableHeaderColumn>{LangStrings.income}</TableHeaderColumn>
                            <TableHeaderColumn>{LangStrings.time}</TableHeaderColumn>
                            <TableHeaderColumn>{LangStrings.shopperName}</TableHeaderColumn>
                            <TableHeaderColumn>{LangStrings.purifierID}</TableHeaderColumn>
                            <TableHeaderColumn>{LangStrings.rate}</TableHeaderColumn>
                            <TableHeaderColumn>{LangStrings.hours}</TableHeaderColumn>
                            <TableHeaderColumn>{LangStrings.paymentMethod}</TableHeaderColumn>
                            {/*<TableHeaderColumn>Revenue</TableHeaderColumn>*/}
                            {/*<TableHeaderColumn>Paid</TableHeaderColumn>*/}
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false} showRowHover={true}>
                        { this.state.items.map((item, key) => {
                                const date = item.date.split(' ');
                                const paymentSystem = item[0].paymentSystem ? item[0].paymentSystem : 0;
                                let paymentSystemString = '';

                                switch (parseInt(paymentSystem))
                                {
                                    case 0:
                                            paymentSystemString = 'N/A';
                                        break;
                                    case 1:
                                            paymentSystemString = LangStrings.wechat;
                                        break;
                                    case 2:
                                            paymentSystemString = LangStrings.alipay;
                                        break;
                                }

                                return (
                                    <TableRow key={key} onClick={ id => this.openDetailShopper(item.id) }>
                                        <TableRowColumn>{`¥` + item[0].amount}</TableRowColumn>
                                        <TableRowColumn>{date[0]} <br/> {date[1]}</TableRowColumn>
                                        <TableRowColumn style={{ whiteSpace: 'pre-line'}}>{item.name}</TableRowColumn>
                                        <TableRowColumn>{item[0].device.deviceCode}</TableRowColumn>
                                        <TableRowColumn>{`¥` + item[0].rate}</TableRowColumn>
                                        <TableRowColumn>{item[0].hours}</TableRowColumn>
                                        <TableRowColumn>{paymentSystemString }</TableRowColumn>
                                        {/*<TableRowColumn>/!*revenue*!/</TableRowColumn>*/}
                                        {/*<TableRowColumn>/!*paid*!/</TableRowColumn>*/}
                                    </TableRow>
                                )
                            }
                        )}
                    </TableBody>
                </Table>

                {/*<Panel className={classes.page}>*/}

                    {/*<PanelBody>*/}
                        {/*{this.state.items.map((item, key) => {*/}
                            {/*return (*/}
                                {/*<Preview key={key} style={{marginBottom: '20px'}}>*/}
                                    {/*<PreviewHeader>*/}
                                        {/*<PreviewItem label="Income" value={`¥` + item[0].amount}/>*/}
                                    {/*</PreviewHeader>*/}
                                    {/*<PreviewBody>*/}
                                        {/*<PreviewItem label="Time" value={item.date}/>*/}
                                        {/*<PreviewItem label="Hours" value={item[0].hours.toString()}/>*/}
                                        {/*<PreviewItem label="Rate" value={`¥` + item[0].rate + ` per hour`}/>*/}
                                        {/*<PreviewItem label="Room #" value={item[0].room.toString()}/>*/}
                                    {/*</PreviewBody>*/}
                                    {/*<PreviewFooter/>*/}
                                {/*</Preview>*/}
                            {/*);*/}
                        {/*})}*/}
                    {/*</PanelBody>*/}
                {/*</Panel>*/}
            </Core>
        );
    };
}