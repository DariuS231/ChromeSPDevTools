// tslint:disable-next-line:no-reference
/// <reference path="../../../../typings/index.d.ts" />

import { App } from "./app";
import { constants } from "./constants/constants";
import { CustomActionType } from "./constants/enums";

const modalTitle = constants.MODAL_SITE_CA_DIALOG_TITLE;
const divId = constants.COMPONENT_SITE_CA_DIV_ID;
const caType = CustomActionType.Site;

window.SpSiteCustomActionsObj = new App(modalTitle, divId, caType);
window.SpSiteCustomActionsObj.show();
