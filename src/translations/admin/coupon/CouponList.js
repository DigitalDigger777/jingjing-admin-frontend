/**
 * Created by korman on 14.04.18.
 */
import LocalizedStrings from 'react-localization';

const strings = new LocalizedStrings({
    en: {
        code: 'code',
        expiredDate: 'Expired Date',
        status: 'status',
        redeemedDate: 'Redeemed Time',
        addCoupon: 'Add Coupon',
        redeemed: 'Redeemed',
        issued: 'Issued',
        available: 'Available',
        expired: 'Expired',
        shopperName: 'Shopper Name'

    },
    zh: {
        code: '体验券号码',
        expiredDate: '体验券过期日期',
        status: '状态',
        redeemedDate: '使用时间',
        addCoupon: '添加体验券',
        redeemed: '已使用',
        issued: '已生成',
        available: '可用',
        expired: '过期',
        shopperName: '商户名'
    }
});


export default strings;