export const SpSiteContentConstants = {
    selectFields: [
        'RootFolder',
        'Title',
        'Id',
        'Hidden',
        'ItemCount',
        'Created',
        'ImageUrl',
        'LastItemModifiedDate',
        'Description',
        'ParentWebUrl',
        'DefaultNewFormUrl'
    ],
    itemImageWidth:25,
    itemImageHeight:25,
    settingsRelativeUrl: '/_layouts/15/listedit.aspx?List=',
    permissionsPageUrlOpen: '/_layouts/15/user.aspx?obj=%7B',
    permissionsPageUrlMiddle: '%7D,list&List=%7B',
    permissionsPageUrlClose: '%7D',
    changeEvent: 'spSiteContentStorechange',
    getContentErrorMessage: 'Failed to get web lists',
    showingAllItemsMessage: 'Showing all lists and libraries.',
    showingHiddenItemsMessage: 'Showing only hidden lists and libraries.',
    OpenInNewTab: 'List and libraries links will open in a new tab.',
    NoOpenInNewTab: 'List and libraries links will open in the current tab.'
}