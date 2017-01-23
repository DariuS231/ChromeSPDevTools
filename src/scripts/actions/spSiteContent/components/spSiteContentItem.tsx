import * as React from 'react';
import { Image, ImageFit } from 'office-ui-fabric-react/lib/Image';
import { IconLink } from './../../common/components/iconLink';
import { SpSiteContentConstants as constants } from './../constants/spSiteContentConstants';

interface SpSiteContentItemProps {
    item: ISiteContent,
    linkTarget: string
}

export const SpSiteContentItem: React.StatelessComponent<SpSiteContentItemProps> = (props: SpSiteContentItemProps) => (
    <div className='ms-ListBasicExample-itemCell'
        data-is-focusable={true}>
        <Image src={props.item.imageUrl}
            width={constants.itemImageWidth} height={constants.itemImageHeight}
            className={'ms-ListBasicExample-itemImage' + (props.item.hidden ? ' hidden-spList' : '')} />
        <div className='ms-ListBasicExample-itemContent'>
            <a title={props.item.title} alt={props.item.title} href={props.item.listUrl}
                className='ms-ListBasicExample-itemName ms-font-l ms-fontColor-themePrimary ms-fontWeight-semibold'
                target={props.linkTarget}>
                {props.item.title}
            </a>
            <div className='ms-ListBasicExample-itemIndex'>
                {`${props.item.itemCount} Items`}
            </div>
            {
                props.item.newFormUrl
                    ? <IconLink title="New Item" text="New Item" icon="AddTo"
                        href={props.item.newFormUrl} linkTarget={props.linkTarget} />
                    : null
            }
        </div>
        <div className="ms-ListItem-actions">
            <IconLink title="Settings" href={props.item.settingsUrl}
                icon="Settings" linkTarget={props.linkTarget} />
            <IconLink title={`Permissions: ${props.item.title}`} href={props.item.permissionsPageUrl}
                icon="SecurityGroup" linkTarget={props.linkTarget} />
        </div>
    </div>
);