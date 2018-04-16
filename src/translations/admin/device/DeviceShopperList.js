/**
 * Created by korman on 14.04.18.
 */
import LocalizedStrings from 'react-localization';

const strings = new LocalizedStrings({
    en: {
        //table
        name: 'Name',
        countPurifiers: 'Count Purifiers',
        action: 'Action',
        unassigned: 'Unassigned',
        purifiers: 'Purifiers',

        //Buttons
        list: 'Detail',

        //Inputs
        search: 'Search'
    },
    zh: {
        //table
        name: '商户名',
        countPurifiers: '空气净化器数',
        action: '操作',
        unassigned: '未分配',
        purifiers: '空气净化器',

        //Buttons
        list: '详情',
        detail: '详情',

        //Inputs
        search: 'Search'
    }
});

export default strings;