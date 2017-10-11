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
import { IMapDispatchToISpSearchProps, IMapStateToProps, IMapStateToPropsState,ISpPropertyBagProps } from "../interfaces/spSearchInterfaces";


class SpSearch extends React.Component<ISpPropertyBagProps, {}> {
    constructor() {
        super();
    }
    public render() {

        return (<div className="sp-Search action-container">
            <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-u-sm10 ms-u-md10 ms-u-lg10">
                    <TextField multiline={true} resizable={false} value={this.props.textQuery} onChanged={this.props.actions.setQueryText} />
                </div>
                <div className="ms-Grid-col ms-u-sm2 ms-u-md2 ms-u-lg2">
                    <Button value="Search" title="Search" icon="Search" description="Search" />
                </div>
            </div>

            <SpSearchSettings {...this.props} />
            <SpSearchResults />
        </div>);

    }
}


const mapStateToProps = (state: IMapStateToPropsState, ownProps: any): IMapStateToProps => {
    return {
        results: state.spSearch.results,
        textQuery: state.spSearch.textQuery,
        rowLimit: state.spSearch.rowLimit,
        start: state.spSearch.start,
        skip: state.spSearch.skip,
        trimDuplicates: state.spSearch.trimDuplicates,
        selectFields: state.spSearch.selectFields,
        sourceId: state.spSearch.sourceId,
        Refiners: state.spSearch.Refiners,
        filters: state.spSearch.filters,
        sortBy: state.spSearch.sortBy,
        showFetching: state.spSearch.showFetching
    };
};

const mapDispatchToProps = (dispatch: Dispatch<any>): IMapDispatchToISpSearchProps => {
    return {
        actions: bindActionCreators(spSearchActionsCreatorMap, dispatch) as any
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SpSearch);
