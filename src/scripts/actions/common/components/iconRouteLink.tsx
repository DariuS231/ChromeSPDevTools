import * as React from "react";
import { Link } from "react-router";

interface IIconRouteLinkProps {
    route: string;
    title: string;
    text?: string;
    icon: string;
}
export const IconRouteLink: React.StatelessComponent<IIconRouteLinkProps> = (props: IIconRouteLinkProps) => (
    <Link title={props.title} aria-label={props.title} className="ms-Button ms-Button--icon" to={props.route}>
        <span className="ms-Button-icon">
            <i className={"ms-Icon ms-Icon--" + props.icon} />
        </span>
        <span className="ms-Button-label" > {props.text}</span>
    </Link>
);
