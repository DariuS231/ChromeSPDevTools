interface IKeyValue {
    key: string,
    value: any
}
interface KeyValueItemState {
    itemInputValue:string
}
interface KeyValueItemProps {
    itemKey: string,
    itemValue: string,
    onUpdateClick: any,
    onDeleteClick: any
}


interface NewKeyValueItemState {
    newKey: string,
    newValue: string
}
interface NewKeyValueItemProps {
    moduleTitle: string,
    keyDisplayName: string,
    valueDisplayName: string,
    onNewItemClick: any
}


interface SpCustomModalWrapperProps {
    modalDialogTitle:string

}
interface SpCustomModalWrapperState {
    isClosed: boolean
}

interface SpPropertyBagProps {

}
interface SpPropertyBagState {
    currentUserHasPermissions: boolean,
    isWorkingOnIt: boolean,
    noPermissionsMessage: string,
    webProperties: Array<IKeyValue>
}


interface WorkingOnItProps {

} interface WorkingOnItState{
    
}