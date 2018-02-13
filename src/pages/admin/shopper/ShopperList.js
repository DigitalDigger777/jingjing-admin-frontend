/**
 * Created by korman on 07.02.18.
 */
import React from 'react';
import {Page,
    Cells,
    CellsTitle,
    Cell,
    CellHeader,
    CellBody,
    CellFooter,
    Form,
    FormCell,
    Input,
    Button,
    SearchBar
} from 'react-weui';
import Core from '../Core';
import axios from 'axios';
import Config from '../../../Config';

export default class ShopperList extends React.Component {

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
                <SearchBar
                    onChange={this.changeSearch.bind(this)}
                    defaultValue={this.state.searchText}
                    placeholder="Shopper Name or # Search"
                    lang={{
                        cancel: 'Cancel'
                    }}
                />
                <Cells>
                    <Cell>
                        <CellBody>
                            <Button type="primary" plain onClick={() => this.openFormShopper() }>Add Shopper</Button>
                        </CellBody>
                    </Cell>
                    { this.state.items.map((item, key) =>
                        <Cell key={key} access onClick={ id => this.openDetailShopper(item.id) }>
                            <CellBody>{item.name}</CellBody>
                            <CellFooter/>
                        </Cell>
                    )}

                </Cells>
            </Core>
        );
    };
}