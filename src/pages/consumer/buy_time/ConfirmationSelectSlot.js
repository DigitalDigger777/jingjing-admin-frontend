/**
 * Created by korman on 06.02.18.
 */
import React from 'react';

import {Page, Icon} from 'react-weui';

const IconBox = (props) => (
    <div className="icon-box">
        {props.icon}
        <div className="icon-box__ctn">
            <h3 className="icon-box__title">{props.title}</h3>
            <p className="icon-box__desc">{props.desc}</p>
        </div>
    </div>
);

export default class ConfirmationSelectSlot extends React.Component {

    constructor(props){
        super(props);

        this.state = {};
    }

    render() {
        return (
            <Page>
                <IconBox
                    icon={<Icon size="large" value="success"/>}
                    title="You can turn on Purifier"
                    desc="The expire time is 2018/01/22  22:17"/>
            </Page>
        );
    };
}