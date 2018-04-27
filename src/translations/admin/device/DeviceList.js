/**
 * Created by korman on 14.04.18.
 */
import LocalizedStrings from 'react-localization';

const strings = new LocalizedStrings({
    en: {
        //header for table
        id: 'id',
        qrCode: 'QR Code',
        addTime: 'Add Time',
        totalHourUsed: 'Total Hour Used',
        totalRevenue: 'Total Revenue',
        action: 'Action',

        //context menu
        selectAction: 'Select Action',
        detail: 'Detail',
        assignShopper: 'Assign Shopper',
        reset: 'Reset',
        remove: 'Remove',

        status: 'Status',
        online: 'Online',
        offline: 'Offline',
        //Other
        download: 'Download'
    },
    zh: {
        //header for table
        id: '空气净化器编号',
        qrCode: '二维码',
        addTime: '添加时间',
        totalHourUsed: '总使用时间',
        totalRevenue: '总收入',
        action: '操作',

        //context menu
        selectAction: '选择操作',
        detail: '详情',
        assignShopper: '分配商户',
        reset: '重置控制器',
        remove: '删除控制器',

        status: '状态',
        online: '在线',
        offline: '离线',
        //Other
        download: 'Download'
    }
});

export default strings;