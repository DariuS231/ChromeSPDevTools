/// <reference path="../../../../typings/index.d.ts"/>
/// <reference path="./interfaces.ts"/>
import * as React from 'react';
//import { KeyValueItem as styles } from './styles'
interface KeyValueItemState {
    itemInputValue: string,
    inEditMode: boolean
}
interface KeyValueItemProps {
    item: IKeyValue
    onUpdateClick: any,
    onDeleteClick: any,
    itemIndex: number
}

export default class KeyValueItem extends React.Component<KeyValueItemProps, KeyValueItemState> {
    inputId: string;
    constructor(props: any) {
        super(props);
        this.state = {
            itemInputValue: this.props.item.value,
            inEditMode: false
        };
        this.inputId = 'spPropInput_' + this.props.item.key.trim();
    }
    componentDidUpdate() {
        if (this.state.inEditMode) {
            let input = document.getElementById(this.inputId);
            if (input !== null && typeof input !== "undefined")
                input.focus();
        }
    }

    private onDeleteClick(e: any) {
        this.props.onDeleteClick(this.props.item.key);
    }
    private onUpdateClick(e: any) {
        this.props.onUpdateClick(this.props.item.key, this.state.itemInputValue);
    }
    private onValueInputChange(e: any) {
        this.setState({ itemInputValue: e.target.value } as KeyValueItemState);
    }
    private onUpdateBtnClick(e: any) {
        this.setState({ inEditMode: true } as KeyValueItemState);
    }

    public render() {
        let updateBtn: any;
        let valueElement: any;
        let tableRowStyles: any = {};
        let divContainer = {
            padding: '5px',
            margin: 0
        }

        let btnStyles = {
            display: 'inline-block',
            height: '16px',
            borderRadius: '5px',
            padding: '3px 10px 4px 25px',
            margin: '5px',
            backgroundPosition: '10% 50%',
            backgroundRepeat: 'no-repeat',
            textDecoration: 'none',
            color: 'black',
            fontWeight: 'bold'
        }

        let tableCellStyle = {
            padding: '5px'
        }

        let inputStyles = {
            width: '240px'
        }
        let styles = {
            deleteBtnStyle: Object.assign({
                backgroundColor: 'rgba(255,0,0,0.2)',
                backgroundImage: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABa0lEQVQ4T33Tv0vWURTH8ZcYBIm0aogmJThE5eDekqDmIgRuIqKCDYGjbf2AoKlCVBAnCSdRwU3wPyhoixbJamiOaLCIA+fG5eujD3yH555z3vd8PvecNmd/VzGHR/iOH7iNT1jDfl3S1qgfxwpmcYS/VbwTMxkbTbgaMIX7WMBpi87K0fXspj8gBTCAVYw0bj2PE5Bd3C2AHTzGSVZMYwt/KkIf4qLDPFvC5wCEtneYqJInEX7MJySK11P/t8wLs7cCcA938LrRb4E8T3lhbCkuqScBeIh2bLcQHE/5NLRW8uq0gwCM4Ro2GoDSdpg1XMmp094HoAfLWGwYVmtuehKp0fXH8grHGMTvhLzFy4bmgFzJ14m0B7hRAPFnCM8uGKA6dDknsbeexE3s5XcR51J2EZ4d1oDQFLpjmF7hVwvKzZyZF+Wi5jJFTSzKm1ymD/iJ7jz/iif4UuCtACXWhVvoyJUOWDH5f3P/ALwNScZauIwdAAAAAElFTkSuQmCC)'
            }, btnStyles),
            updateBtnStyle: Object.assign({
                backgroundColor: 'rgba(255,255,0,0.5)',
                backgroundImage: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA90lEQVQ4T6XTO0oEQRSF4W8CE8HERYjG4gM0MTSbQBegkTsw8hGYCQMG4mMBs4YZYzUUMVbMFMFExEciSEldaJqemW6spJL+/zp163TLP1erIT+HbWzhNbFNBPM4xwYuMJMkdQUJvsQKrjCV9+k6gjh5NSfYwS2O0B8lCHgJH5hAF0+4x+EwwQLOEHDM+wBvCR42xEFwiv8d8CDBIk4rTt7FVxGuEiT4BMv5zhF7D59luCxoDBcF43hGeqrrQjv3c5K/gVWteIVU0TWso407jISLCTbxktt1gx4eq+5cThEJOpjMRRlLDcNxnR8tBLN4xwN+6oDxzS/p9TduQiAy4gAAAABJRU5ErkJggg==)'
            }, btnStyles),
            saveBtnStyle: Object.assign({
                backgroundColor: 'rgba(50,205,50,0.5)',
                backgroundImage: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABPElEQVQ4T53TTyilYRTH8c+NspBskaYRykKGnaXNqGFmqWwlKRaTWZqlrCwmSihZSRYSym7KSlmNmt1kI1cWs5YsJJ163np7771yPfUs3nPe8z2/5/wpqTytmME87vAfA/iHTZzkQ0qF+HGsYxpneM75WzCVfF8SXB4wic+YxVMVZZnpY1LTFZAM0IsNjBayRtACfhWAATnCYAY4xHeUq2TeR6grnh+4CkC8bQ/fasiuBYhi7wZgBJ+wWicgfi8HYAIurl(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAn0lEQVQ4T92RzQnDMAyFP69RSsgW/VkgAySBTpFJskcptNeskHaPTJAJwqM2mGBjXXqpLhLi+ZP07PjGGah9bUkTsErovPoJtJaXXvMGGkFygB4QNITqzvfCoFkQK0Anaup+094KiDeJT80CPsCS8OQCHKJ+FmD18zeAR2F8BegURXKDYGyOcwPufw54FUw8Aqe9BwNwtX5+pBtLjheZG7dCJu50EjXIAAAAAElFTkSuQmCC)'
            }, btnStyles),
            oddTableRowStyles: { backgroundColor: 'rgba(100,149,237, 0.1)' },
            headerStyle: Object.assign({ textAlign: 'right', wordBreak: 'break-word' }, tableCellStyle),
            tableCellStyle: tableCellStyle,
            inputStyles: inputStyles,
            inputReadOnlyStyles: Object.assign({ backgroundColor: 'gainsboro' }, inputStyles),

        }

        if (this.state.inEditMode) {
            updateBtn = (<a href="javascript:void(0)" title="Save" style={styles.saveBtnStyle} onClick={this.onUpdateClick.bind(this) }>Save</a>);
            valueElement = (<input style={styles.inputStyles} id={this.inputId} value={this.state.itemInputValue} onChange={this.onValueInputChange.bind(this) } />);
        } else {
            updateBtn = (<a href="javascript:void(0)" title="Edit" style={styles.updateBtnStyle} onClick={this.onUpdateBtnClick.bind(this) } >Edit</a>);
            valueElement = (<input style={styles.inputReadOnlyStyles} id={this.inputId} value={this.state.itemInputValue} onChange={this.onValueInputChange.bind(this) } readOnly />);
        }

        if (Math.abs(this.props.itemIndex % 2) !== 1) {
            tableRowStyles = styles.oddTableRowStyles;
        }

        return <tr style={tableRowStyles}>
            <th style={styles.headerStyle}>
                {this.props.item.key}:
            </th>
            <td style={styles.tableCellStyle}>
                {valueElement}
            </td>
            <td style={styles.tableCellStyle}>
                {updateBtn}
            </td>
            <td style={styles.tableCellStyle}>
                <a href="javascript:void(0)" style={styles.deleteBtnStyle} onClick={this.onDeleteClick.bind(this) } title="Delete">Delete</a>
            </td>
        </tr>;
    }
}