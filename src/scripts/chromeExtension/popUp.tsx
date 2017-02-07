import { List } from "office-ui-fabric-react/lib/List";
import * as React from "react";
import ActionItem from "./ActionItem";

import "./styles/chromeExtePopUp.scss";

interface IActionData {
    title: string;
    descriptio: string;
    image: string;
    scriptUrl: string;
};

interface IPopUpProps {
    currentVerion: string;
}
interface IPopUpState {
    actions: IActionData[];
}

export default class PopUp extends React.Component<IPopUpProps, IPopUpState> {
    constructor() {
        super();
        this.state = { actions: [] };
    }
    public render() {
        return <div className="container">
            <span className="ms-font-xxl ms-fontColor-themePrimary ms-fontWeight-semibold">Chrome SP Dev Tools</span>
            <hr />
            <List items={this.state.actions} onRenderCell={this.renderItem} />
            <div className="ms-font-mi ms-fontWeight-light tool-version" >
                <span>Version {this.props.currentVerion}</span>
            </div>
        </div>;
    }
    public getActions() {
        const that: any = this;
        const xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open("GET", "data/actions.json", true);
        xobj.onreadystatechange = () => {
            if (xobj.readyState === 4 && xobj.status === 200) {
                const data = JSON.parse(xobj.responseText);
                that.setState({ actions: data });
            }
        };
        xobj.send(null);

    }
    protected componentDidMount() {
        this.getActions();
    }
    private renderItem(item: IActionData, index: number) {
        return <ActionItem item={item} key={index} />;
    }
}
