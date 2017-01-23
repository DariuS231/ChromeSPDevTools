import * as React from 'react';

interface IconLinkProps {
    href: string,
    title: string,
    text?: string,
    icon: string,
    linkTarget: string

}
export const IconLink: React.StatelessComponent<IconLinkProps> = (props: IconLinkProps) => (
    <a target={props.linkTarget}
        href={props.href}
        title={props.title}
        className="ms-ListItem-action">
        <i className={`ms-Icon ms-Icon--${props.icon}`}>
        </i> {props.text}
    </a>
);
