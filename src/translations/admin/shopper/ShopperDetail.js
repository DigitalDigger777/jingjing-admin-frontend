/**
 * Created by korman on 14.04.18.
 */
import LocalizedStrings from 'react-localization';

const strings = new LocalizedStrings({
    en: {
        shopperName: 'Shopper Name',
        address: 'Address',
        contact: 'Contact',
        cell: 'Cell',
        contactPersonCellNumber: 'Contact Person Cell Number',
        shopperId: 'Shopper #',
        hourRate: 'Hour Rate',
        commission: 'Commission',
        hours: 'Hours',
        passcode: 'Passcode',
        change: 'Change'
    },
    zh: {
        shopperName: '商户名',
        address: '地址',
        contact: '联系人',
        cell: '手机',
        contactPersonCellNumber: '手机',
        shopperId: '商户编号',
        hourRate: '小时收费',
        commission: '分成比例',
        hours: '转换时间',
        passcode: '密码',
        change: '修改'
    },
    en_xin: {
        startTime: 'Start Time',
        endTime: 'End Time',
        totalHourUsed: 'Total Hour Used',
        rate: 'Rate',
        revenue: 'Revenue',
        paymentMethod: 'Payment Method',
        wechat: 'Wechat',
        alipay: 'Alipay',
        coupon: 'Coupon'
    },
    zh_xin: {
        startTime: '订单开始时间',
        endTime: '订单结束时间',
        totalHourUsed: '使用时长',
        rate: '小时收费',
        revenue: '此订单收入',
        paymentMethod: '支付方式',
        wechat: '微信支付',
        alipay: '支付宝',
        coupon: '体验券'
    }
});

export default strings;