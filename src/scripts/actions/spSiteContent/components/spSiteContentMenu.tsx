import { IconButton } from "office-ui-fabric-react/lib/Button";
import { ContextualMenu, DirectionalHint } from "office-ui-fabric-react/lib/ContextualMenu";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { spSiteContentMenuHelper } from "../helpers/spSiteContentMenuOptions";
import { ISiteContent } from "../interfaces/spSiteContentInterfaces";

interface ISpSiteContentMenuState {
    isContextMenuVisible: boolean;
}
interface ISpSiteContentMenuProps {
    item: ISiteContent;
    linkTarget: string;
}

export class SpSiteContentMenu extends React.Component<ISpSiteContentMenuProps, ISpSiteContentMenuState> {
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
            <IconButton
                onClick={this._onClick}
                icon="More"
                title="More"
                ariaLabel="More"
            />
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
            items={spSiteContentMenuHelper.getMenuOptions(this.props.linkTarget, this.props.item)}
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
