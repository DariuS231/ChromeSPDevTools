import * as React from 'react';
import * as ReactDOM from "react-dom";
import { ContextualMenu, DirectionalHint } from 'office-ui-fabric-react/lib/ContextualMenu';
import { Button, ButtonType } from 'office-ui-fabric-react/lib/Button';
import { customActionLocationHelper } from '../helpers/customActionLocation'

interface SpCustomActionsButtomState {
    isContextMenuVisible: boolean
}

export class SpCustomActionsButtom extends React.Component<{}, SpCustomActionsButtomState> {
    public refs: {
        menuButton: HTMLElement;
    };
    constructor() {
        super();
        this.state = { isContextMenuVisible: false };

        this._onClick = this._onClick.bind(this);
        this._onDismiss = this._onDismiss.bind(this);
    }

    public render() {
        return (<div id='ContextualMenuButtonDiv' ref="menuButton">
            <Button onClick={this._onClick} id='ContextualMenuButton' buttonType={ButtonType.primary}> New Custom Action <i className="ms-Icon ms-Icon--ChevronDownSmall" aria-hidden="true"></i></Button>
            {
                this.state.isContextMenuVisible
                    ? (<ContextualMenu target={this.refs.menuButton} isBeakVisible={true} beakWidth={10} shouldFocusOnMount={false} onDismiss={this._onDismiss} directionalHint={DirectionalHint.bottomRightEdge} items={customActionLocationHelper.contextMenuItems} />)
                    : (null)
            }
        </div>);
    }

    private _onClick(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        this.setState({ isContextMenuVisible: !this.state.isContextMenuVisible });
        return false;
    }

    private _onDismiss() {
        this.setState({ isContextMenuVisible: false });
    }

}