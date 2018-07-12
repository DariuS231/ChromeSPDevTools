import { Button, ButtonType } from "office-ui-fabric-react/lib/Button";
import { ContextualMenu, DirectionalHint } from "office-ui-fabric-react/lib/ContextualMenu";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { customActionLocationHelper } from "../helpers/customActionLocation";

interface ISpCustomActionsButtomState {
    isContextMenuVisible: boolean;
}

export class SpCustomActionsButtom extends React.Component<{}, ISpCustomActionsButtomState> {
    public input: HTMLElement;
    constructor() {
        super();
        this.state = { isContextMenuVisible: false };
        this.refs = { menuButtonContainer: null };
        this._onClick = this._onClick.bind(this);
        this._onDismiss = this._onDismiss.bind(this);
        this._contextualMenu = this._contextualMenu.bind(this);
        this._divRefCallBack = this._divRefCallBack.bind(this);
    }

    public render() {
        return (
            <div id="ContextualMenuButtonDiv" ref={this._divRefCallBack}>
                <a href="#" onClick={this._onClick}
                    id="ContextualMenuButton"
                    className="ms-Button ms-Button--primary" > New Custom Action
                <i className="ms-Icon ms-Icon--ChevronDownSmall" aria-hidden="true" />
                </a>
                {this._contextualMenu()}
            </div>
        );
    }
    private _divRefCallBack(element: HTMLElement): void {
        if (element) {
            this.input = element;
        }
    }
    private _contextualMenu(): JSX.Element {
        return this.state.isContextMenuVisible && (
            <ContextualMenu target={this.input} isBeakVisible={true} beakWidth={10} shouldFocusOnMount={false}
                onDismiss={this._onDismiss} directionalHint={DirectionalHint.bottomRightEdge}
                items={customActionLocationHelper.contextMenuItems} />);
    }

    private _onClick(event: any) {
        event.preventDefault();
        this.setState({ isContextMenuVisible: !this.state.isContextMenuVisible });
        return false;
    }

    private _onDismiss() {
        this.setState({ isContextMenuVisible: false });
    }

}
