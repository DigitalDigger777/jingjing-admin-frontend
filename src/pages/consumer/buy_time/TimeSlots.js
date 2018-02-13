/**
 * Created by korman on 06.02.18.
 */
import React from 'react';
import {Grids, Cells, Cell, CellBody, CellHeader} from 'react-weui';
import Core from '../Core';
import axios from 'axios';
import Config from '../../../Config';
import Auth from '../Auth';

import injectSheet from 'react-jss';

const styles  = {
    grid: {
        paddingTop: '50px',
        paddingBottom: '50px',
        border: '2px solid #b3d9ff',
        borderRadius: '5px'
    },
    page: {
        backgroundColor: '#EEE',
        paddingBottom: '100px'
    }
};



@injectSheet(styles)


export default class TimeSlots extends React.Component {

    constructor(props){
        super(props);
        const data = [
            {label: '￥3 1小时', style: styles.grid},
            {label: '￥6 2小时', style: styles.grid},
            {label: '￥9 3小时', style: styles.grid},
            {label: '￥12 4小时', style: styles.grid},
            {label: '￥15 5小时', style: styles.grid},
            {label: '￥18 6小时', style: styles.grid},
            {label: '￥21 7小时', style: styles.grid},
            {label: '￥24 8小时', style: styles.grid},
            {label: '￥27 9小时', style: styles.grid},
            {label: '￥30 10小时', style: styles.grid},
            {label: '￥33 11小时', style: styles.grid},
            {label: '￥36 12小时', style: styles.grid}
        ];

        const config = new Config();

        this.state = {
            deviceId: typeof props.match.params.deviceId != 'undefined' ? props.match.params.deviceId : 0,
            data: data,
            item: {
                shopperId: 0,
                shopperName: '',
                room: 0
            },
            baseUrl: config.baseUrl
        };
    }

    componentWillMount(){
        if (this.state.deviceId != 0) {
            axios.get(this.state.baseUrl + 'device/load/' + this.state.deviceId)
                .then(response => {
                    console.log(response);
                    this.setState({
                        item: response.data
                    });
                })
                .catch(response => {
                    console.log(response);
                });
        }
    }

    render() {
        const {classes, children} = this.props;

        return (
            <Core>
                <Cells>
                    <Cell>
                        <CellBody style={{textAlign: 'center'}}>
                            <p style={{fontWeight: 'bold'}}>请选择需要的时间</p>
                            <p>{this.state.item.shopperName}</p>
                            <p>Room: {this.state.item.room}</p>
                            <p>￥3 一小时</p>
                        </CellBody>
                    </Cell>
                </Cells>
                <Grids className={classes.page} data={this.state.data}/>
            </Core>
        );
    };
}