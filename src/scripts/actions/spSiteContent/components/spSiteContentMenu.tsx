import { IconButton } from "office-ui-fabric-react/lib/Button";
import { ContextualMenu, DirectionalHint } from "office-ui-fabric-react/lib/ContextualMenu";
import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { DialogConfirm } from "../../common/components/dialogConfirm"
import spSiteContentActionsCreatorMap from "../actions/spSiteContentActions";
import { IActionOption, spSiteContentMenuHelper } from "../helpers/spSiteContentMenuOptions";
import { ISiteContent } from "../interfaces/spSiteContentInterfaces";
import { IMapStateToPropsState } from "../interfaces/spSiteContentInterfaces";

interface IDialogData {
    isDialogConfirmVisible: boolean;
    dialogTitle: string;
    dialogText: string;
    onOk: () => void;
}

interface ISpSiteContentMenuState {
    isContextMenuVisible: boolean;
    dialogData: IDialogData;
}
interface ISpSiteContentMenuProps {
    item: ISiteContent;
    openInNewTab: boolean;
    setListVisibility: (item: ISiteContent) => Promise<void>;
    reIndexList: (item: ISiteContent) => Promise<void>;
    setListNoCrawl: (item: ISiteContent) => Promise<void>;
    setListAttachments: (item: ISiteContent) => Promise<void>;
    recycleList: (item: ISiteContent) => Promise<void>;
    [key: string]: any;
}

class SpSiteContentMenu extends React.Component<ISpSiteContentMenuProps, ISpSiteContentMenuState> {
    public input: HTMLElement;
    constructor() {
        super();
        this.state = {
            dialogData: { isDialogConfirmVisible: false } as IDialogData,
            isContextMenuVisible: false
        };
        this.refs = { menuButtonContainer: null };
        this._onClick = this._onClick.bind(this);
        this._onDismiss = this._onDismiss.bind(this);
        this._contextualMenu = this._contextualMenu.bind(this);
        this._confirmDialog = this._confirmDialog.bind(this);
        this._divRefCallBack = this._divRefCallBack.bind(this);
        this._onActionItemCliuck = this._onActionItemCliuck.bind(this);
        this._getDialogOnClickCallBack = this._getDialogOnClickCallBack.bind(this);
        this._onConfirmDialogClose = this._onConfirmDialogClose.bind(this);
    }

    public render() {
        return (
            <div className="sp-siteContent-contextMenu" ref={this._divRefCallBack}>
                <IconButton onClick={this._onClick} icon="More" title="More" ariaLabel="More" />
                {this._contextualMenu()}
                {this._confirmDialog()}
            </div>);
    }
    private _getDialogOnClickCallBack(actionName: string): () => void {
        return () => { this.props[actionName](this.props.item); }
    }
    private _onActionItemCliuck(ev?: React.MouseEvent<HTMLElement>, item?: IActionOption) {
        const runAction = this._getDialogOnClickCallBack(item.actionName);
        if (!!item.dialogData) {
            this.setState({
                dialogData: {
                    isDialogConfirmVisible: true,
                    dialogText: item.dialogData.dialogText,
                    dialogTitle: item.dialogData.dialogTitle,
                    onOk: runAction
                } as IDialogData
            } as ISpSiteContentMenuState)
        } else {
            runAction();
        }
    }
    private _divRefCallBack(element: HTMLElement): void {
        if (element) { this.input = element; }
    }
    private _contextualMenu(): JSX.Element {
        const linkTarget: string = this.props.openInNewTab ? "_blank" : "_self";
        return this.state.isContextMenuVisible && (
            <ContextualMenu target={this.input} isBeakVisible={true} beakWidth={10}
                shouldFocusOnMount={false} onDismiss={this._onDismiss} directionalHint={DirectionalHint.bottomRightEdge}
                items={spSiteContentMenuHelper.getMenuOptions(linkTarget, this.props.item, this._onActionItemCliuck)} />
        );
    }
    private _confirmDialog(): JSX.Element {
        return this.state.dialogData.isDialogConfirmVisible && (
            <DialogConfirm dialogText={this.state.dialogData.dialogText} dialogTitle={this.state.dialogData.dialogTitle}
                onOk={this.state.dialogData.onOk} onCancel={this._onConfirmDialogClose} />
        );
    }

    private _onConfirmDialogClose() {
        this.setState({ dialogData: { isDialogConfirmVisible: false } as IDialogData } as ISpSiteContentMenuState);
    }

    private _onClick(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        this.setState({ isContextMenuVisible: !this.state.isContextMenuVisible } as ISpSiteContentMenuState);
        return false;
    }

    private _onDismiss() {
        this.setState({ isContextMenuVisible: false } as ISpSiteContentMenuState);
    }

}

interface IMapStateToProps {
    openInNewTab: boolean;
}
interface IMapDispatchToISpSiteContentProps {
    setListVisibility: (item: ISiteContent) => Promise<void>;
    reIndexList: (item: ISiteContent) => Promise<void>;
    setListNoCrawl: (item: ISiteContent) => Promise<void>;
    setListAttachments: (item: ISiteContent) => Promise<void>;
    recycleList: (item: ISiteContent) => Promise<void>;
}

const mapStateToProps = (state: IMapStateToPropsState, ownProps: any): IMapStateToProps => {
    return { openInNewTab: state.spSiteContent.openInNewTab };
};

const mapDispatchToProps = (dispatch: Dispatch<any>): IMapDispatchToISpSiteContentProps => {
    return {
        reIndexList: (item: ISiteContent) => {
            return dispatch(spSiteContentActionsCreatorMap.reIndexList(item));
        },
        setListVisibility: (item: ISiteContent) => {
            return dispatch(spSiteContentActionsCreatorMap.setListVisibility(item));
        },
        setListNoCrawl: (item: ISiteContent) => {
            return dispatch(spSiteContentActionsCreatorMap.setListNoCrawl(item));
        },
        setListAttachments: (item: ISiteContent) => {
            return dispatch(spSiteContentActionsCreatorMap.setListAttachments(item));
        },
        recycleList: (item: ISiteContent) => {
            return dispatch(spSiteContentActionsCreatorMap.recycleList(item));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SpSiteContentMenu);
