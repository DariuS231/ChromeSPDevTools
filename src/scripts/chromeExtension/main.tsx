/// <reference path="../../../typings/index.d.ts"/>

import * as React from "react";
import * as ReactDOM from "react-dom";
import PopUp from './popUp'


const manifestData = chrome.runtime.getManifest();

ReactDOM.render(<PopUp currentVerion={manifestData.version}/>, document.getElementById('popUpContent'));
