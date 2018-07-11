import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import spSearchActionsCreatorMap from "../actions/spSearchActions";
import {
    IMapDispatchToISpSearchProps,
    IMapStateToProps,
    IMapStateToPropsState,
    ISpPropertyBagProps
} from "../interfaces/spSearchInterfaces";
import SpSearchHeader from "./spSearchHeader";
import SpSearchResults from "./spSearchResults";
import SpSearchSettings from "./spSearchSettings";

class SpSearch extends React.Component<ISpPropertyBagProps, {}> {
    
    private componentDidMount() {
        this.props.actions.getWebUrl();
    }

    public render() {
        return (
            <div className="sp-Search action-container">
                <SpSearchHeader {...this.props} />
                <SpSearchSettings {...this.props} />
                <SpSearchResults {...this.props} />;
            </div>
        );
    }
}

const mapStateToProps = (state: IMapStateToPropsState, ownProps: any): IMapStateToProps => {
    return {
        results: state.spSearch.results,
        resultsColumns: state.spSearch.resultsColumns,
        webUrl: state.spSearch.webUrl,
        totalResults: state.spSearch.totalResults,
        textQuery: state.spSearch.textQuery,
        rowLimit: state.spSearch.rowLimit,
        skip: state.spSearch.skip,
        trimDuplicates: state.spSearch.trimDuplicates,
        selectFields: state.spSearch.selectFields,
        sourceId: state.spSearch.sourceId,
        Refiners: state.spSearch.Refiners,
        filters: state.spSearch.filters,
        sortBy: state.spSearch.sortBy,
        showFetching: state.spSearch.showFetching,
        messageData: state.spSearch.messageData
    };
};

const mapDispatchToProps = (dispatch: Dispatch<any>): IMapDispatchToISpSearchProps => {
    return {
        actions: bindActionCreators(spSearchActionsCreatorMap, dispatch) as any
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SpSearch);
