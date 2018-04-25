/**
 * Created by korman on 14.04.18.
 */
import LocalizedStrings from 'react-localization';

const strings = new LocalizedStrings({
    en: {
        startTime: 'Start Time',
        endTime: 'End Time',
        totalHourUsed: 'Total Hour Used',
        rate: 'Rate',
        revenue: 'Revenue',
        paymentMethod: 'Payment Method'
    },
    zh: {
        startTime: '订单开始时间',
        endTime: '订单结束时间',
        totalHourUsed: '使用时长',
        rate: '小时收费',
        revenue: '此订单收入',
        paymentMethod: '支付方式'
    }
});

export default strings;