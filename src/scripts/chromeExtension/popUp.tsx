import { List } from "office-ui-fabric-react/lib/List";
import { Spinner, SpinnerType } from "office-ui-fabric-react/lib/Spinner";
import * as React from "react";
import ActionItem from "./ActionItem";
import "./styles/chromeExtePopUp.scss";

interface IActionData {
    title: string;
    description: string;
    image: string;
    scriptUrl: string;
};

interface IPopUpProps {
    currentVersion: string;
}
interface IPopUpState {
    actions: IActionData[];
    stylesUrl: string;
    isSp: boolean;
    loading: boolean;
}

export default class PopUp extends React.Component<IPopUpProps, IPopUpState> {
    constructor() {
        super();
        this.state = { actions: [], stylesUrl: "", loading: true, isSp: false };
        this.renderItem = this.renderItem.bind(this);
        this.actions = this.actions.bind(this);
    }
    public render() {
        if (this.state.loading) {
            return this.loading();
        } else if (!this.state.isSp) {
            return this.notSpSite();
        } else {
            return this.actions();
        }
    }

    public componentDidMount() {
        this.checkIfSharePoint().then((isSp: boolean) => {
            if (isSp) {
                this.getActions();
            } else {
                this.setState({ isSp: false, loading: false } as IPopUpState);
            }
        });
    }
    private actions() {
        return (
            <div className="container">
                <span className="ms-font-xl ms-fontColor-themePrimary ms-fontWeight-semibold">Chrome SP Dev Tools</span>
                <hr />
                <List items={this.state.actions} onRenderCell={this.renderItem} renderedWindowsAhead={4} />
                <div className="ms-font-mi ms-fontWeight-light tool-version" >
                    <span>Version {this.props.currentVersion}</span>
                </div>
            </div>
        );
    }
    private loading() {
        return (
            <div className="container">
                <Spinner type={SpinnerType.large} label="Making sure everything is in order..." />
            </div>
        );
    }
    private notSpSite() {
        return (
            <div className="container">
                <span className="ms-font-xl ms-fontColor-themePrimary ms-fontWeight-semibold">
                    Not a SharePoint site
                </span>
                <hr />
                <div className="ms-font-m ms-fontWeight-light tool-version" >
                    <span>
                        Try opening the tool on a SharePoint Tab
                    </span>
                </div>
            </div>
        );
    }
    private getActions() {
        const that: any = this;
        const xobj: XMLHttpRequest = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open("GET", "data/actions.json", true);
        xobj.onreadystatechange = () => {
            if (xobj.readyState === 4 && xobj.status === 200) {
                const data = JSON.parse(xobj.responseText);
                that.setState({ actions: data.actions, stylesUrl: data.stylesUrl, isSp: true, loading: false });
            }
        };
        xobj.send(null);

    }
    private renderItem(item: IActionData, index: number) {
        return <ActionItem item={item} key={index} stylesUrl={this.state.stylesUrl} />;
    }
    private checkIfSharePoint(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const codeStr: string = `(function () {
                var requestUrl = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1);
                requestUrl += '_api/contextinfo';
                var request = new XMLHttpRequest();
                request.open("POST", requestUrl, false);
                request.setRequestHeader("Accept", "application/json, text/javascript");
                request.send(null);
                var response;

                if (request.status === 200) {
                    response = request.responseText;
                }
                try{
                    var data  = JSON.parse(response);
                    if(data.FormDigestValue && data.WebFullUrl && data.SiteFullUrl){
                        return { formDigestValue: data.FormDigestValue, webFullUrl: data.WebFullUrl,siteFullUrl: data.SiteFullUrl};
                    }else{
                        return false;
                    }
                } catch(a){
                    return false;
                }
            })();`;
            chrome.tabs.query({ active: true, currentWindow: true }, (tab) => {
                chrome.tabs.executeScript(tab[0].id, {
                    code: codeStr
                }, (retValue) => {
                    resolve(!!retValue && retValue[0]);
                });
            });
        });
    }
}
