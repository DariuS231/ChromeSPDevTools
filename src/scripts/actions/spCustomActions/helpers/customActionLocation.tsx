import * as React from 'react';
import SpCustomActionsItemFormScriptLink from '../components/spCustomActionsItemFormScriptLink'
import SpCustomActionsItemFormStandarMenu from '../components/spCustomActionsItemFormStandarMenu'
import { ICustomAction } from '../interfaces/spCustomActionsInterfaces';
import { IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu';
import { Link } from 'react-router';

export interface ICustomActionType extends IContextualMenuItem {
    type: string
}

interface ILocationItem {
    key: string,
    type: string,
    name: string,
    spLocationName: string,
    renderForm: (item: ICustomAction, onChange: (value: string, key: string) => void) => JSX.Element
}
class CustomActionLocationHelper {
    private _location: Array<ILocationItem> = [
        {
            key: 'ScriptSrc',
            type: 'ScriptSrc',
            name: 'Script Src',
            spLocationName: 'ScriptLink',
            renderForm: (item: ICustomAction, onChange: (value: string, key: string) => void): JSX.Element => {
                return <SpCustomActionsItemFormScriptLink item={item} onInputChange={onChange} isScriptBlock={false} />
            }
        },
        {
            key: 'ScriptBlock',
            type: 'ScriptBlock',
            name: 'Script Block',
            spLocationName: 'ScriptLink',
            renderForm: (item: ICustomAction, onChange: (value: string, key: string) => void): JSX.Element => {
                return <SpCustomActionsItemFormScriptLink item={item} onInputChange={onChange} isScriptBlock={true} />
            }
        },
        {
            key: 'StandardMenu',
            type: 'StandardMenu',
            name: 'Standard Menu',
            spLocationName: 'Microsoft.SharePoint.StandardMenu',
            renderForm: (item: ICustomAction, onChange: (value: string, key: string) => void): JSX.Element => {
                return <SpCustomActionsItemFormStandarMenu item={item} onInputChange={onChange} />
            }
        }
    ]
    private _renderCharmMenuItem(item: ICustomActionType) {
        return <Link className='ms-ContextualMenu-link' to={"newItem/" + item.type}>
            <div className="ms-ContextualMenu-linkContent">
                <span className="ms-ContextualMenu-itemText ms-fontWeight-regular">{item.name}</span>
            </div>
        </Link>;
    }
    public get supportedCustomActions(): Array<string> {
        return this._location.map((item: ILocationItem) => {
            return item.spLocationName;
        })
    }
    public get contextMenuItems(): Array<ICustomActionType> {
        return this._location.map((item: ILocationItem) => {
            return {
                key: item.key,
                name: item.name,
                type: item.type,
                onRender: this._renderCharmMenuItem,
                className: 'ms-ContextualMenu-item'
            }
        })
    }
    public getFormComponent(item: ICustomAction, onChange: (value: string, key: string) => void): JSX.Element {
        let filtered: Array<ILocationItem>;
        if (item.location === 'ScriptLink') {
            filtered = this._location.filter((location: ILocationItem) => {
                if(item.scriptBlock){
                    return location.type === 'ScriptBlock';
                } else {
                    return location.type === 'ScriptSrc';
                }                
            });
        } else {
            filtered = this._location.filter((location: ILocationItem) => {
                return location.spLocationName === item.location;
            });
        }

        return (filtered.length > 0) ? filtered[0].renderForm(item, onChange) : null;
    }
    public getSpLocationNameByType(type: string): string {
        const filtered = this._location.filter((item: ILocationItem) => {
            return item.type === type;
        });
        return (filtered.length > 0) ? filtered[0].spLocationName : null;
    }
}

export const customActionLocationHelper = new CustomActionLocationHelper();