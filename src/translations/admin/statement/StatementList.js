/**
 * Created by korman on 14.04.18.
 */
import LocalizedStrings from 'react-localization';

const strings = new LocalizedStrings({
    en: {
        income: 'Income',
        time: 'Time',
        shopperName: 'Shopper Name',
        purifierID: 'Purifier ID',
        rate: 'Rate',
        hours: 'Hours'
    },
    zh: {
        income: '此订单收入',
        time: '订单订购时间',
        shopperName: '商户名',
        purifierID: '空气净化器编号',
        rate: '小时收费',
        hours: '使用时长'
    }
});

export default strings;