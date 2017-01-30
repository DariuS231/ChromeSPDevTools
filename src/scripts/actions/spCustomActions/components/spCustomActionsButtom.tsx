import * as React from 'react';
import * as ReactDOM from "react-dom";
import { ContextualMenu, IContextualMenuItem, DirectionalHint } from 'office-ui-fabric-react/lib/ContextualMenu';
import { Button, ButtonType } from 'office-ui-fabric-react/lib/Button';
import { Link } from 'react-router';

export interface IContextualMenuMultiselectExampleState {
    isContextMenuVisible: boolean
}


export class SpCustomActionsButtom extends React.Component<{}, IContextualMenuMultiselectExampleState> {
    public refs: {
        menuButton: HTMLElement;
    };
    customActionTypes = [
        {
            key: 'Script Src',
            name: 'Script Src',
            onRender: this._renderCharmMenuItem,
            className: 'ms-ContextualMenu-item'
        },
        {
            key: 'Script Block',
            name: 'Script Block',
            onRender: this._renderCharmMenuItem,
            className: 'ms-ContextualMenu-item'
        },
        {
            key: 'Standar Menu',
            name: 'Standar Menu',
            onRender: this._renderCharmMenuItem,
            className: 'ms-ContextualMenu-item'
        }
    ]

    constructor() {
        super();

        this._onToggleSelect = this._onToggleSelect.bind(this);
        this._onClick = this._onClick.bind(this);
        this._onDismiss = this._onDismiss.bind(this);

        this.state = {
            isContextMenuVisible: false
        };
    }

    public render() {

        /*

        <Link className="ms-Button ms-Button--primary" to="item">
                    <span className="ms-Button-label">New Custom Action new</span>
                </Link>

        */
        console.log(this.refs.menuButton);
        return (

            <div id='ContextualMenuButtonDiv' ref="menuButton">
                <Button onClick={this._onClick} id='ContextualMenuButton' buttonType={ButtonType.primary}> New Custom Action </Button>
                {
                    this.state.isContextMenuVisible
                        ? (<ContextualMenu target={this.refs.menuButton} isBeakVisible={true} beakWidth={20} shouldFocusOnMount={false} onDismiss={this._onDismiss} directionalHint={DirectionalHint.topLeftEdge} items={this.customActionTypes} />)
                        : (null)
                }
            </div>


        );
    }

    private _renderCharmMenuItem(item: any) {
        return <Link className='ms-ContextualMenu-link' to="item">
                    <div className="ms-ContextualMenu-linkContent">
                    <span className="ms-ContextualMenu-itemText ms-fontWeight-regular">{item.name}</span>
                    </div>
                </Link>;
    }

    private _onToggleSelect(ev?: React.MouseEvent<HTMLButtonElement>, item?: IContextualMenuItem) {
        console.log(item);
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