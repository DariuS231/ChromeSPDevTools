import { MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';

export interface ICustomAction {
    name: any,
    description: any,
    id: any,
    title: any,
    registrationType: any,
    scriptSrc: any,
    scriptBlock: any,
    location: any,
    locationInternal: string,
    sequence: any,
    [key: string]: string //To allow index references with ICustomAction objects 
}

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
