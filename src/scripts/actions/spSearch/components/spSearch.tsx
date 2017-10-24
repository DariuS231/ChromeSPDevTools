import { Button } from "office-ui-fabric-react/lib/";
import { Spinner, SpinnerType } from "office-ui-fabric-react/lib/Spinner";
import { TextField } from "office-ui-fabric-react/lib/TextField";
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
import SpSearchMessage from "./spSearchMessage";
import SpSearchResults from "./spSearchResults";
import SpSearchSettings from "./spSearchSettings";

class SpSearch extends React.Component<ISpPropertyBagProps, {}> {
    constructor() {
        super();
        this.onSearchClick = this.onSearchClick.bind(this);
        this._resultsComponent = this._resultsComponent.bind(this);
    }
    public onSearchClick(ev: any): void {
        this.props.actions.getResults(this.props);
    }
    public render() {

        return (<div className="sp-Search action-container">
            <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-u-sm10 ms-u-md10 ms-u-lg10">
                    <TextField
                        multiline={true}
                        resizable={false}
                        value={this.props.textQuery}
                        onChanged={this.props.actions.setQueryText}
                        onGetErrorMessage={this._validateSearchText} />
                </div>
                <div className="ms-Grid-col ms-u-sm2 ms-u-md2 ms-u-lg2">
                    <Button
                        value="Search"
                        title="Search"
                        icon="Search"
                        description="Search"
                        onClick={this.onSearchClick} />
                </div>
            </div>
            <SpSearchSettings {...this.props} />
            <div className="sp-Search-columns results" >
                <SpSearchMessage messageData={this.props.messageData} />
                {this._resultsComponent()}
            </div>
        </div>
        );

    }
    private _validateSearchText(str: string): string {
        return str.trim() === "" ? "Text Query can´t be empty." : "";
    }
    private _resultsComponent() {
        if (this.props.showFetching) {
            return <Spinner type={SpinnerType.large} label={"Fetching results..."} />;
        } else if (this.props.results.length > 0) {
            return <SpSearchResults results={this.props.results} totalResults={this.props.totalResults} />;
        } else {
            return null;
        }
    }
}

const mapStateToProps = (state: IMapStateToPropsState, ownProps: any): IMapStateToProps => {
    return {
        results: state.spSearch.results,
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
