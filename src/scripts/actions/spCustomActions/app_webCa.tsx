import { App } from "./app";
import { CustomActionType } from "./constants/enums";
import { constants } from "./constants/constants";

const modalTitle = constants.MODAL_WEB_CA_DIALOG_TITLE;
const divId = constants.COMPONENT_WEB_CA_DIV_ID;
const caType = CustomActionType.Web;

window.SpWebCustomActionsObj = new App(modalTitle, divId, caType);
window.SpWebCustomActionsObj.show();

