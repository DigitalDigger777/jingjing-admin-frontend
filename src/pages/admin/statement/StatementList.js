/**
 * Created by korman on 07.02.18.
 */
import React from 'react';
import injectSheet from 'react-jss';
import Core from '../Core';

import {Page,
    Panel,
    PanelHeader,
    PanelBody,


    SearchBar,
    Preview, PreviewHeader, PreviewFooter, PreviewBody, PreviewItem
} from 'react-weui';
import axios from 'axios';
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
                <SearchBar
                    onChange={this.changeSearch.bind(this)}
                    defaultValue={this.state.searchText}
                    placeholder="Statement Search"
                    lang={{
                        cancel: 'Cancel'
                    }}
                />
                <Panel className={classes.page}>

                    <PanelBody>
                        {this.state.items.map((item, key) => {
                            return (
                                <Preview key={key} style={{marginBottom: '20px'}}>
                                    <PreviewHeader>
                                        <PreviewItem label="Income" value={`¥` + item[0].amount}/>
                                    </PreviewHeader>
                                    <PreviewBody>
                                        <PreviewItem label="Time" value={item.date}/>
                                        <PreviewItem label="Hours" value={item[0].hours.toString()}/>
                                        <PreviewItem label="Rate" value={`¥` + item[0].rate + ` per hour`}/>
                                        <PreviewItem label="Room #" value={item[0].room.toString()}/>
                                    </PreviewBody>
                                    <PreviewFooter/>
                                </Preview>
                            );
                        })}
                    </PanelBody>
                </Panel>
            </Core>
        );
    };
}