/// <reference path="../../../../typings/index.d.ts"/>
/// <reference path="./interfaces.ts"/>
import * as React from 'react';
//import { NewKeyValueItemStyles as styles} from './styles'

interface NewKeyValueItemState {
    newKey: string,
    newValue: string
}
interface NewKeyValueItemProps {
    moduleTitle: string,
    keyDisplayName: string,
    valueDisplayName: string,
    onNewItemClick: any
}

export default class NewKeyValueItem extends React.Component<NewKeyValueItemProps, NewKeyValueItemState> {
    constructor() {
        super();
        this.state = {
            newKey: '',
            newValue: ''
        };
    }
    private addBtnClick(e: any) {
        this.props.onNewItemClick(this.state.newKey, this.state.newValue);
        this.setState({
            newKey: '',
            newValue: ''
        } as NewKeyValueItemState);
    }
    private onKeyInputChange(e: any) {
        this.setState({ newKey: e.target.value } as NewKeyValueItemState);
    }

    private onValueInputChange(e: any) {
        this.setState({ newValue: e.target.value } as NewKeyValueItemState);
    }
    public render() {
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
        let styles = {
            btnStylePlus: Object.assign({
                backgroundColor: 'rgba(30,144,255,0.5)',
                backgroundImage: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABPElEQVQ4T53TTyilYRTH8c+NspBskaYRykKGnaXNqGFmqWwlKRaTWZqlrCwmSihZSRYSym7KSlmNmt1kI1cWs5YsJJ163np7771yPfUs3nPe8z2/5/wpqTytmME87vAfA/iHTZzkQ0qF+HGsYxpneM75WzCVfF8SXB4wic+YxVMVZZnpY1LTFZAM0IsNjBayRtACfhWAATnCYAY4xHeUq2TeR6grnh+4CkC8bQ/fasiuBYhi7wZgBJ+wWicgfi8HYAINiExxDgqgYVzkbOe5mpwGYAwd2H6Hgj8B6MQi5uoEhOq/WReu0YfHOrrwFd0ZID6GsPRGQFOaxA/5SdzBcbqvDKLGaF+q2e88IN60lYZpBQ9VKD1pZpazRMVliphYlLW0TJe4R3uy3+InbjJ4NUDma0M/mtNKB6yiyC9HfD7GeS3R8QAAAABJRU5ErkJggg==)'
            }, btnStyles),
            divStyle: {
                display: 'inline-block',
                width: '44%'
            },
            labelStyle: {
                display: 'block'
            },
            inputStyle: {
                width: '95%'
            }
        }
        return <div>
            <h2>{this.props.moduleTitle}</h2>
            <div style={styles.divStyle}>
                <label style={styles.labelStyle} htmlFor="newKey">{this.props.keyDisplayName}: </label>
                <input style={styles.inputStyle} id="newKey" value={this.state.newKey} onChange={this.onKeyInputChange.bind(this) } />
            </div>
            <div style={styles.divStyle}>
                <label style={styles.labelStyle} htmlFor="newValue">{this.props.valueDisplayName}: </label>
                <input style={styles.inputStyle} id="newValue" value={this.state.newValue} onChange={this.onValueInputChange.bind(this) } />
            </div>
            <a href="javascript:void(0)" style={styles.btnStylePlus} onClick={this.addBtnClick.bind(this) }>Add</a>
        </div>;
    }
}