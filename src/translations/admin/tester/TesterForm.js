/**
 * Created by korman on 14.04.18.
 */
import LocalizedStrings from 'react-localization';

const strings = new LocalizedStrings({
    en: {
        testerName: 'Tester Name',
        passcode: 'Passcode',
        cell: 'Cell',
        add: 'Add',
        save: 'Save',
        accessToTesterList: 'Access To Tester List',

    },
    zh: {
        testerName: '测试员姓名',
        passcode: '密码',
        cell: '手机',
        add: '添加测试员',
        save: '保存',
        accessToTesterList: '测试员列表',
    }
});

export default strings;