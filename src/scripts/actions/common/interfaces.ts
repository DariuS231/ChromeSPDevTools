import { MessageBarType } from "office-ui-fabric-react/lib/MessageBar";

export interface IMessageData {
    showMessage: boolean;
    message: string;
    type: MessageBarType;
}

export interface IAction<T> {
    readonly type: string;
    readonly payload: T;
}

export interface ISharePointSiteInfo {
    formDigestValue: string;
    webFullUrl: string;
    siteFullUrl: string;
}