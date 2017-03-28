import * as React from "react";

interface IIconLinkProps {
    href: string;
    title: string;
    text?: string;
    icon: string;
    linkTarget: string;

}
export const IconLink: React.StatelessComponent<IIconLinkProps> = (props: IIconLinkProps) => (
    <a target={props.linkTarget} href={props.href} title={props.title} className="ms-ListItem-action" >
        <i className={`ms-Icon ms-Icon--${props.icon}`} /> {props.text}
    </a>
);
