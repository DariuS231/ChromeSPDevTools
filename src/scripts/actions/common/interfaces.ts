import { MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';

export interface ICustomAction {
    name: string,
    description: string,
    id: string,
    title: string,
    registrationType: number,
    scriptSrc: string,
    scriptBlock: string,
    location: string,
    locationInternal: string,
    sequence: number,
    [key: string]: any //To allow index references with ICustomAction objects 
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
