/**
 * Created by korman on 14.04.18.
 */
import LocalizedStrings from 'react-localization';

const strings = new LocalizedStrings({
    en: {
        shopperName: 'Shopper Name',
        Address: 'Address',
        Contact: 'Contact',
        Cell: 'Cell',
        contactPersonCellNumber: 'Contact Person Cell Number',
        ShopperId: 'Shopper #',
        hourRate: 'Hour Rate',
        commission: 'Commission',
        hours: 'Hours',
        passcode: 'Passcode',
        change: 'Change'
    },
    zh: {
        shopperName: '商户名',
        Address: '地址',
        Contact: '联系人',
        Cell: '手机',
        contactPersonCellNumber: '手机',
        ShopperId: '商户编号',
        hourRate: '小时收费',
        commission: '分成比例',
        hours: '转换时间',
        passcode: 'Passcode',
        change: '修改'
    }
});

export default strings;