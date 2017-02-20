import { MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';

export interface IFeature {
    id: any,
    name: any,
    description: any,
    activated: any,
    scope: any,
    logo: any
}


export interface IMessageData {
    showMessage: boolean,
    message: string,
    type: MessageBarType
}

export interface IAction<T> {
    readonly type: string
    readonly payload: T
}
