import { MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import spSiteContentActionsCreatorMap from "../actions/spSiteContentActions";
import {
    IMapStateToProps,
    IMapStateToPropsState,
    ISpSiteContentActionCreatorsMapObject,
    ISpSiteContentProps
} from "../interfaces/spSiteContentInterfaces";
import FilterTextBox from "./../../common/components/filterTextBox";
import MessageBar from "./../../common/components/messageBar";
import { WorkingOnIt } from "./../../common/components/workingOnIt";
import { SpSiteContentCheckBox } from "./spSiteContentCheckBox";
import { SpSiteContentList } from "./spSiteContentList";

interface IMapDispatchToISpSiteContentProps {
    actions: ISpSiteContentActionCreatorsMapObject;
}
class SpSiteContent extends React.Component<ISpSiteContentProps, {}> {
    constructor() {
        super();
        this.onMessageClose = this.onMessageClose.bind(this);
    }
    public render() {
        if (this.props.isWorkingOnIt) {
            return <WorkingOnIt />;
        } else {
            return (
                <div className="action-container sp-siteContent">
                    <MessageBar onCloseMessageClick={this.onMessageClose} message={this.props.messageData.message}
                        messageType={this.props.messageData.type} showMessage={this.props.messageData.showMessage} />
                    <FilterTextBox setFilterText={this.props.actions.setFilter} filterStr={this.props.filterText}
                        parentOverrideClass="ms-Grid-col ms-u-sm6 ms-u-md6 ms-u-lg6" >
                        <div className="ms-Grid-row">
                            <SpSiteContentCheckBox checkLabel="Show All" isChecked={this.props.showAll}
                                onCheckBoxChange={this.props.actions.setShowAll} />
                            <SpSiteContentCheckBox checkLabel="Open in new tab" isChecked={this.props.openInNewTab}
                                onCheckBoxChange={this.props.actions.setOpenInNewWindow} />
                        </div>
                    </FilterTextBox>
                    <SpSiteContentList items={this.props.siteLists} showAll={this.props.showAll}
                        linkTarget={this.props.openInNewTab ? "_blank" : "_self"}
                        filterString={this.props.filterText} setFavourite={this.props.actions.setFavourite} />
                </div>);

        }
    }
    public componentDidMount() {
        this.props.actions.getAllSiteContent();
    }
    private onMessageClose() {
        this.props.actions.setMessageData({
            message: "",
            showMessage: false,
            type: MessageBarType.info
        });
    }
}

const mapStateToProps = (state: IMapStateToPropsState, ownProps: any): IMapStateToProps => {
    return {
        filterText: state.spSiteContent.filterText,
        isWorkingOnIt: state.spSiteContent.isWorkingOnIt,
        messageData: state.spSiteContent.messageData,
        openInNewTab: state.spSiteContent.openInNewTab,
        showAll: state.spSiteContent.showAll,
        siteLists: state.spSiteContent.siteLists
    };
};

const mapDispatchToProps = (dispatch: Dispatch<any>): IMapDispatchToISpSiteContentProps => {
    return {
        actions: bindActionCreators(spSiteContentActionsCreatorMap, dispatch) as any
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SpSiteContent);
