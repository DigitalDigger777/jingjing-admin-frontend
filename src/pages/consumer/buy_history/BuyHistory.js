/**
 * Created by korman on 06.02.18.
 */
import React from 'react';
import {Page,
    Panel,
    PanelHeader,
    PanelBody,
    Flex,
    FlexItem,
    Cells,
    Cell,
    CellBody
} from 'react-weui';
import Core from '../Core';
import axios from 'axios';
import Config from '../../../Config';
import Auth from '../Auth';


export default class BuyHistory extends React.Component {

    constructor(props){
        super(props);
        const auth = new Auth();
        auth.checkAuth();

        const config = new Config();
        const user = JSON.parse(window.localStorage.getItem('user'));

        this.state = {
            consumerId: user.id,
            items: [],
            baseUrl: config.baseUrl
        };
    }

    componentWillMount(){
        axios.get(this.state.baseUrl + 'statement/items', {
            params: {
                consumerId: this.state.consumerId
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

    render() {
        return (
            <Core>
                <Panel>

                    <PanelBody>
                        {this.state.items.map((item, key) => {
                            return(
                                <Cells key={key}>
                                    <Cell>
                                        <CellBody>
                                            Paid ¥{item[0].amount}
                                        </CellBody>
                                    </Cell>
                                    <Cell>
                                        <CellBody>
                                            <Flex>
                                                <FlexItem>
                                                    <div>Time: {item.date}</div>
                                                </FlexItem>
                                            </Flex>
                                            <Flex>
                                                <FlexItem>
                                                    <div>Hours: {item[0].hours}</div>
                                                </FlexItem>
                                            </Flex>
                                            <Flex>
                                                <FlexItem>
                                                    <div>Rate: ¥{item[0].rate} per hour</div>
                                                </FlexItem>
                                            </Flex>
                                            <Flex>
                                                <FlexItem>
                                                    <div>Shoppe: {item.name}</div>
                                                </FlexItem>
                                            </Flex>
                                            <Flex>
                                                <FlexItem>
                                                    <div>Room #: {item[0].room}</div>
                                                </FlexItem>
                                            </Flex>
                                        </CellBody>
                                    </Cell>
                                </Cells>
                            )
                        })}
                    </PanelBody>
                </Panel>
            </Core>
        );
    };
}