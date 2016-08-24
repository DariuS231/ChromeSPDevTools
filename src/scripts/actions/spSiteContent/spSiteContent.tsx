/// <reference path="../../../../typings/index.d.ts"/>
/// <reference path="./../common/styles.ts"/>
/// <reference path="./../common/interfaces.ts"/>

import * as React from 'react';
import WorkingOnIt from './../common/WorkingOnIt';
import MessageBar from './../common/MessageBar';
import { MessageType } from './../common/enums';
import { SpPropertyBagStyles as styles } from './../common/Styles'

interface SpSiteContentProps {

}
interface SpSiteContentState {
    isWorkingOnIt: boolean,
    siteLists: Array<ISiteContent>,
    showMessage: boolean,
    messageType: MessageType,
    message: string,
    showHidden: boolean
}

export default class SpSiteContent extends React.Component<SpSiteContentProps, SpSiteContentState> {
    constructor() {
        super();
        this.state = {
            isWorkingOnIt: true,
            siteLists: [],
            showMessage: false,
            messageType: MessageType.Info,
            message: '',
            showHidden: true
        } as SpSiteContentState;
    }
    private getWebProperties() {
        let ctx = SP.ClientContext.get_current();
        let web = ctx.get_web();

        let siteConetent = web.get_lists();
        ctx.load(web);
        ctx.load(siteConetent, 'Include(RootFolder,Title,Id,Hidden,ItemCount,Created,ImageUrl,LastItemModifiedDate,Description,ParentWebUrl)');

        let onSuccess: Function = Function.createDelegate(this, (sender: any, err: any) => {

            let items: Array<ISiteContent> = [], listEnumerator: any = siteConetent.getEnumerator();

            while (listEnumerator.moveNext()) {
                let oList: any = listEnumerator.get_current();
                let listId: any = oList.get_id();
                let listItem: ISiteContent = {
                    id: listId,
                    title: oList.get_title(),
                    description: oList.get_description(),
                    hidden: oList.get_hidden(),
                    itemCount: oList.get_itemCount(),
                    imageUrl: oList.get_imageUrl(),
                    created: oList.get_created(),
                    lastModified: oList.get_lastItemModifiedDate(),
                    listUrl: oList.get_rootFolder().get_serverRelativeUrl(),
                    settingsUrl: oList.get_parentWebUrl() + '/_layouts/15/listedit.aspx?List=' + listId
                }
                items.push(listItem);
                this.setState({
                    siteLists: items,
                    isWorkingOnIt: false
                } as SpSiteContentState);
            }
            items.sort(function (a, b) {
                return a.title.localeCompare(b.title);
            });
        });
        let onError: Function = Function.createDelegate(this, function () { console.log("ERROR"); });
        ctx.executeQueryAsync(onSuccess, onError);
    }
    private showHidden(e: any) {
        this.setState({
            showHidden: e.target.checked
        } as SpSiteContentState);
    }
    private componentDidMount() {
        this.getWebProperties();
    }
    public render() {
        if (this.state.isWorkingOnIt) {
            return <WorkingOnIt/>
        } else {
            var lists: any;
            if (this.state.showHidden) {
                lists = this.state.siteLists;
            } else {
                lists = this.state.siteLists.filter((list: ISiteContent, index: number) => {
                    return !list.hidden;
                });
            }
            var settingsStyles = {
                marginTop: '2px',
                marginBottom: '2px',
                position: 'absolute',
                right: '10px',
                bottom: '5px',
                paddingLeft: '27px',
                backgroundPosition: '10% 50%',
                backgroundRepeat: 'no-repeat',
                backgroundImage: 'url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMS4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQ3OC43MDMgNDc4LjcwMyIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDc4LjcwMyA0NzguNzAzOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCI+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTQ1NC4yLDE4OS4xMDFsLTMzLjYtNS43Yy0zLjUtMTEuMy04LTIyLjItMTMuNS0zMi42bDE5LjgtMjcuN2M4LjQtMTEuOCw3LjEtMjcuOS0zLjItMzguMWwtMjkuOC0yOS44ICAgIGMtNS42LTUuNi0xMy04LjctMjAuOS04LjdjLTYuMiwwLTEyLjEsMS45LTE3LjEsNS41bC0yNy44LDE5LjhjLTEwLjgtNS43LTIyLjEtMTAuNC0zMy44LTEzLjlsLTUuNi0zMy4yICAgIGMtMi40LTE0LjMtMTQuNy0yNC43LTI5LjItMjQuN2gtNDIuMWMtMTQuNSwwLTI2LjgsMTAuNC0yOS4yLDI0LjdsLTUuOCwzNGMtMTEuMiwzLjUtMjIuMSw4LjEtMzIuNSwxMy43bC0yNy41LTE5LjggICAgYy01LTMuNi0xMS01LjUtMTcuMi01LjVjLTcuOSwwLTE1LjQsMy4xLTIwLjksOC43bC0yOS45LDI5LjhjLTEwLjIsMTAuMi0xMS42LDI2LjMtMy4yLDM4LjFsMjAsMjguMSAgICBjLTUuNSwxMC41LTkuOSwyMS40LTEzLjMsMzIuN2wtMzMuMiw1LjZjLTE0LjMsMi40LTI0LjcsMTQuNy0yNC43LDI5LjJ2NDIuMWMwLDE0LjUsMTAuNCwyNi44LDI0LjcsMjkuMmwzNCw1LjggICAgYzMuNSwxMS4yLDguMSwyMi4xLDEzLjcsMzIuNWwtMTkuNywyNy40Yy04LjQsMTEuOC03LjEsMjcuOSwzLjIsMzguMWwyOS44LDI5LjhjNS42LDUuNiwxMyw4LjcsMjAuOSw4LjdjNi4yLDAsMTIuMS0xLjksMTcuMS01LjUgICAgbDI4LjEtMjBjMTAuMSw1LjMsMjAuNyw5LjYsMzEuNiwxM2w1LjYsMzMuNmMyLjQsMTQuMywxNC43LDI0LjcsMjkuMiwyNC43aDQyLjJjMTQuNSwwLDI2LjgtMTAuNCwyOS4yLTI0LjdsNS43LTMzLjYgICAgYzExLjMtMy41LDIyLjItOCwzMi42LTEzLjVsMjcuNywxOS44YzUsMy42LDExLDUuNSwxNy4yLDUuNWwwLDBjNy45LDAsMTUuMy0zLjEsMjAuOS04LjdsMjkuOC0yOS44YzEwLjItMTAuMiwxMS42LTI2LjMsMy4yLTM4LjEgICAgbC0xOS44LTI3LjhjNS41LTEwLjUsMTAuMS0yMS40LDEzLjUtMzIuNmwzMy42LTUuNmMxNC4zLTIuNCwyNC43LTE0LjcsMjQuNy0yOS4ydi00Mi4xICAgIEM0NzguOSwyMDMuODAxLDQ2OC41LDE5MS41MDEsNDU0LjIsMTg5LjEwMXogTTQ1MS45LDI2MC40MDFjMCwxLjMtMC45LDIuNC0yLjIsMi42bC00Miw3Yy01LjMsMC45LTkuNSw0LjgtMTAuOCw5LjkgICAgYy0zLjgsMTQuNy05LjYsMjguOC0xNy40LDQxLjljLTIuNyw0LjYtMi41LDEwLjMsMC42LDE0LjdsMjQuNywzNC44YzAuNywxLDAuNiwyLjUtMC4zLDMuNGwtMjkuOCwyOS44Yy0wLjcsMC43LTEuNCwwLjgtMS45LDAuOCAgICBjLTAuNiwwLTEuMS0wLjItMS41LTAuNWwtMzQuNy0yNC43Yy00LjMtMy4xLTEwLjEtMy4zLTE0LjctMC42Yy0xMy4xLDcuOC0yNy4yLDEzLjYtNDEuOSwxNy40Yy01LjIsMS4zLTkuMSw1LjYtOS45LDEwLjhsLTcuMSw0MiAgICBjLTAuMiwxLjMtMS4zLDIuMi0yLjYsMi4yaC00Mi4xYy0xLjMsMC0yLjQtMC45LTIuNi0yLjJsLTctNDJjLTAuOS01LjMtNC44LTkuNS05LjktMTAuOGMtMTQuMy0zLjctMjguMS05LjQtNDEtMTYuOCAgICBjLTIuMS0xLjItNC41LTEuOC02LjgtMS44Yy0yLjcsMC01LjUsMC44LTcuOCwyLjVsLTM1LDI0LjljLTAuNSwwLjMtMSwwLjUtMS41LDAuNWMtMC40LDAtMS4yLTAuMS0xLjktMC44bC0yOS44LTI5LjggICAgYy0wLjktMC45LTEtMi4zLTAuMy0zLjRsMjQuNi0zNC41YzMuMS00LjQsMy4zLTEwLjIsMC42LTE0LjhjLTcuOC0xMy0xMy44LTI3LjEtMTcuNi00MS44Yy0xLjQtNS4xLTUuNi05LTEwLjgtOS45bC00Mi4zLTcuMiAgICBjLTEuMy0wLjItMi4yLTEuMy0yLjItMi42di00Mi4xYzAtMS4zLDAuOS0yLjQsMi4yLTIuNmw0MS43LTdjNS4zLTAuOSw5LjYtNC44LDEwLjktMTBjMy43LTE0LjcsOS40LTI4LjksMTcuMS00MiAgICBjMi43LTQuNiwyLjQtMTAuMy0wLjctMTQuNmwtMjQuOS0zNWMtMC43LTEtMC42LTIuNSwwLjMtMy40bDI5LjgtMjkuOGMwLjctMC43LDEuNC0wLjgsMS45LTAuOGMwLjYsMCwxLjEsMC4yLDEuNSwwLjVsMzQuNSwyNC42ICAgIGM0LjQsMy4xLDEwLjIsMy4zLDE0LjgsMC42YzEzLTcuOCwyNy4xLTEzLjgsNDEuOC0xNy42YzUuMS0xLjQsOS01LjYsOS45LTEwLjhsNy4yLTQyLjNjMC4yLTEuMywxLjMtMi4yLDIuNi0yLjJoNDIuMSAgICBjMS4zLDAsMi40LDAuOSwyLjYsMi4ybDcsNDEuN2MwLjksNS4zLDQuOCw5LjYsMTAsMTAuOWMxNS4xLDMuOCwyOS41LDkuNyw0Mi45LDE3LjZjNC42LDIuNywxMC4zLDIuNSwxNC43LTAuNmwzNC41LTI0LjggICAgYzAuNS0wLjMsMS0wLjUsMS41LTAuNWMwLjQsMCwxLjIsMC4xLDEuOSwwLjhsMjkuOCwyOS44YzAuOSwwLjksMSwyLjMsMC4zLDMuNGwtMjQuNywzNC43Yy0zLjEsNC4zLTMuMywxMC4xLTAuNiwxNC43ICAgIGM3LjgsMTMuMSwxMy42LDI3LjIsMTcuNCw0MS45YzEuMyw1LjIsNS42LDkuMSwxMC44LDkuOWw0Miw3LjFjMS4zLDAuMiwyLjIsMS4zLDIuMiwyLjZ2NDIuMUg0NTEuOXoiIGZpbGw9IiMwMDAwMDAiLz4KCQk8cGF0aCBkPSJNMjM5LjQsMTM2LjAwMWMtNTcsMC0xMDMuMyw0Ni4zLTEwMy4zLDEwMy4zczQ2LjMsMTAzLjMsMTAzLjMsMTAzLjNzMTAzLjMtNDYuMywxMDMuMy0xMDMuM1MyOTYuNCwxMzYuMDAxLDIzOS40LDEzNi4wMDEgICAgeiBNMjM5LjQsMzE1LjYwMWMtNDIuMSwwLTc2LjMtMzQuMi03Ni4zLTc2LjNzMzQuMi03Ni4zLDc2LjMtNzYuM3M3Ni4zLDM0LjIsNzYuMyw3Ni4zUzI4MS41LDMxNS42MDEsMjM5LjQsMzE1LjYwMXoiIGZpbGw9IiMwMDAwMDAiLz4KCTwvZz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K)'
            };
            var siteContent = lists.map((list: ISiteContent, index: number) => {
                return (
                    <li key={index} style={{ width: '50%', display: 'inline-block' }}>
                        <div style={{ padding: '5px', margin: '5px', backgroundColor: 'rgba(100,149,237, 0.1)', position: 'relative', borderRadius: '5px' }}>
                            <a href={list.listUrl}>
                                <img src={list.imageUrl} alt="" style={{ width: '16px', height: '16px', verticalAlign: 'middle' }} />
                                <h2 style={{ display: 'inline-block', width: '90%', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', verticalAlign: 'middle', marginLeft: '5px' }} href={list.listUrl}>{list.title}</h2>
                            </a>
                            <p style={{ marginTop: '2px', marginBottom: '2px' }}>{list.itemCount} items</p>
                            <a href={list.settingsUrl} style={settingsStyles}>List Settings</a>
                        </div>
                    </li>);
            });
            return (
                <div style={styles.contentStyles}>
                    <MessageBar message={this.state.message} messageType={this.state.messageType} showMessage={this.state.showMessage} />
                    <div>
                        <label htmlFor="showHiddenInput">Show hidden</label>
                        <input type="checkbox" id="showHiddenInput" checked={this.state.showHidden} onChange={this.showHidden.bind(this) }/>
                    </div>
                    <ul style={{ marginTop: '6.5px', listStyle: 'none', paddingLeft: '5px' }}>
                        {siteContent}
                    </ul>
                </div>);

        }
    }
}