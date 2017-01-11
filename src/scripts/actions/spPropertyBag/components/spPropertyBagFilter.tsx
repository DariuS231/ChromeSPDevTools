import * as React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import windowsActionsCreatorsMap from '../actions/windowActions'
import { IMapStateToPropsState, IMapStateToProps, IMapDispatchToPropsFilter, IActions } from '../interfaces/spPropertyBagInterfaces'

interface SpPropertyBagFilterProps {
    actions: IActions,
    filterStr:string
}


const SpPropertyBagFilter: React.StatelessComponent<SpPropertyBagFilterProps> = (props: SpPropertyBagFilterProps) => {
    const onSearchBoxChange= (str: string) => {
        props.actions.setFilterText(str);
    }
    return <div className="ms-Grid filters-container">
        <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-u-sm6 ms-u-md6 ms-u-lg6">
                <SearchBox value={props.filterStr} onChange={onSearchBoxChange} />
            </div>
            <div className="ms-Grid-col ms-u-sm6 ms-u-md6 ms-u-lg6"> </div>
        </div>
    </div>
};

const mapStateToProps = (state: IMapStateToPropsState, ownProps: any): any => {
    return {}
}

const mapDispatchToProps = (dispatch: Dispatch<any>): IMapDispatchToPropsFilter => {
    return {
        actions: bindActionCreators(windowsActionsCreatorsMap, dispatch) as any
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SpPropertyBagFilter);
