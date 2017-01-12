import * as React from 'react';
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import propertyActionsCreatorsMap from '../actions/spPropertyBagActions';
import { IMapStateToPropsState, IMapStateToProps } from '../interfaces/spPropertyBagInterfaces'

interface SpPropertyBagFilterActions {
    setFilterText: Function
}
interface SpPropertyBagFilterProps {
    setFilterText: Function,
    filterStr: string
}

const SpPropertyBagFilter: React.StatelessComponent<SpPropertyBagFilterProps> = (props: SpPropertyBagFilterProps) => {
    const onSearchBoxChange = (str: string) => {debugger;
        props.setFilterText(str);
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

const mapDispatchToProps = (dispatch: Dispatch<any>): SpPropertyBagFilterActions => {
    return {
        setFilterText: (strFilter:string) => {
            dispatch(propertyActionsCreatorsMap["setFilterText"](strFilter))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SpPropertyBagFilter);
