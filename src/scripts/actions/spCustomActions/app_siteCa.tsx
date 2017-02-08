import { App } from "./app";
import { CustomActionType } from "./constants/enums";
import { constants } from "./constants/constants";

const modalTitle = constants.MODAL_SITE_CA_DIALOG_TITLE;
const divId = constants.COMPONENT_SITE_CA_DIV_ID;
const caType = CustomActionType.Site;

window.SpSiteCustomActionsObj = new App(modalTitle, divId, caType);
window.SpSiteCustomActionsObj.show();

