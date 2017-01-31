import * as React from 'react';
import * as ReactDOM from "react-dom";
import { ContextualMenu, IContextualMenuItem, DirectionalHint } from 'office-ui-fabric-react/lib/ContextualMenu';
import { Button, ButtonType } from 'office-ui-fabric-react/lib/Button';
import { Link } from 'react-router';
import { CustomActionLocation } from './../constants/enums';

interface IContextualMenuMultiselectExampleState {
    isContextMenuVisible: boolean
}

interface ICustomActionType extends IContextualMenuItem {
    type: CustomActionLocation
}

export class SpCustomActionsButtom extends React.Component<{}, IContextualMenuMultiselectExampleState> {
    public refs: {
        menuButton: HTMLElement;
    };
    customActionTypes: Array<ICustomActionType> = [
        {
            key: 'Script Src',
            name: 'Script Src',
            type: CustomActionLocation.ScriptSrc,
            onRender: this._renderCharmMenuItem,
            className: 'ms-ContextualMenu-item'
        },
        {
            key: 'Script Block',
            name: 'Script Block',
            type: CustomActionLocation.ScriptBlock,
            onRender: this._renderCharmMenuItem,
            className: 'ms-ContextualMenu-item'
        },
        {
            key: 'Standar Menu',
            name: 'Standar Menu',
            type: CustomActionLocation.StandarMenu,
            onRender: this._renderCharmMenuItem,
            className: 'ms-ContextualMenu-item'
        }
    ]

    constructor() {
        super();

        this._onClick = this._onClick.bind(this);
        this._onDismiss = this._onDismiss.bind(this);

        this.state = {
            isContextMenuVisible: false
        };
    }

    public render() {
        return (

            <div id='ContextualMenuButtonDiv' ref="menuButton">
                <Button onClick={this._onClick} id='ContextualMenuButton' buttonType={ButtonType.primary}> New Custom Action <i className="ms-Icon ms-Icon--ChevronUpSmall" aria-hidden="true"></i></Button>
                {
                    this.state.isContextMenuVisible
                        ? (<ContextualMenu target={this.refs.menuButton} isBeakVisible={true} beakWidth={20} shouldFocusOnMount={false} onDismiss={this._onDismiss} directionalHint={DirectionalHint.topLeftEdge} items={this.customActionTypes} />)
                        : (null)
                }
            </div>
        );
    }

    private _renderCharmMenuItem(item: ICustomActionType) {

        return <Link className='ms-ContextualMenu-link' to={"newItem/" + CustomActionLocation[item.type]}>
            <div className="ms-ContextualMenu-linkContent">
                <span className="ms-ContextualMenu-itemText ms-fontWeight-regular">{item.name}</span>
            </div>
        </Link>;
    }

    private _onClick(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        this.setState({ isContextMenuVisible: true });
        return false;
    }

    private _onDismiss() {
        this.setState({ isContextMenuVisible: false });
    }

}