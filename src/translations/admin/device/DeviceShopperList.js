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
        name: 'Text1',
        countPurifiers: 'Text2',
        action: 'Text3',
        unassigned: 'Text6',
        purifiers: 'Text7',

        //Buttons
        list: 'Text4',

        //Inputs
        search: 'Text5'
    }
});

export default strings;