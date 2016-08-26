
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
let contentStyles = {
    overflow: 'auto',
    height: '90%'
}

export let SpPropertyBagStyles = {
    contentStyles: contentStyles,
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
    btnStylePlus: Utils.mergeObjects(btnStyles, {
        height: '25px',
        backgroundColor: 'rgba(30,144,255,0.5)',
        backgroundImage: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABPElEQVQ4T53TTyilYRTH8c+NspBskaYRykKGnaXNqGFmqWwlKRaTWZqlrCwmSihZSRYSym7KSlmNmt1kI1cWs5YsJJ163np7771yPfUs3nPe8z2/5/wpqTytmME87vAfA/iHTZzkQ0qF+HGsYxpneM75WzCVfF8SXB4wic+YxVMVZZnpY1LTFZAM0IsNjBayRtACfhWAATnCYAY4xHeUq2TeR6grnh+4CkC8bQ/fasiuBYhi7wZgBJ+wWicgfi8HYAINiExxDgqgYVzkbOe5mpwGYAwd2H6Hgj8B6MQi5uoEhOq/WReu0YfHOrrwFd0ZID6GsPRGQFOaxA/5SdzBcbqvDKLGaF+q2e88IN60lYZpBQ9VKD1pZpazRMVliphYlLW0TJe4R3uy3+InbjJ4NUDma0M/mtNKB6yiyC9HfD7GeS3R8QAAAABJRU5ErkJggg==)'
    }),
    divStyle: {
        display: 'inline-block',
        width: '44%',
        marginTop: '10px'
    },
    labelStyle: {
        display: 'block',
        fontWeight: 'bolder',
        marginBottom: '5px'
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

export let SpSiteContentStyles: any = {
    contentStyles: contentStyles,
    list: { marginTop: '6.5px', listStyle: 'none', paddingLeft: '5px' },
    checksContainer: { textAlign: 'right', marginTop: '6.5px' },
    check: { display: 'inline-block', marginRight: '20px' },
    lastCheck: { display: 'inline-block' }

}

export let SpSiteContentItemStyles: any = {
    listItem: { width: '50%', display: 'inline-block' },
    divContainer: { padding: '5px', margin: '5px', backgroundColor: 'rgba(100,149,237, 0.1)', position: 'relative', borderRadius: '5px' },
    imageItem: { width: '16px', height: '16px', verticalAlign: 'middle' },
    itemTitle: { display: 'inline-block', width: '90%', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', verticalAlign: 'middle', marginLeft: '5px' },
    totalItems: { marginTop: '2px', marginBottom: '2px' },
    settingsStyles: {
        marginTop: '2px', marginBottom: '2px', position: 'absolute', right: '10px', bottom: '5px',
        paddingLeft: '27px', backgroundPosition: '10% 50%', backgroundRepeat: 'no-repeat', backgroundImage: 'url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMS4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQ3OC43MDMgNDc4LjcwMyIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDc4LjcwMyA0NzguNzAzOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCI+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTQ1NC4yLDE4OS4xMDFsLTMzLjYtNS43Yy0zLjUtMTEuMy04LTIyLjItMTMuNS0zMi42bDE5LjgtMjcuN2M4LjQtMTEuOCw3LjEtMjcuOS0zLjItMzguMWwtMjkuOC0yOS44ICAgIGMtNS42LTUuNi0xMy04LjctMjAuOS04LjdjLTYuMiwwLTEyLjEsMS45LTE3LjEsNS41bC0yNy44LDE5LjhjLTEwLjgtNS43LTIyLjEtMTAuNC0zMy44LTEzLjlsLTUuNi0zMy4yICAgIGMtMi40LTE0LjMtMTQuNy0yNC43LTI5LjItMjQuN2gtNDIuMWMtMTQuNSwwLTI2LjgsMTAuNC0yOS4yLDI0LjdsLTUuOCwzNGMtMTEuMiwzLjUtMjIuMSw4LjEtMzIuNSwxMy43bC0yNy41LTE5LjggICAgYy01LTMuNi0xMS01LjUtMTcuMi01LjVjLTcuOSwwLTE1LjQsMy4xLTIwLjksOC43bC0yOS45LDI5LjhjLTEwLjIsMTAuMi0xMS42LDI2LjMtMy4yLDM4LjFsMjAsMjguMSAgICBjLTUuNSwxMC41LTkuOSwyMS40LTEzLjMsMzIuN2wtMzMuMiw1LjZjLTE0LjMsMi40LTI0LjcsMTQuNy0yNC43LDI5LjJ2NDIuMWMwLDE0LjUsMTAuNCwyNi44LDI0LjcsMjkuMmwzNCw1LjggICAgYzMuNSwxMS4yLDguMSwyMi4xLDEzLjcsMzIuNWwtMTkuNywyNy40Yy04LjQsMTEuOC03LjEsMjcuOSwzLjIsMzguMWwyOS44LDI5LjhjNS42LDUuNiwxMyw4LjcsMjAuOSw4LjdjNi4yLDAsMTIuMS0xLjksMTcuMS01LjUgICAgbDI4LjEtMjBjMTAuMSw1LjMsMjAuNyw5LjYsMzEuNiwxM2w1LjYsMzMuNmMyLjQsMTQuMywxNC43LDI0LjcsMjkuMiwyNC43aDQyLjJjMTQuNSwwLDI2LjgtMTAuNCwyOS4yLTI0LjdsNS43LTMzLjYgICAgYzExLjMtMy41LDIyLjItOCwzMi42LTEzLjVsMjcuNywxOS44YzUsMy42LDExLDUuNSwxNy4yLDUuNWwwLDBjNy45LDAsMTUuMy0zLjEsMjAuOS04LjdsMjkuOC0yOS44YzEwLjItMTAuMiwxMS42LTI2LjMsMy4yLTM4LjEgICAgbC0xOS44LTI3LjhjNS41LTEwLjUsMTAuMS0yMS40LDEzLjUtMzIuNmwzMy42LTUuNmMxNC4zLTIuNCwyNC43LTE0LjcsMjQuNy0yOS4ydi00Mi4xICAgIEM0NzguOSwyMDMuODAxLDQ2OC41LDE5MS41MDEsNDU0LjIsMTg5LjEwMXogTTQ1MS45LDI2MC40MDFjMCwxLjMtMC45LDIuNC0yLjIsMi42bC00Miw3Yy01LjMsMC45LTkuNSw0LjgtMTAuOCw5LjkgICAgYy0zLjgsMTQuNy05LjYsMjguOC0xNy40LDQxLjljLTIuNyw0LjYtMi41LDEwLjMsMC42LDE0LjdsMjQuNywzNC44YzAuNywxLDAuNiwyLjUtMC4zLDMuNGwtMjkuOCwyOS44Yy0wLjcsMC43LTEuNCwwLjgtMS45LDAuOCAgICBjLTAuNiwwLTEuMS0wLjItMS41LTAuNWwtMzQuNy0yNC43Yy00LjMtMy4xLTEwLjEtMy4zLTE0LjctMC42Yy0xMy4xLDcuOC0yNy4yLDEzLjYtNDEuOSwxNy40Yy01LjIsMS4zLTkuMSw1LjYtOS45LDEwLjhsLTcuMSw0MiAgICBjLTAuMiwxLjMtMS4zLDIuMi0yLjYsMi4yaC00Mi4xYy0xLjMsMC0yLjQtMC45LTIuNi0yLjJsLTctNDJjLTAuOS01LjMtNC44LTkuNS05LjktMTAuOGMtMTQuMy0zLjctMjguMS05LjQtNDEtMTYuOCAgICBjLTIuMS0xLjItNC41LTEuOC02LjgtMS44Yy0yLjcsMC01LjUsMC44LTcuOCwyLjVsLTM1LDI0LjljLTAuNSwwLjMtMSwwLjUtMS41LDAuNWMtMC40LDAtMS4yLTAuMS0xLjktMC44bC0yOS44LTI5LjggICAgYy0wLjktMC45LTEtMi4zLTAuMy0zLjRsMjQuNi0zNC41YzMuMS00LjQsMy4zLTEwLjIsMC42LTE0LjhjLTcuOC0xMy0xMy44LTI3LjEtMTcuNi00MS44Yy0xLjQtNS4xLTUuNi05LTEwLjgtOS45bC00Mi4zLTcuMiAgICBjLTEuMy0wLjItMi4yLTEuMy0yLjItMi42di00Mi4xYzAtMS4zLDAuOS0yLjQsMi4yLTIuNmw0MS43LTdjNS4zLTAuOSw5LjYtNC44LDEwLjktMTBjMy43LTE0LjcsOS40LTI4LjksMTcuMS00MiAgICBjMi43LTQuNiwyLjQtMTAuMy0wLjctMTQuNmwtMjQuOS0zNWMtMC43LTEtMC42LTIuNSwwLjMtMy40bDI5LjgtMjkuOGMwLjctMC43LDEuNC0wLjgsMS45LTAuOGMwLjYsMCwxLjEsMC4yLDEuNSwwLjVsMzQuNSwyNC42ICAgIGM0LjQsMy4xLDEwLjIsMy4zLDE0LjgsMC42YzEzLTcuOCwyNy4xLTEzLjgsNDEuOC0xNy42YzUuMS0xLjQsOS01LjYsOS45LTEwLjhsNy4yLTQyLjNjMC4yLTEuMywxLjMtMi4yLDIuNi0yLjJoNDIuMSAgICBjMS4zLDAsMi40LDAuOSwyLjYsMi4ybDcsNDEuN2MwLjksNS4zLDQuOCw5LjYsMTAsMTAuOWMxNS4xLDMuOCwyOS41LDkuNyw0Mi45LDE3LjZjNC42LDIuNywxMC4zLDIuNSwxNC43LTAuNmwzNC41LTI0LjggICAgYzAuNS0wLjMsMS0wLjUsMS41LTAuNWMwLjQsMCwxLjIsMC4xLDEuOSwwLjhsMjkuOCwyOS44YzAuOSwwLjksMSwyLjMsMC4zLDMuNGwtMjQuNywzNC43Yy0zLjEsNC4zLTMuMywxMC4xLTAuNiwxNC43ICAgIGM3LjgsMTMuMSwxMy42LDI3LjIsMTcuNCw0MS45YzEuMyw1LjIsNS42LDkuMSwxMC44LDkuOWw0Miw3LjFjMS4zLDAuMiwyLjIsMS4zLDIuMiwyLjZ2NDIuMUg0NTEuOXoiIGZpbGw9IiMwMDAwMDAiLz4KCQk8cGF0aCBkPSJNMjM5LjQsMTM2LjAwMWMtNTcsMC0xMDMuMyw0Ni4zLTEwMy4zLDEwMy4zczQ2LjMsMTAzLjMsMTAzLjMsMTAzLjNzMTAzLjMtNDYuMywxMDMuMy0xMDMuM1MyOTYuNCwxMzYuMDAxLDIzOS40LDEzNi4wMDEgICAgeiBNMjM5LjQsMzE1LjYwMWMtNDIuMSwwLTc2LjMtMzQuMi03Ni4zLTc2LjNzMzQuMi03Ni4zLDc2LjMtNzYuM3M3Ni4zLDM0LjIsNzYuMyw3Ni4zUzI4MS41LDMxNS42MDEsMjM5LjQsMzE1LjYwMXoiIGZpbGw9IiMwMDAwMDAiLz4KCTwvZz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K)'
    }
}