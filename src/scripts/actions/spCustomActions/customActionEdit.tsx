/// <reference path="../../../../typings/index.d.ts"/>
/// <reference path="./../common/styles.ts"/>
/// <reference path="./../common/interfaces.ts"/>

import * as React from 'react';
import { CustomActionItemStyles as styles } from './../common/Styles'

interface CustomActionEditProps {
    item: ICustomAction
}
interface CustomActionEditState {
    item: ICustomAction
}

export default class CustomActionEdit extends React.Component<CustomActionEditProps, CustomActionEditState> {

    constructor() {
        super();
        this.state = {
            item: {} as ICustomAction
        };
    }

    componentDidMount() {
        this.setState({
            item: this.props.item
        });
    }
    private createCustomAction() {
        let ctx: SP.ClientContext = SP.ClientContext.get_current();
        let web: SP.Web = ctx.get_web();
        let ca: SP.UserCustomAction = web.get_userCustomActions().add();
        ca.set_title(this.state.item.title);
        ca.set_name(this.state.item.name);
        ca.set_description(this.state.item.description);
        ca.set_sequence(this.state.item.sequence);
        ca.set_location('ScriptLink');
        if (this.state.item.location === 'ScriptLink') {
            ca.set_scriptSrc(this.state.item.scriptSrc);
        } else {
            ca.set_scriptBlock(this.state.item.scriptBlock);
        }
        ca.update();
        web.update();
        ctx.load(ca);
        ctx.executeQueryAsync(function (a, b) {
            console.log("Created");
        }, function (a, b) {
            console.log("ERROR");
        });
    }
    private updateCustomAction() {
        let caGuid: SP.Guid = new SP.Guid(this.props.item.id);
        let ctx: SP.ClientContext = SP.ClientContext.get_current();
        let web: SP.Web = ctx.get_web();

        let ca: SP.UserCustomAction = web.get_userCustomActions().getById(caGuid);
        ca.set_title(this.state.item.title);
        ca.set_name(this.state.item.name);
        ca.set_description(this.state.item.description);
        ca.set_sequence(this.state.item.sequence);
        ca.set_location('ScriptLink');
        if (this.state.item.location === 'ScriptLink') {
            ca.set_scriptSrc(this.state.item.scriptSrc);
            ca.set_scriptBlock('');
        } else {
            ca.set_scriptSrc('');
            ca.set_scriptBlock(this.state.item.scriptBlock);
        }
        ca.update();
        web.update();
        ctx.load(ca);
        ctx.executeQueryAsync(function (a, b) {
            console.log("Created");
        }, function (a, b) {
            console.log("ERROR");
        });
    }
    private inputChange(propertyName: string, e: any) {
        let newItem = this.state.item;
        newItem[propertyName] = e.target.value;
        this.setState({ item: newItem });
    }

    private locationInputChange(e: any) {
        if (e.target.checked) {
            let newItem = this.state.item;
            newItem.location = e.target.value;
            this.setState({ item: newItem });
        }
    }
    public render() {
        let script = (this.state.item.location === 'ScriptLink')
            ? (<input type="text" value={this.state.item.scriptSrc} onChange={this.inputChange.bind(this, 'scriptSrc') } />)
            : (<textarea type="text" value={this.state.item.scriptBlock} onChange={this.inputChange.bind(this, 'scriptBlock') } />);
        let inputStyle: any = {
            background: 'transparent',
            width: '95%'
        };
        return (
            <div style={styles.divContainer}>
                <h2 style={styles.itemTitle}>
                    <input type="text" value={this.state.item.name} style={inputStyle} onChange={this.inputChange.bind(this, 'name') } />
                </h2>
                <p style={{ fontStyle: 'italic', marginTop: '0px', color: 'gray' }}>
                    <input type="text" value={this.state.item.description} style={inputStyle} onChange={this.inputChange.bind(this, 'description') } />
                </p>
                <p style={styles.totalItems}>
                    Location:
                    <input type="checkbox" name="spLocation" value="ScriptLink" checked={this.state.item.location === 'ScriptLink'} onChange={this.locationInputChange.bind(this) }/>
                    <input type="checkbox" name="spLocation" value="ScriptBlock" checked={this.state.item.location === 'ScriptBlock'} onChange={this.locationInputChange.bind(this) }/>
                </p>
                <p style={styles.totalItems}>Sequence: <input type="number" value={this.state.item.sequence}  style={inputStyle}  onChange={this.inputChange.bind(this, 'sequence') }/></p>
                { script }
            </div>);
    }
}
