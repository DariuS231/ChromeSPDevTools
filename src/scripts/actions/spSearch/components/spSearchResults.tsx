import * as React from "react";
import { FocusZone, FocusZoneDirection } from "office-ui-fabric-react/lib/FocusZone";
import { Image } from "office-ui-fabric-react/lib/Image";
import { List } from "office-ui-fabric-react/lib/List";
import { constants } from "./../constants/constants";
import { GroupedList, IGroupDividerProps } from 'office-ui-fabric-react/lib/components/GroupedList/index';
import { IGroup } from 'office-ui-fabric-react/lib/DetailsList';
import { css } from 'office-ui-fabric-react/lib/Utilities';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { IInitialState, ISearchResult, ISearchResultKeyValue } from "../interfaces/spSearchInterfaces";

const LOREM_IPSUM = ('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut ' +
    'labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut ' +
    'aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore ' +
    'eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt ' +
    'mollit anim id est laborum').split(' ');

const DATA = {
    'color': ['red', 'blue', 'green', 'yellow'],
    'shape': ['circle', 'square', 'triangle'],
    'location': ['Seattle', 'New York', 'Chicago', 'Los Angeles', 'Portland']
};

// tslint:disable-next-line:no-any
function createListItems(count: number, startIndex: number = 0): any {
    return Array.apply(null, Array(count)).map((item: number, index: number) => {
        let size = 150 + Math.round(Math.random() * 100);

        return {
            thumbnail: `//placehold.it/${size}x${size}`,
            key: 'item-' + (index + startIndex) + ' ' + lorem(4),
            name: lorem(5),
            description: lorem(10 + Math.round(Math.random() * 50)),
            color: _randWord(DATA.color),
            shape: _randWord(DATA.shape),
            location: _randWord(DATA.location),
            width: size,
            height: size
        };
    });
}

function createGroups(
    groupCount: number,
    groupDepth: number,
    startIndex: number,
    itemsPerGroup: number,
    level: number = 0,
    key: string = ''): IGroup[] {
    if (key !== '') {
        key = key + '-';
    }
    let count = Math.pow(itemsPerGroup, groupDepth);
    return Array.apply(null, Array(groupCount)).map((value: number, index: number) => {
        return {
            count: count,
            key: 'group' + key + index,
            name: 'group ' + key + index,
            startIndex: index * count + startIndex,
            level: level,
            isCollapsed: true,
            children: groupDepth > 1 ?
                createGroups(groupCount, groupDepth - 1, index * count + startIndex, itemsPerGroup, level + 1, key + index) :
                []
        };
    });
}

function lorem(wordCount: number): string {
    return Array.apply(null, Array(wordCount))
        .map((item: number) => _randWord(LOREM_IPSUM))
        .join(' ');
}

function isGroupable(key: string): boolean {
    return key === 'color' ||
        key === 'shape' ||
        key === 'location';
}

function _randWord(array: string[]): string {
    let index = Math.floor(Math.random() * array.length);
    return array[index];
}

interface ISpSearchListProps {
    results: ISearchResult[]
}

let _items: any[];
let _groups: IGroup[];

_items = _items || createListItems(20);
_groups = createGroups(4, 0, 0, 5);

function _onRenderCell(nestingDepth: number, item: any, itemIndex: number) {
    debugger;
    return (
        <div data-selection-index={itemIndex}>
            <span className='ms-GroupedListExample-name'>
                {item.name}
            </span>
        </div>
    );
}

function _onRenderHeader(props: IGroupDividerProps): JSX.Element {
    const toggleCollapse = (): void => {
        props.onToggleCollapse!(props.group!);
    };

    return (
        <div className={'ms-GroupedListExample-header'}>
            This is a custom header for {props.group!.name}
            &nbsp;
        (
          <Link onClick={toggleCollapse}>
                {props.group!.isCollapsed ? 'Expand' : 'Collapse'}
            </Link>
            )
      </div>
    );
}

function _onRenderFooter(props: IGroupDividerProps): JSX.Element {
    return (
        <div className={'ms-GroupedListExample-footer'}>
            This is a custom footer for {props.group!.name}
        </div>
    );
}

const SpSearchResults: React.StatelessComponent<ISpSearchListProps> = (props: ISpSearchListProps) => {
    return (
        <div style={{ display: "inline-block", width: "70%", verticalAlign: 'top' }} >
            <div style={{ top: "0", position: 'relative' }}>
                <GroupedList ref='groupedList' items={props.results} onRenderCell={_onRenderCell}
                />
            </div>
        </div>
    );
};

export default SpSearchResults;
