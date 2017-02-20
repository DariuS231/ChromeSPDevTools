
import { createMemoryHistory, useRouterHistory } from "react-router";
class SpCustomActionsHistory{

    private _history: any;
    public get History(): any {
        return this._history;
    }

    constructor() {
        this._history = useRouterHistory(createMemoryHistory)({ queryKey: false });
    }
}
export const spCustomActionsHistory = new SpCustomActionsHistory();
