import { Spinner, SpinnerType } from "office-ui-fabric-react/lib/Spinner";
import * as React from "react";
import { constants } from "../constants";

export const WorkingOnIt = () => (
    <div className="working-on-it-wrapper">
        <Spinner type={SpinnerType.large} label={constants.WORKING_ON_IT_TEXT} />
    </div>
);
