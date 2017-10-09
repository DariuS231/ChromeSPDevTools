import { MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import spSearchActionsCreatorMap from "../actions/spSearchActions";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { Button } from 'office-ui-fabric-react/lib/';
import MessageBar from "./../../common/components/MessageBar";
import SpSearchSettings from "./spSearchSettings";
import SpSearchResults from "./spSearchResults";
import FilterTextBox from "./../../common/components/filterTextBox";

class SpSearch extends React.Component<{}, {}> {
    constructor() {
        super();
    }
    public render() {

        return (<div className="sp-Search action-container">
            <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-u-sm10 ms-u-md10 ms-u-lg10">
                    <TextField multiline={true} resizable={false} />
                </div>
                <div className="ms-Grid-col ms-u-sm2 ms-u-md2 ms-u-lg2">
                    <Button value="Search" title="Search" icon="Search" description="Search" />
                </div>
            </div>

            <SpSearchSettings />
            <SpSearchResults />
        </div>);

    }

    public onSearchChange(filterStr: string): any {

    }

    public searchClick(event: any): any {
        event.preventDefault();
        return false;
    };
}


const mapStateToProps = (state: any, ownProps: any): any => {
    return {};
};

const mapDispatchToProps = (dispatch: Dispatch<any>): any => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SpSearch);
