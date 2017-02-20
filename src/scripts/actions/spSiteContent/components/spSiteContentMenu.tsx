import { Button, ButtonType } from "office-ui-fabric-react/lib/Button";
import { ContextualMenu, DirectionalHint } from "office-ui-fabric-react/lib/ContextualMenu";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { spSiteContentMenuHelper } from "../helpers/spSiteContentMenuOptions";

interface ISpSiteContentMenuState {
    isContextMenuVisible: boolean;
}

export class SpSiteContentMenu extends React.Component<{}, ISpSiteContentMenuState> {
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
        return (<div id="ContextualMenuButtonDiv" ref={this._divRefCallBack}>
            <Button
                onClick={this._onClick}
                id="ContextualMenuButton"
                buttonType={ButtonType.primary}
            > New Custom Action
                <i className="ms-Icon ms-Icon--ChevronDownSmall" aria-hidden="true" />
            </Button>
            {this._contextualMenu()}
        </div>);
    }
    private _divRefCallBack(element: HTMLElement): void {
        if (element) {
            this.input = element;
        }
    }
    private _contextualMenu(): JSX.Element {
        return this.state.isContextMenuVisible && <ContextualMenu
            target={this.input}
            isBeakVisible={true}
            beakWidth={10}
            shouldFocusOnMount={false}
            onDismiss={this._onDismiss}
            directionalHint={DirectionalHint.bottomRightEdge}
            items={[]}
        />;
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
