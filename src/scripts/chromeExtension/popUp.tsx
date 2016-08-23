/// <reference path="../../../typings/index.d.ts"/>

import * as React from 'react';
import ActionItem from './ActionItem'

interface PopUpProps {

}
interface PopUpState {

}

export default class PopUp extends React.Component<PopUpProps, PopUpState> {


    public render() {
        let options = [
            {
                "title": "Property Bag Admin",
                "descriptio": "Property Bag Admin",
                "image": "/images/sp-bag-32.png",
                "scriptUrl": "https://rawgit.com/DariuS231/ChromeSPPropertiesAdmin/master/dist/actions/SpPropertyBag/SpPropertyBag.js"
            },
            {
                "title": "Option 2",
                "descriptio": "Option 2",
                "image": "/images/sp-bag-32.png",
                "scriptUrl": "https://rawgit.com/DariuS231/ChromeSPPropertiesAdmin/master/dist/actions/SpPropertyBag/SpPropertyBag.js"
            },
            {
                "title": "Option 3",
                "descriptio": "Option 3",
                "image": "/images/sp-bag-32.png",
                "scriptUrl": "https://rawgit.com/DariuS231/ChromeSPPropertiesAdmin/master/dist/actions/SpPropertyBag/SpPropertyBag.js"
            },
            {
                "title": "Option 4",
                "descriptio": "Option 4",
                "image": "/images/sp-bag-32.png",
                "scriptUrl": "https://rawgit.com/DariuS231/ChromeSPPropertiesAdmin/master/dist/actions/SpPropertyBag/SpPropertyBag.js"
            }
        ];

        let opts: any = options.map((opt: any, index: number) => {
            return (<ActionItem item={opt} key={index} />);
        });
        return <div className="container">
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <div className="navbar-brand sp-admin">
                            <img alt="Brand" src="/images/sharepoint-logotype-32.png" />
                            <span>SharePoint Admin Panel</span>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="row">
                <div className="col-md-4">
                    <div className="list-group">
                        {opts}
                    </div>
                </div>
            </div>
        </div>
    }
}