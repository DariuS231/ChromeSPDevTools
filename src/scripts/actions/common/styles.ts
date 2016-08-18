
import Utils from './utils';

let divContainer = {
    padding: '5px',
    margin: 0
}

let btnStyles = {
    display: 'inline-block',
    height: '16px',
    borderRadius: '5px',
    padding: '3px 10px 4px 25px',
    margin: '5px',
    backgroundPosition: '10% 50%',
    backgroundRepeat: 'no-repeat',
    textDecoration: 'none',
    color: 'black',
    fontWeight: 'bold'
}

let tableCellStyle = {
    padding: '5px'
}

let inputStyles = {
    width: '240px'
}

export let SpPropertyBagStyles = {
    contentStyles: {
        overflow: 'auto',
        height: '90%'
    },
    tableStyles: {
        borderSpacing: 0,
        borderCollapse: 'collapse',
        width: '100%'
    },
    tableContainer: {
        marginTop: '6.5px'
    }
}

export let KeyValueItemStyles = {
    deleteBtnStyle: Utils.mergeObjects({
        backgroundColor: 'rgba(255,0,0,0.2)',
        backgroundImage: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABa0lEQVQ4T33Tv0vWURTH8ZcYBIm0aogmJThE5eDekqDmIgRuIqKCDYGjbf2AoKlCVBAnCSdRwU3wPyhoixbJamiOaLCIA+fG5eujD3yH555z3vd8PvecNmd/VzGHR/iOH7iNT1jDfl3S1qgfxwpmcYS/VbwTMxkbTbgaMIX7WMBpi87K0fXspj8gBTCAVYw0bj2PE5Bd3C2AHTzGSVZMYwt/KkIf4qLDPFvC5wCEtneYqJInEX7MJySK11P/t8wLs7cCcA938LrRb4E8T3lhbCkuqScBeIh2bLcQHE/5NLRW8uq0gwCM4Ro2GoDSdpg1XMmp094HoAfLWGwYVmtuehKp0fXH8grHGMTvhLzFy4bmgFzJ14m0B7hRAPFnCM8uGKA6dDknsbeexE3s5XcR51J2EZ4d1oDQFLpjmF7hVwvKzZyZF+Wi5jJFTSzKm1ymD/iJ7jz/iif4UuCtACXWhVvoyJUOWDH5f3P/ALwNScZauIwdAAAAAElFTkSuQmCC)'
    }, btnStyles),
    updateBtnStyle: Utils.mergeObjects({
        backgroundColor: 'rgba(255,255,0,0.5)',
        backgroundImage: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA90lEQVQ4T6XTO0oEQRSF4W8CE8HERYjG4gM0MTSbQBegkTsw8hGYCQMG4mMBs4YZYzUUMVbMFMFExEciSEldaJqemW6spJL+/zp163TLP1erIT+HbWzhNbFNBPM4xwYuMJMkdQUJvsQKrjCV9+k6gjh5NSfYwS2O0B8lCHgJH5hAF0+4x+EwwQLOEHDM+wBvCR42xEFwiv8d8CDBIk4rTt7FVxGuEiT4BMv5zhF7D59luCxoDBcF43hGeqrrQjv3c5K/gVWteIVU0TWso407jISLCTbxktt1gx4eq+5cThEJOpjMRRlLDcNxnR8tBLN4xwN+6oDxzS/p9TduQiAy4gAAAABJRU5ErkJggg==)'
    }, btnStyles),
    saveBtnStyle: Utils.mergeObjects({
        backgroundColor: 'rgba(50,205,50,0.5)',
        backgroundImage: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABPElEQVQ4T53TTyilYRTH8c+NspBskaYRykKGnaXNqGFmqWwlKRaTWZqlrCwmSihZSRYSym7KSlmNmt1kI1cWs5YsJJ163np7771yPfUs3nPe8z2/5/wpqTytmME87vAfA/iHTZzkQ0qF+HGsYxpneM75WzCVfF8SXB4wic+YxVMVZZnpY1LTFZAM0IsNjBayRtACfhWAATnCYAY4xHeUq2TeR6grnh+4CkC8bQ/fasiuBYhi7wZgBJ+wWicgfi8HYAIurl(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAn0lEQVQ4T92RzQnDMAyFP69RSsgW/VkgAySBTpFJskcptNeskHaPTJAJwqM2mGBjXXqpLhLi+ZP07PjGGah9bUkTsErovPoJtJaXXvMGGkFygB4QNITqzvfCoFkQK0Anaup+094KiDeJT80CPsCS8OQCHKJ+FmD18zeAR2F8BegURXKDYGyOcwPufw54FUw8Aqe9BwNwtX5+pBtLjheZG7dCJu50EjXIAAAAAElFTkSuQmCC)'
    }, btnStyles),
    oddTableRowStyles: { backgroundColor: 'rgba(100,149,237, 0.1)' },
    headerStyle: Utils.mergeObjects({ textAlign: 'right', wordBreak: 'break-word' }, tableCellStyle),
    tableCellStyle: tableCellStyle,
    inputStyles: inputStyles,
    inputReadOnlyStyles: Utils.mergeObjects({ backgroundColor: 'gainsboro' }, inputStyles),

}

export let NewKeyValueItemStyles = {
    btnStylePlus: Utils.mergeObjects({
        backgroundColor: 'rgba(30,144,255,0.5)',
        backgroundImage: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABPElEQVQ4T53TTyilYRTH8c+NspBskaYRykKGnaXNqGFmqWwlKRaTWZqlrCwmSihZSRYSym7KSlmNmt1kI1cWs5YsJJ163np7771yPfUs3nPe8z2/5/wpqTytmME87vAfA/iHTZzkQ0qF+HGsYxpneM75WzCVfF8SXB4wic+YxVMVZZnpY1LTFZAM0IsNjBayRtACfhWAATnCYAY4xHeUq2TeR6grnh+4CkC8bQ/fasiuBYhi7wZgBJ+wWicgfi8HYAINiExxDgqgYVzkbOe5mpwGYAwd2H6Hgj8B6MQi5uoEhOq/WReu0YfHOrrwFd0ZID6GsPRGQFOaxA/5SdzBcbqvDKLGaF+q2e88IN60lYZpBQ9VKD1pZpazRMVliphYlLW0TJe4R3uy3+InbjJ4NUDma0M/mtNKB6yiyC9HfD7GeS3R8QAAAABJRU5ErkJggg==)'
    }, btnStyles),
    divStyle: {
        display: 'inline-block',
        width: '44%'
    },
    labelStyle: {
        display: 'block'
    },
    inputStyle: {
        width: '95%'
    }
}

export let MessageBarStyles = {
    span: {
        margin: 0,
        padding: 0
    },
    Error: Utils.mergeObjects({
        backgroundColor: 'rgba(255, 0, 0, 0.6)',
        border: '1px rgb(255, 0, 0,) solid'
    }, divContainer),
    Success: Utils.mergeObjects({
        backgroundColor: 'rgba(49, 149, 36, 0.6)',
        border: '1px rgb(49, 149, 36) solid'
    }, divContainer),
    Info: Utils.mergeObjects({
        backgroundColor: 'rgba(10, 117, 224, 0.6)',
        border: '1px rgb(10, 117, 224) solid'
    }, divContainer)
}

export let WorkingOnItStyles = {
    workingOnItContStyles: {
        overflow: 'auto',
        height: '90%',
        width: '100%',
        textAlign: 'center',
        verticalAlign: 'middle',
        marginTop: '6.5px'
    },
    workingOnItItemsStyles: {
        display: 'inline-block',
        verticalAlign: 'middle',
        margin: '20px'
    }
};

export let SpCustomModalWrapperStyles = {
    hidden: {
        display: 'none',
    },
    modalContainerDivStyles: {
        width: '100%',
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.5)',
        top: 0,
        bottom: 0,
        zIndex: 99991
    },
    divModalStyles: {
        background: 'white',
        width: '60%',
        height: '94%',
        margin: '10px auto',
        position: 'relative',
        padding: '10px',
        borderRadius: '5px'
    },
    linkBtnStyles: {
        top: 0,
        right: 0,
        position: 'absolute',
        height: '25px',
        width: '25px',
        backgroundColor: 'lightgrey',
        color: 'black',
        textAlign: 'center',
        verticalAlign: 'middle',
        fontSize: 'larger',
        borderRadius: '0 5px'
    }
}
