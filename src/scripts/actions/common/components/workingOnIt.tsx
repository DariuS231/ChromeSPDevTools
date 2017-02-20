
import {
  Spinner,
  SpinnerType
} from "office-ui-fabric-react/lib/Spinner";
import * as React from "react";

export const  WorkingOnIt = () => <div className="working-on-it-wrapper">
    <Spinner type={ SpinnerType.large } label="Working on it..." />
</div>;
