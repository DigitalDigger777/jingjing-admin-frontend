/**
 * Created by korman on 14.04.18.
 */
import LocalizedStrings from 'react-localization';

const strings = new LocalizedStrings({
    en: {
        shopperName: 'Shopper Name',
        address: 'Address',
        shopperAddress: 'Shopper Address',
        contact: 'Contact',
        contactPerson: 'Contact Person',
        cell: 'Cell',
        contactPersonCellNumber: 'Contact Person Cell Number',
        hourRate: 'Hour Rate',
        commissionRate: 'Commission Rate',
        hours: 'Hours',
        passcode: 'Passcode',
        add: 'Add',
        save: 'Save'
    },
    zh: {
        shopperName: '商户名',
        address: '地址',
        shopperAddress: 'Shopper Address',
        contact: '联系人',
        contactPerson: 'Contact Person',
        cell: '手机',
        contactPersonCellNumber: 'Contact Person Cell Number',
        hourRate: '小时收费',
        commissionRate: '分成比例',
        hours: '转换时间',
        passcode: 'Passcode',
        add: 'Add',
        save: '修改'
    }
});

export default strings;