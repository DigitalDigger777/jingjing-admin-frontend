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
        hours: 'Hours',
        paymentMethod: 'Payment Method',
        wechat: 'Wechat',
        alipay: 'Alipay',
        coupon: 'Coupon'
    },
    zh: {
        income: '此订单收入',
        time: '订单订购时间',
        shopperName: '商户名',
        purifierID: '空气净化器编号',
        rate: '小时收费',
        hours: '使用时长',
        paymentMethod: '支付方式',
        wechat: '微信支付',
        alipay: '支付宝',
        coupon: '体验券'
    }
});

export default strings;