/// <reference path="../../../../typings/index.d.ts"/>
/// <reference path="./interfaces.tsx"/>
import * as React from 'react';

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
    private getImageStyles(imageUrl: string, bgColor: string) {
        return {
            display: 'inline-block',
            height: '16px',
            borderRadius: '5px',
            padding: '3px 10px 4px 25px',
            margin: '5px',
            backgroundPosition: '10% 50%',
            backgroundRepeat: 'no-repeat',
            textDecoration: 'none',
            color:'black',
            fontWeight: 'bold',
            backgroundColor: bgColor,
            backgroundImage: imageUrl
        }
    }
    public render() {
        let tableRowStyles: any = {};
        let updateBtn: any;
        let valueElement: any;

        let deleteBtnStyle = this.getImageStyles('url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABa0lEQVQ4T33Tv0vWURTH8ZcYBIm0aogmJThE5eDekqDmIgRuIqKCDYGjbf2AoKlCVBAnCSdRwU3wPyhoixbJamiOaLCIA+fG5eujD3yH555z3vd8PvecNmd/VzGHR/iOH7iNT1jDfl3S1qgfxwpmcYS/VbwTMxkbTbgaMIX7WMBpi87K0fXspj8gBTCAVYw0bj2PE5Bd3C2AHTzGSVZMYwt/KkIf4qLDPFvC5wCEtneYqJInEX7MJySK11P/t8wLs7cCcA938LrRb4E8T3lhbCkuqScBeIh2bLcQHE/5NLRW8uq0gwCM4Ro2GoDSdpg1XMmp094HoAfLWGwYVmtuehKp0fXH8grHGMTvhLzFy4bmgFzJ14m0B7hRAPFnCM8uGKA6dDknsbeexE3s5XcR51J2EZ4d1oDQFLpjmF7hVwvKzZyZF+Wi5jJFTSzKm1ymD/iJ7jz/iif4UuCtACXWhVvoyJUOWDH5f3P/ALwNScZauIwdAAAAAElFTkSuQmCC)', 'rgba(255,0,0,0.2)');

        if (this.state.inEditMode) {
            let updateBtnStyle = this.getImageStyles('url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAn0lEQVQ4T92RzQnDMAyFP69RSsgW/VkgAySBTpFJskcptNeskHaPTJAJwqM2mGBjXXqpLhLi+ZP07PjGGah9bUkTsErovPoJtJaXXvMGGkFygB4QNITqzvfCoFkQK0Anaup+094KiDeJT80CPsCS8OQCHKJ+FmD18zeAR2F8BegURXKDYGyOcwPufw54FUw8Aqe9BwNwtX5+pBtLjheZG7dCJu50EjXIAAAAAElFTkSuQmCC)', 'rgba(50,205,50,0.5)');

            updateBtn = (<a href="javascript:void(0)" title="Save" style={updateBtnStyle} onClick={this.onUpdateClick.bind(this) }>Save</a>);
            valueElement = (<input style={{ width: '240px' }} id={this.inputId} value={this.state.itemInputValue} onChange={this.onValueInputChange.bind(this) } />);
        } else {
            let updateBtnStyle = this.getImageStyles('url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA90lEQVQ4T6XTO0oEQRSF4W8CE8HERYjG4gM0MTSbQBegkTsw8hGYCQMG4mMBs4YZYzUUMVbMFMFExEciSEldaJqemW6spJL+/zp163TLP1erIT+HbWzhNbFNBPM4xwYuMJMkdQUJvsQKrjCV9+k6gjh5NSfYwS2O0B8lCHgJH5hAF0+4x+EwwQLOEHDM+wBvCR42xEFwiv8d8CDBIk4rTt7FVxGuEiT4BMv5zhF7D59luCxoDBcF43hGeqrrQjv3c5K/gVWteIVU0TWso407jISLCTbxktt1gx4eq+5cThEJOpjMRRlLDcNxnR8tBLN4xwN+6oDxzS/p9TduQiAy4gAAAABJRU5ErkJggg==)', 'rgba(255,255,0,0.5)');
            updateBtn = (<a href="javascript:void(0)" title="Edit" style={updateBtnStyle} onClick={this.onUpdateBtnClick.bind(this) } >Edit</a>);
            valueElement = (<input style={{ width: '240px', backgroundColor: 'gainsboro' }} id={this.inputId} value={this.state.itemInputValue} onChange={this.onValueInputChange.bind(this) } readOnly />);
        }

        if (Math.abs(this.props.itemIndex % 2) !== 1) {
            tableRowStyles.backgroundColor = 'rgba(100,149,237, 0.1)';
        }
        return <tr style={tableRowStyles}>
            <th style={{ textAlign: 'right', wordBreak: 'break-word' }}>
                {this.props.item.key}:
            </th>
            <td>
                {valueElement}
            </td>
            <td>
                {updateBtn}
            </td>
            <td>
                <a href="javascript:void(0)" style={deleteBtnStyle} onClick={this.onDeleteClick.bind(this) } title="Delete">Delete</a>
            </td>
        </tr>;
    }
}