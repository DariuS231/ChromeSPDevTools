// tslint:disable-next-line:no-reference
/// <reference path="../../../../typings/index.d.ts" />

import { App } from "./app";
import { constants } from "./constants/constants";
import { CustomActionType } from "./constants/enums";

const modalTitle = constants.MODAL_WEB_CA_DIALOG_TITLE;
const divId = constants.COMPONENT_WEB_CA_DIV_ID;
const caType = CustomActionType.Web;

window.SpWebCustomActionsObj = new App(modalTitle, divId, caType);
window.SpWebCustomActionsObj.show();
