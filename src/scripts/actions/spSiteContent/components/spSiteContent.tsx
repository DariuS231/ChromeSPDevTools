import { EventSubscription } from "fbemitter";
import { MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import spSiteContentActionsCreatorMap from "../actions/spSiteContentActions";
import { SpSiteContentConstants as constants } from "../constants/spSiteContentConstants";
import {
    IMapStateToProps,
    IMapStateToPropsState,
    ISpSiteContentActionCreatorsMapObject,
    ISpSiteContentProps
} from "../interfaces/spSiteContentInterfaces";
import { ISiteContent } from "../interfaces/spSiteContentInterfaces";
import FilterTextBox from "./../../common/components/filterTextBox";
import MessageBar from "./../../common/components/MessageBar";
import { WorkingOnIt } from "./../../common/components/WorkingOnIt";
import { IMessageData } from "./../../common/interfaces";
import { SpSiteContentCheckBox } from "./spSiteContentCheckBox";
import { SpSiteContentList } from "./spSiteContentList";

interface IMapDispatchToISpSiteContentProps {
    actions: ISpSiteContentActionCreatorsMapObject;
}
class SpSiteContent extends React.Component<ISpSiteContentProps, {}> {
    protected subscription: EventSubscription;
    constructor() {
        super();
    }
    public render() {
        if (this.props.isWorkingOnIt) {
            return <WorkingOnIt />;
        } else {
            return (
                <div className="action-container sp-siteContent">
                    <MessageBar
                        message={this.props.messageData.message}
                        messageType={this.props.messageData.type}
                        showMessage={this.props.messageData.showMessage}
                    />
                    <FilterTextBox
                        setFilterText={this.props.actions.setFilter}
                        filterStr={this.props.filterText}
                        parentOverrideClass="ms-Grid-col ms-u-sm6 ms-u-md6 ms-u-lg6"
                    >
                        <SpSiteContentCheckBox
                            checkLabel="Show All"
                            isCkecked={this.props.showAll}
                            onCheckBoxChange={this.props.actions.setShowAll}
                        />
                        <SpSiteContentCheckBox
                            checkLabel="Open in new tab"
                            isCkecked={this.props.openInNewTab}
                            onCheckBoxChange={this.props.actions.setOpenInNewWindow}
                        />
                    </FilterTextBox>
                    <SpSiteContentList
                        items={this.props.siteLists}
                        linkTarget={this.props.openInNewTab ? "_blank" : "_self"}
                        filterString={this.props.filterText}
                        showAll={this.props.showAll}
                    />
                </div>);

        }
    }
    private componentDidMount() {
        this.props.actions.getAllSiteContent();
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
