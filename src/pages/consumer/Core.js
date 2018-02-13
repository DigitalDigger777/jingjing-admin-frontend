/**
 * Created by korman on 11.02.18.
 */
import React from 'react';
import {Page} from 'react-weui';
import injectSheet from 'react-jss';

const styles  = {
    weuiTabbarLabelFont: {
        fontSize: '20px'
    }
};

@injectSheet(styles)

export default class Core extends React.Component {

    constructor(props){
        super(props);
        const location = window.location.pathname;

        this.state = {
            menuItems: {
                buyTime:    '',
                buyHistory: ''
            }
        };

        switch (location)
        {
            case '/consumer/buy-history':
                    this.state.menuItems.buyHistory = 'weui-bar__item_on';
                break;
            case '/consumer/buy-time-slots':
                    this.state.menuItems.buyTime = 'weui-bar__item_on';
                break;
        }
    }

    openBuyTime() {
        window.location = '/consumer/buy-time-slots';
    }

    openBuyHistory() {
        window.location = '/consumer/buy-history';
    }

    render(){
        const {classes, children} = this.props;
        // weui-bar__item_on

        return(
            <Page>
                {this.props.children}
                <div className="weui-tabbar" style={{padding: '15px', position: 'fixed'}}>
                    <div className={['weui-tabbar__item', this.state.menuItems.buyTime].join(' ')} onClick={this.openBuyTime.bind(this)}>
                        {/*<div className="weui-tabbar__icon">*/}
                        {/*<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAYAAACohjseAAAAAXNSR0IArs4c6QAABIpJREFUaAXtWk9IVEEYn2/LSomIiAJDMLU6GWkQ/TtoGQSdDDL04iYdulqXDhF76FBQdO0Q/iFIMqhLQaCmh0oI0sgumlYQGkVERGilven7vX2zvre7rr6debgub2D3zXvzfd/8fvPNm/m+4QkRlnAEcnoEKB26A60vCr/9mD4qhagUUq5NJ5Mzz4j+MImRzRuL+gZvHpxJxpVCcNfZ3t2zs+K+EHJnsnBu39NYQYE4NXq77o0bp4cgPPfl+/RrkCNBw+zBJxGSf90KuVa3JK1hEselkFVC0NjWTUV73J5c7QaMaanIlWxftW8gVjvnbs/Vek2s//KnD/9egmScg3iksEZUBVf7nYtfn6wUcsANrJhtqCsOqKN4CKoFJdenZRy69z+BOWlR9BL06uTFXUhwpbsx9GDowRwfgbyfop5IJghnSClpR8vTKkuIXWTJYvQhIzTFIzv6ru3IMBHx3hxcCYxg+bnnW+TM74sV0b4GDqG2gUKCiSUFExbcNlnW3NdNheuuTtw69DUImoFM0fLm3gtiZmZCCKvVJkf0kQPiLorQDfvHdcHP4sStVsjaOgEwNOrBmmj/uk9yro2BNwIrZyQPmdCV8fajQ+mwV5zpq5aWvMTy9dx+vby5Z28JrW4Z6Kj9nU4+m2dGCcbJiUb21k+ejk0TnXWPM4FyiJ8sa+45wTp3WaeRbUClKZOenzZjUxRTDABtciQOv+88lpGcGyRkJes4A9NocroaIYgFhQHHABqee99xbAR1PwU60HV0Yo5NPybSyhohiNWS36P1eOf8eC4ZEXRhA7ZgM7k9m3ttgtjniKzT6BwLSjYg3DrKBgnZANvutmzq2gQrov3VUopiLPsLrZZ+gNk2nC0Etv3oppPVJigj8dM3knIwXQfZPFO2lO1sbCgdbYIq/BIcfimj2lfHVsK2hkFtghp9L6pK/CIuKrSIgDZBBM52H04gvUh/S2uWwo5dLaLPS1NYWEqbIFk0BvO8lh5YuBt/Ley2/dBgcKP+NFOltQmOd9QO8VSa4iPHUsSWqV34e2LbYFu8H04infKnnSqtTRD5nJSRezCNwDm1C39PlA0pqNtErqhNEPCLCuQ1HvFfyAoQOPujNC8NXdiALeSI8y3Z14wQfHu77gtDiAEGsoKyaE8l6n4KdKDr6MRMJcBGCAIUp0Y3GGAXLxAb+BDimR9P2ukS69i6bAO2/AxOJlljBNEJklVFkm8fcdrzINPCgzbIQFaRgw3YMlWMJrxOJt7EoF8xwBjeJ1406suivR/t8Mu1Z2JbsSyrFETwzkEenuNzDqPFKEGFDEA5n7sjOOVBpsHLbCl7qFTwYVOicISO7cVegQM8dAqEIEg4i8R5JnfBzjg4KFexJaIfBAjj7dhDV+ixofKUQwBTFj9PoU7PbSA3RheZQBBqGg0Jag7gsquHHlx2F2gCCD2oOYDLru71IH/YBkT4PGrZkfkEkMDscFDqHoIcKNtH7nw9zp9HBRblqM5NXYEVmGFPcVC2+X6+5OPHeB6CoJrXn1MqX+bTB7GKU3gNRyBHR+A/KFjbvWAqMXEAAAAASUVORK5CYII="/>*/}
                        {/*</div>*/}
                        <p className={["weui-tabbar__label", classes.weuiTabbarLabelFont].join(' ')}>Buy Time</p>
                    </div>
                    <div className={['weui-tabbar__item', this.state.menuItems.buyHistory].join(' ')} onClick={this.openBuyHistory.bind(this)}>
                        {/*<div className="weui-tabbar__icon">*/}
                        {/*<img src="data:image/png;base64,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"/>*/}
                        {/*</div>*/}
                        <p className={["weui-tabbar__label", classes.weuiTabbarLabelFont].join(' ')}>Buy History</p>
                    </div>
                </div>
            </Page>
        );
    }
}