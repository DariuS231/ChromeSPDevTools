import * as React from "react";

interface IIconButtonProps {
    onClick: React.EventHandler<React.MouseEvent<HTMLAnchorElement>>;
    title: string;
    text?: string;
    icon: string;
    disabled?: boolean;
}
export const IconButton: React.StatelessComponent<IIconButtonProps> = (props: IIconButtonProps) => (
    <a title={props.title} aria-label={props.title} className="ms-Button ms-Button--icon"
        onClick={props.onClick} disabled={typeof props.disabled === "undefined" ? false : props.disabled}>
        <span className="ms-Button-icon">
            <i className={"ms-Icon ms-Icon--" + props.icon} />
        </span>
        <span className="ms-Button-label" > {props.text}</span>
    </a>
);
