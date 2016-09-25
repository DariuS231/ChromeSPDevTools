
import Utils from './utils';

let divContainer = {
    padding: '5px',
    margin: 0
}

let btnStyles = {
    display: 'inline-block',
    height: '26px',
    minWidth: '0',
    borderRadius: '5px',
    padding: '3px 10px 4px 25px',
    margin: '5px',
    backgroundPosition: '50% 50%',
    backgroundRepeat: 'no-repeat',
    textDecoration: 'none',
    fontWeight: 'bold',
    border: '1px solid'
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
let listStyle = { marginTop: '6.5px', listStyle: 'none', paddingLeft: '5px' };

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

export let ButtonsStyle = {
    caDeleteBtnStyle: { position: 'absolute', top: '50px', right: '15px' },
    caCancelBtnStyle: { right: '75px', position: 'absolute' },
    caUpdateBtnStyle: { position: 'absolute', top: '5px', right: '15px' },
    caSaveBtnStyle: { right: '4px', position: 'absolute' },
    caNewBtnStyle: { float: 'right' },
    deleteBtnStyle: Utils.mergeObjects(btnStyles, {
        color: '#D80027',
        backgroundImage: 'url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCIgdmlld0JveD0iMCAwIDQ4Mi40MjggNDgyLjQyOSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDgyLjQyOCA0ODIuNDI5OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTM4MS4xNjMsNTcuNzk5aC03NS4wOTRDMzAyLjMyMywyNS4zMTYsMjc0LjY4NiwwLDI0MS4yMTQsMGMtMzMuNDcxLDAtNjEuMTA0LDI1LjMxNS02NC44NSw1Ny43OTloLTc1LjA5OCAgICBjLTMwLjM5LDAtNTUuMTExLDI0LjcyOC01NS4xMTEsNTUuMTE3djIuODI4YzAsMjMuMjIzLDE0LjQ2LDQzLjEsMzQuODMsNTEuMTk5djI2MC4zNjljMCwzMC4zOSwyNC43MjQsNTUuMTE3LDU1LjExMiw1NS4xMTcgICAgaDIxMC4yMzZjMzAuMzg5LDAsNTUuMTExLTI0LjcyOSw1NS4xMTEtNTUuMTE3VjE2Ni45NDRjMjAuMzY5LTguMSwzNC44My0yNy45NzcsMzQuODMtNTEuMTk5di0yLjgyOCAgICBDNDM2LjI3NCw4Mi41MjcsNDExLjU1MSw1Ny43OTksMzgxLjE2Myw1Ny43OTl6IE0yNDEuMjE0LDI2LjEzOWMxOS4wMzcsMCwzNC45MjcsMTMuNjQ1LDM4LjQ0MywzMS42NmgtNzYuODc5ICAgIEMyMDYuMjkzLDM5Ljc4MywyMjIuMTg0LDI2LjEzOSwyNDEuMjE0LDI2LjEzOXogTTM3NS4zMDUsNDI3LjMxMmMwLDE1Ljk3OC0xMywyOC45NzktMjguOTczLDI4Ljk3OUgxMzYuMDk2ICAgIGMtMTUuOTczLDAtMjguOTczLTEzLjAwMi0yOC45NzMtMjguOTc5VjE3MC44NjFoMjY4LjE4MlY0MjcuMzEyeiBNNDEwLjEzNSwxMTUuNzQ0YzAsMTUuOTc4LTEzLDI4Ljk3OS0yOC45NzMsMjguOTc5SDEwMS4yNjYgICAgYy0xNS45NzMsMC0yOC45NzMtMTMuMDAxLTI4Ljk3My0yOC45Nzl2LTIuODI4YzAtMTUuOTc4LDEzLTI4Ljk3OSwyOC45NzMtMjguOTc5aDI3OS44OTdjMTUuOTczLDAsMjguOTczLDEzLjAwMSwyOC45NzMsMjguOTc5ICAgIFYxMTUuNzQ0eiIgZmlsbD0iI0Q4MDAyNyIvPgoJCTxwYXRoIGQ9Ik0xNzEuMTQ0LDQyMi44NjNjNy4yMTgsMCwxMy4wNjktNS44NTMsMTMuMDY5LTEzLjA2OFYyNjIuNjQxYzAtNy4yMTYtNS44NTItMTMuMDctMTMuMDY5LTEzLjA3ICAgIGMtNy4yMTcsMC0xMy4wNjksNS44NTQtMTMuMDY5LDEzLjA3djE0Ny4xNTRDMTU4LjA3NCw0MTcuMDEyLDE2My45MjYsNDIyLjg2MywxNzEuMTQ0LDQyMi44NjN6IiBmaWxsPSIjRDgwMDI3Ii8+CgkJPHBhdGggZD0iTTI0MS4yMTQsNDIyLjg2M2M3LjIxOCwwLDEzLjA3LTUuODUzLDEzLjA3LTEzLjA2OFYyNjIuNjQxYzAtNy4yMTYtNS44NTQtMTMuMDctMTMuMDctMTMuMDcgICAgYy03LjIxNywwLTEzLjA2OSw1Ljg1NC0xMy4wNjksMTMuMDd2MTQ3LjE1NEMyMjguMTQ1LDQxNy4wMTIsMjMzLjk5Niw0MjIuODYzLDI0MS4yMTQsNDIyLjg2M3oiIGZpbGw9IiNEODAwMjciLz4KCQk8cGF0aCBkPSJNMzExLjI4NCw0MjIuODYzYzcuMjE3LDAsMTMuMDY4LTUuODUzLDEzLjA2OC0xMy4wNjhWMjYyLjY0MWMwLTcuMjE2LTUuODUyLTEzLjA3LTEzLjA2OC0xMy4wNyAgICBjLTcuMjE5LDAtMTMuMDcsNS44NTQtMTMuMDcsMTMuMDd2MTQ3LjE1NEMyOTguMjEzLDQxNy4wMTIsMzA0LjA2Nyw0MjIuODYzLDMxMS4yODQsNDIyLjg2M3oiIGZpbGw9IiNEODAwMjciLz4KCTwvZz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K)'
    }),
    cancelBtnStyle: Utils.mergeObjects(btnStyles, {
        color: '#D80027', backgroundPosition: '5% 50%', cursor: 'pointer',
        backgroundImage: 'url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCIgdmlld0JveD0iMCAwIDMzOS4xNzcgMzM5LjE3NyIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMzM5LjE3NyAzMzkuMTc3OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxnPgoJPHBhdGggZD0iTTI0Ny4yNDQsMTY5LjU5bDgzLjkzOC04My45MzhjNS4zMzItNS4zMjcsNy45OTQtMTEuNzk4LDcuOTk0LTE5LjQxNGMwLTcuNjE0LTIuNjY5LTE0LjA4NC03Ljk5NC0xOS40MTRMMjkyLjM1NSw3Ljk5MyAgIEMyODcuMDI2LDIuNjY1LDI4MC41NTYsMCwyNzIuOTQ0LDBjLTcuNjE3LDAtMTQuMDg1LDIuNjY1LTE5LjQxNyw3Ljk5M0wxNjkuNTksOTEuOTMxTDg1LjY1MSw3Ljk5MyAgIEM4MC4zMjUsMi42NjUsNzMuODU0LDAsNjYuMjM3LDBjLTcuNjExLDAtMTQuMDgzLDIuNjY1LTE5LjQxNCw3Ljk5M0w3Ljk5NCw0Ni44MjRDMi42NjcsNTIuMTUsMCw1OC42MjQsMCw2Ni4yMzggICBjMCw3LjYxNiwyLjY2NCwxNC4wODQsNy45OTQsMTkuNDE0bDgzLjkzNyw4My45MzhMNy45OTQsMjUzLjUyOEMyLjY2NywyNTguODU5LDAsMjY1LjMyNywwLDI3Mi45NDUgICBjMCw3LjYxLDIuNjY0LDE0LjA4Miw3Ljk5NCwxOS40MWwzOC44MywzOC44MjhjNS4zMyw1LjMzMiwxMS44MDMsNy45OTQsMTkuNDE0LDcuOTk0YzcuNjE2LDAsMTQuMDg0LTIuNjY5LDE5LjQxNC03Ljk5NCAgIGw4My45MzktODMuOTM4bDgzLjk0NCw4My45MzhjNS4zMjgsNS4zMzIsMTEuNzkzLDcuOTk0LDE5LjQxNyw3Ljk5NGM3LjYxMSwwLDE0LjA4Mi0yLjY2OSwxOS40MTEtNy45OTRsMzguODItMzguODI4ICAgYzUuMzMyLTUuMzI0LDcuOTk0LTExLjgsNy45OTQtMTkuNDFjMC03LjYxOC0yLjY2Mi0xNC4wODYtNy45OTQtMTkuNDE3TDI0Ny4yNDQsMTY5LjU5eiIgZmlsbD0iI0Q4MDAyNyIvPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=)'
    }),
    updateBtnStyle: Utils.mergeObjects(btnStyles, {
        color: '#FFCC00',
        backgroundImage: 'url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCIgdmlld0JveD0iMCAwIDQzMi41NDQgNDMyLjU0NCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDMyLjU0NCA0MzIuNTQ0OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTAsMzEzLjc3NXYxMTguNzdoMTE4Ljc3MWwyMzcuNTQxLTIzNy41NDFMMjM3LjUzOSw3Ni4yMzJMMCwzMTMuNzc1eiBNMTAzLjYzOCwzOTUuOTk5TDEwMy42MzgsMzk1Ljk5OWwtMzAuNTUsMC4wMDQgICAgdi0zNi41NDZIMzYuNTQ1di0zMC41NTNsMjUuOTgxLTI1Ljk4MWw2Ny4wOTMsNjcuMDkyTDEwMy42MzgsMzk1Ljk5OXogTTI0Ni42ODMsMTI0Ljc3YzQuMTgyLDAsNi4yNzYsMi4wOTUsNi4yNzYsNi4yOCAgICBjMCwxLjkwNi0wLjY2NCwzLjUyMS0xLjk5OSw0Ljg1Nkw5Ni4yMTQsMjkwLjY1MWMtMS4zMzMsMS4zMjgtMi45NTIsMS45OTUtNC44NTQsMS45OTVjLTQuMTg0LDAtNi4yNzktMi4wOTgtNi4yNzktNi4yNzkgICAgYzAtMS45MDYsMC42NjYtMy41MjEsMS45OTctNC44NTZsMTU0Ljc0Ny0xNTQuNzQzQzI0My4xNTQsMTI1LjQzNiwyNDQuNzczLDEyNC43NywyNDYuNjgzLDEyNC43N3oiIGZpbGw9IiNmZmNjMDAiLz4KCQk8cGF0aCBkPSJNNDIxLjk3Niw3Ny42NTRsLTY3LjA5MS02Ni44MDZDMzQ3LjY1MywzLjYxOSwzMzguOTkyLDAsMzI4LjkwMywwYy0xMC4yODMsMC0xOC44NDIsMy42MTktMjUuNjkzLDEwLjg0OGwtNDcuMzk0LDQ3LjEwOSAgICBsMTE4Ljc3MywxMTguNzdsNDcuMzk0LTQ3LjM5MmM3LjA0Mi03LjA0MywxMC41NjEtMTUuNjA4LDEwLjU2MS0yNS42OTdDNDMyLjU0LDkzLjc0Myw0MjkuMDIyLDg1LjA4LDQyMS45NzYsNzcuNjU0eiIgZmlsbD0iI2ZmY2MwMCIvPgoJPC9nPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=)'
    }),
    saveBtnStyle: Utils.mergeObjects(btnStyles, {
        color: '#71AB48', backgroundPosition: '5% 50%', cursor: 'pointer',
        backgroundImage: 'url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCIgdmlld0JveD0iMCAwIDQ0Mi41MzMgNDQyLjUzMyIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDQyLjUzMyA0NDIuNTMzOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxnPgoJPHBhdGggZD0iTTQzNC41MzksOTguNDk5bC0zOC44MjgtMzguODI4Yy01LjMyNC01LjMyOC0xMS43OTktNy45OTMtMTkuNDEtNy45OTNjLTcuNjE4LDAtMTQuMDkzLDIuNjY1LTE5LjQxNyw3Ljk5M0wxNjkuNTksMjQ3LjI0OCAgIGwtODMuOTM5LTg0LjIyNWMtNS4zMy01LjMzLTExLjgwMS03Ljk5Mi0xOS40MTItNy45OTJjLTcuNjE2LDAtMTQuMDg3LDIuNjYyLTE5LjQxNyw3Ljk5Mkw3Ljk5NCwyMDEuODUyICAgQzIuNjY0LDIwNy4xODEsMCwyMTMuNjU0LDAsMjIxLjI2OWMwLDcuNjA5LDIuNjY0LDE0LjA4OCw3Ljk5NCwxOS40MTZsMTAzLjM1MSwxMDMuMzQ5bDM4LjgzMSwzOC44MjggICBjNS4zMjcsNS4zMzIsMTEuOCw3Ljk5NCwxOS40MTQsNy45OTRjNy42MTEsMCwxNC4wODQtMi42NjksMTkuNDE0LTcuOTk0bDM4LjgzLTM4LjgyOEw0MzQuNTM5LDEzNy4zMyAgIGM1LjMyNS01LjMzLDcuOTk0LTExLjgwMiw3Ljk5NC0xOS40MTdDNDQyLjUzNywxMTAuMzAyLDQzOS44NjQsMTAzLjgyOSw0MzQuNTM5LDk4LjQ5OXoiIGZpbGw9IiM3MWFiNDgiLz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K)'
    }),
    activateBtnStyle: Utils.mergeObjects(btnStyles, {color: '#71AB48', backgroundPosition: '10% 50%',
        backgroundImage: 'url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCIgdmlld0JveD0iMCAwIDM3Ny4wNDMgMzc3LjA0MyIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMzc3LjA0MyAzNzcuMDQzOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTMzNy43NzEsMTAzLjUzOGMtMTQuNjQ4LTIyLjcyMi0zNC42NDUtNDIuMTAyLTU3LjgxOC01Ni4wNDZjLTQuMzM0LTIuNjA3LTkuNzM2LTIuNjgyLTE0LjE0MS0wLjE5MSAgICBjLTQuNDAyLDIuNDktNy4xMjcsNy4xNTctNy4xMjcsMTIuMjE2djI5LjAzMWMwLDQuMzc5LDIuMDQ1LDguNTA4LDUuNTI5LDExLjE2MmMzMS4wOTQsMjMuNjg2LDQ5LjY1NCw2MS4wMTksNDkuNjU0LDk5Ljg2NiAgICBjMCw2OS4xMTUtNTYuMjMsMTI1LjM0NS0xMjUuMzQ2LDEyNS4zNDVjLTY5LjExNiwwLTEyNS4zNDYtNTYuMjI5LTEyNS4zNDYtMTI1LjM0NWMwLTM4Ljg0OCwxOC41NjItNzYuMTgxLDQ5LjY1NC05OS44NjYgICAgYzMuNDgzLTIuNjU0LDUuNTI5LTYuNzgzLDUuNTI5LTExLjE2MlY1OS41MTdjMC01LjA1OS0yLjcyNC05LjcyNi03LjEyNi0xMi4yMTZjLTQuNDA1LTIuNDktOS44MDgtMi40MTYtMTQuMTQyLDAuMTkxICAgIGMtMjMuMTc2LDEzLjk0NC00My4xNjksMzMuMzI0LTU3LjgxOSw1Ni4wNDZjLTE4LjQ2LDI4LjYzLTI4LjIxOCw2MS44MzgtMjguMjE4LDk2LjAzOGMwLDQ3LjQwMiwxOC40Niw5MS45NjksNTEuOTc5LDEyNS40ODggICAgYzMzLjUyMSwzMy41Miw3OC4wODYsNTEuOTc5LDEyNS40ODgsNTEuOTc5YzQ3LjQwMiwwLDkxLjk2OC0xOC40NTksMTI1LjQ4OC01MS45NzljMzMuNTE4LTMzLjUyLDUxLjk3OS03OC4wODYsNTEuOTc5LTEyNS40ODggICAgQzM2NS45OSwxNjUuMzc2LDM1Ni4yMzIsMTMyLjE2NywzMzcuNzcxLDEwMy41Mzh6IiBmaWxsPSIjNGZiNTA1Ii8+CgkJPHBhdGggZD0iTTE3Mi4xMjksMjE1LjUzNWgzMi43ODljNy4yNTcsMCwxMy4xNi01LjkwNSwxMy4xNi0xMy4xNjJWMTMuMTYyYzAtNy4yNTctNS45MDMtMTMuMTYyLTEzLjE2LTEzLjE2MmgtMzIuNzg5ICAgIGMtNy4yNTcsMC0xMy4xNjEsNS45MDQtMTMuMTYxLDEzLjE2MnYxODkuMjExQzE1OC45NjgsMjA5LjYzLDE2NC44NzMsMjE1LjUzNSwxNzIuMTI5LDIxNS41MzV6IiBmaWxsPSIjNGZiNTA1Ii8+Cgk8L2c+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==)'
    }),
    deactivateBtnStyle: Utils.mergeObjects(btnStyles,{color: '#D80027', backgroundPosition: '10% 50%',
        backgroundImage: 'url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCIgdmlld0JveD0iMCAwIDM3Ny4wNDMgMzc3LjA0MyIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMzc3LjA0MyAzNzcuMDQzOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTMzNy43NzEsMTAzLjUzOGMtMTQuNjQ4LTIyLjcyMi0zNC42NDUtNDIuMTAyLTU3LjgxOC01Ni4wNDZjLTQuMzM0LTIuNjA3LTkuNzM2LTIuNjgyLTE0LjE0MS0wLjE5MSAgICBjLTQuNDAyLDIuNDktNy4xMjcsNy4xNTctNy4xMjcsMTIuMjE2djI5LjAzMWMwLDQuMzc5LDIuMDQ1LDguNTA4LDUuNTI5LDExLjE2MmMzMS4wOTQsMjMuNjg2LDQ5LjY1NCw2MS4wMTksNDkuNjU0LDk5Ljg2NiAgICBjMCw2OS4xMTUtNTYuMjMsMTI1LjM0NS0xMjUuMzQ2LDEyNS4zNDVjLTY5LjExNiwwLTEyNS4zNDYtNTYuMjI5LTEyNS4zNDYtMTI1LjM0NWMwLTM4Ljg0OCwxOC41NjItNzYuMTgxLDQ5LjY1NC05OS44NjYgICAgYzMuNDgzLTIuNjU0LDUuNTI5LTYuNzgzLDUuNTI5LTExLjE2MlY1OS41MTdjMC01LjA1OS0yLjcyNC05LjcyNi03LjEyNi0xMi4yMTZjLTQuNDA1LTIuNDktOS44MDgtMi40MTYtMTQuMTQyLDAuMTkxICAgIGMtMjMuMTc2LDEzLjk0NC00My4xNjksMzMuMzI0LTU3LjgxOSw1Ni4wNDZjLTE4LjQ2LDI4LjYzLTI4LjIxOCw2MS44MzgtMjguMjE4LDk2LjAzOGMwLDQ3LjQwMiwxOC40Niw5MS45NjksNTEuOTc5LDEyNS40ODggICAgYzMzLjUyMSwzMy41Miw3OC4wODYsNTEuOTc5LDEyNS40ODgsNTEuOTc5YzQ3LjQwMiwwLDkxLjk2OC0xOC40NTksMTI1LjQ4OC01MS45NzljMzMuNTE4LTMzLjUyLDUxLjk3OS03OC4wODYsNTEuOTc5LTEyNS40ODggICAgQzM2NS45OSwxNjUuMzc2LDM1Ni4yMzIsMTMyLjE2NywzMzcuNzcxLDEwMy41Mzh6IiBmaWxsPSIjRDgwMDI3Ii8+CgkJPHBhdGggZD0iTTE3Mi4xMjksMjE1LjUzNWgzMi43ODljNy4yNTcsMCwxMy4xNi01LjkwNSwxMy4xNi0xMy4xNjJWMTMuMTYyYzAtNy4yNTctNS45MDMtMTMuMTYyLTEzLjE2LTEzLjE2MmgtMzIuNzg5ICAgIGMtNy4yNTcsMC0xMy4xNjEsNS45MDQtMTMuMTYxLDEzLjE2MnYxODkuMjExQzE1OC45NjgsMjA5LjYzLDE2NC44NzMsMjE1LjUzNSwxNzIuMTI5LDIxNS41MzV6IiBmaWxsPSIjRDgwMDI3Ii8+Cgk8L2c+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==)'
    }),
    settingsStyles: {
        marginTop: '2px', marginBottom: '2px', position: 'absolute', right: '15px', bottom: '10px',
        paddingLeft: '27px', backgroundPosition: '10% 50%', backgroundRepeat: 'no-repeat', backgroundImage: 'url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMS4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQ3OC43MDMgNDc4LjcwMyIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDc4LjcwMyA0NzguNzAzOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCI+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTQ1NC4yLDE4OS4xMDFsLTMzLjYtNS43Yy0zLjUtMTEuMy04LTIyLjItMTMuNS0zMi42bDE5LjgtMjcuN2M4LjQtMTEuOCw3LjEtMjcuOS0zLjItMzguMWwtMjkuOC0yOS44ICAgIGMtNS42LTUuNi0xMy04LjctMjAuOS04LjdjLTYuMiwwLTEyLjEsMS45LTE3LjEsNS41bC0yNy44LDE5LjhjLTEwLjgtNS43LTIyLjEtMTAuNC0zMy44LTEzLjlsLTUuNi0zMy4yICAgIGMtMi40LTE0LjMtMTQuNy0yNC43LTI5LjItMjQuN2gtNDIuMWMtMTQuNSwwLTI2LjgsMTAuNC0yOS4yLDI0LjdsLTUuOCwzNGMtMTEuMiwzLjUtMjIuMSw4LjEtMzIuNSwxMy43bC0yNy41LTE5LjggICAgYy01LTMuNi0xMS01LjUtMTcuMi01LjVjLTcuOSwwLTE1LjQsMy4xLTIwLjksOC43bC0yOS45LDI5LjhjLTEwLjIsMTAuMi0xMS42LDI2LjMtMy4yLDM4LjFsMjAsMjguMSAgICBjLTUuNSwxMC41LTkuOSwyMS40LTEzLjMsMzIuN2wtMzMuMiw1LjZjLTE0LjMsMi40LTI0LjcsMTQuNy0yNC43LDI5LjJ2NDIuMWMwLDE0LjUsMTAuNCwyNi44LDI0LjcsMjkuMmwzNCw1LjggICAgYzMuNSwxMS4yLDguMSwyMi4xLDEzLjcsMzIuNWwtMTkuNywyNy40Yy04LjQsMTEuOC03LjEsMjcuOSwzLjIsMzguMWwyOS44LDI5LjhjNS42LDUuNiwxMyw4LjcsMjAuOSw4LjdjNi4yLDAsMTIuMS0xLjksMTcuMS01LjUgICAgbDI4LjEtMjBjMTAuMSw1LjMsMjAuNyw5LjYsMzEuNiwxM2w1LjYsMzMuNmMyLjQsMTQuMywxNC43LDI0LjcsMjkuMiwyNC43aDQyLjJjMTQuNSwwLDI2LjgtMTAuNCwyOS4yLTI0LjdsNS43LTMzLjYgICAgYzExLjMtMy41LDIyLjItOCwzMi42LTEzLjVsMjcuNywxOS44YzUsMy42LDExLDUuNSwxNy4yLDUuNWwwLDBjNy45LDAsMTUuMy0zLjEsMjAuOS04LjdsMjkuOC0yOS44YzEwLjItMTAuMiwxMS42LTI2LjMsMy4yLTM4LjEgICAgbC0xOS44LTI3LjhjNS41LTEwLjUsMTAuMS0yMS40LDEzLjUtMzIuNmwzMy42LTUuNmMxNC4zLTIuNCwyNC43LTE0LjcsMjQuNy0yOS4ydi00Mi4xICAgIEM0NzguOSwyMDMuODAxLDQ2OC41LDE5MS41MDEsNDU0LjIsMTg5LjEwMXogTTQ1MS45LDI2MC40MDFjMCwxLjMtMC45LDIuNC0yLjIsMi42bC00Miw3Yy01LjMsMC45LTkuNSw0LjgtMTAuOCw5LjkgICAgYy0zLjgsMTQuNy05LjYsMjguOC0xNy40LDQxLjljLTIuNyw0LjYtMi41LDEwLjMsMC42LDE0LjdsMjQuNywzNC44YzAuNywxLDAuNiwyLjUtMC4zLDMuNGwtMjkuOCwyOS44Yy0wLjcsMC43LTEuNCwwLjgtMS45LDAuOCAgICBjLTAuNiwwLTEuMS0wLjItMS41LTAuNWwtMzQuNy0yNC43Yy00LjMtMy4xLTEwLjEtMy4zLTE0LjctMC42Yy0xMy4xLDcuOC0yNy4yLDEzLjYtNDEuOSwxNy40Yy01LjIsMS4zLTkuMSw1LjYtOS45LDEwLjhsLTcuMSw0MiAgICBjLTAuMiwxLjMtMS4zLDIuMi0yLjYsMi4yaC00Mi4xYy0xLjMsMC0yLjQtMC45LTIuNi0yLjJsLTctNDJjLTAuOS01LjMtNC44LTkuNS05LjktMTAuOGMtMTQuMy0zLjctMjguMS05LjQtNDEtMTYuOCAgICBjLTIuMS0xLjItNC41LTEuOC02LjgtMS44Yy0yLjcsMC01LjUsMC44LTcuOCwyLjVsLTM1LDI0LjljLTAuNSwwLjMtMSwwLjUtMS41LDAuNWMtMC40LDAtMS4yLTAuMS0xLjktMC44bC0yOS44LTI5LjggICAgYy0wLjktMC45LTEtMi4zLTAuMy0zLjRsMjQuNi0zNC41YzMuMS00LjQsMy4zLTEwLjIsMC42LTE0LjhjLTcuOC0xMy0xMy44LTI3LjEtMTcuNi00MS44Yy0xLjQtNS4xLTUuNi05LTEwLjgtOS45bC00Mi4zLTcuMiAgICBjLTEuMy0wLjItMi4yLTEuMy0yLjItMi42di00Mi4xYzAtMS4zLDAuOS0yLjQsMi4yLTIuNmw0MS43LTdjNS4zLTAuOSw5LjYtNC44LDEwLjktMTBjMy43LTE0LjcsOS40LTI4LjksMTcuMS00MiAgICBjMi43LTQuNiwyLjQtMTAuMy0wLjctMTQuNmwtMjQuOS0zNWMtMC43LTEtMC42LTIuNSwwLjMtMy40bDI5LjgtMjkuOGMwLjctMC43LDEuNC0wLjgsMS45LTAuOGMwLjYsMCwxLjEsMC4yLDEuNSwwLjVsMzQuNSwyNC42ICAgIGM0LjQsMy4xLDEwLjIsMy4zLDE0LjgsMC42YzEzLTcuOCwyNy4xLTEzLjgsNDEuOC0xNy42YzUuMS0xLjQsOS01LjYsOS45LTEwLjhsNy4yLTQyLjNjMC4yLTEuMywxLjMtMi4yLDIuNi0yLjJoNDIuMSAgICBjMS4zLDAsMi40LDAuOSwyLjYsMi4ybDcsNDEuN2MwLjksNS4zLDQuOCw5LjYsMTAsMTAuOWMxNS4xLDMuOCwyOS41LDkuNyw0Mi45LDE3LjZjNC42LDIuNywxMC4zLDIuNSwxNC43LTAuNmwzNC41LTI0LjggICAgYzAuNS0wLjMsMS0wLjUsMS41LTAuNWMwLjQsMCwxLjIsMC4xLDEuOSwwLjhsMjkuOCwyOS44YzAuOSwwLjksMSwyLjMsMC4zLDMuNGwtMjQuNywzNC43Yy0zLjEsNC4zLTMuMywxMC4xLTAuNiwxNC43ICAgIGM3LjgsMTMuMSwxMy42LDI3LjIsMTcuNCw0MS45YzEuMyw1LjIsNS42LDkuMSwxMC44LDkuOWw0Miw3LjFjMS4zLDAuMiwyLjIsMS4zLDIuMiwyLjZ2NDIuMUg0NTEuOXoiIGZpbGw9IiMwMDAwMDAiLz4KCQk8cGF0aCBkPSJNMjM5LjQsMTM2LjAwMWMtNTcsMC0xMDMuMyw0Ni4zLTEwMy4zLDEwMy4zczQ2LjMsMTAzLjMsMTAzLjMsMTAzLjNzMTAzLjMtNDYuMywxMDMuMy0xMDMuM1MyOTYuNCwxMzYuMDAxLDIzOS40LDEzNi4wMDEgICAgeiBNMjM5LjQsMzE1LjYwMWMtNDIuMSwwLTc2LjMtMzQuMi03Ni4zLTc2LjNzMzQuMi03Ni4zLDc2LjMtNzYuM3M3Ni4zLDM0LjIsNzYuMyw3Ni4zUzI4MS41LDMxNS42MDEsMjM5LjQsMzE1LjYwMXoiIGZpbGw9IiMwMDAwMDAiLz4KCTwvZz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K)'
    },
    newBtnStyle: Utils.mergeObjects(btnStyles, {
        backgroundPosition: '5% 50%', color: '#006DF0',
        backgroundImage: 'url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCIgdmlld0JveD0iMCAwIDQwMS45OTQgNDAxLjk5NCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDAxLjk5NCA0MDEuOTk0OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxnPgoJPHBhdGggZD0iTTM5NCwxNTQuMTc1Yy01LjMzMS01LjMzLTExLjgwNi03Ljk5NC0xOS40MTctNy45OTRIMjU1LjgxMVYyNy40MDZjMC03LjYxMS0yLjY2Ni0xNC4wODQtNy45OTQtMTkuNDE0ICAgQzI0Mi40ODgsMi42NjYsMjM2LjAyLDAsMjI4LjM5OCwwaC01NC44MTJjLTcuNjEyLDAtMTQuMDg0LDIuNjYzLTE5LjQxNCw3Ljk5M2MtNS4zMyw1LjMzLTcuOTk0LDExLjgwMy03Ljk5NCwxOS40MTR2MTE4Ljc3NSAgIEgyNy40MDdjLTcuNjExLDAtMTQuMDg0LDIuNjY0LTE5LjQxNCw3Ljk5NFMwLDE2NS45NzMsMCwxNzMuNTg5djU0LjgxOWMwLDcuNjE4LDIuNjYyLDE0LjA4Niw3Ljk5MiwxOS40MTEgICBjNS4zMyw1LjMzMiwxMS44MDMsNy45OTQsMTkuNDE0LDcuOTk0aDExOC43NzFWMzc0LjU5YzAsNy42MTEsMi42NjQsMTQuMDg5LDcuOTk0LDE5LjQxN2M1LjMzLDUuMzI1LDExLjgwMiw3Ljk4NywxOS40MTQsNy45ODcgICBoNTQuODE2YzcuNjE3LDAsMTQuMDg2LTIuNjYyLDE5LjQxNy03Ljk4N2M1LjMzMi01LjMzMSw3Ljk5NC0xMS44MDYsNy45OTQtMTkuNDE3VjI1NS44MTNoMTE4Ljc3ICAgYzcuNjE4LDAsMTQuMDg5LTIuNjYyLDE5LjQxNy03Ljk5NGM1LjMyOS01LjMyNSw3Ljk5NC0xMS43OTMsNy45OTQtMTkuNDExdi01NC44MTlDNDAxLjk5MSwxNjUuOTczLDM5OS4zMzIsMTU5LjUwMiwzOTQsMTU0LjE3NXoiIGZpbGw9IiMwMDZERjAiLz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K)'
    })
}

export let KeyValueItemStyles = {
    oddTableRowStyles: { backgroundColor: 'rgba(100,149,237, 0.1)' },
    headerStyle: Utils.mergeObjects({ textAlign: 'right', wordBreak: 'break-word' }, tableCellStyle),
    tableCellStyle: tableCellStyle,
    inputStyles: inputStyles,
    inputReadOnlyStyles: Utils.mergeObjects({ backgroundColor: 'gainsboro' }, inputStyles),

}

export let NewKeyValueItemStyles = {
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
        zIndex: 1000
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
    list: listStyle,
    checksContainer: { textAlign: 'right', marginTop: '6.5px' },
    check: { display: 'inline-block', marginRight: '20px' },
    lastCheck: { display: 'inline-block' }

}

export let SpSiteContentItemStyles: any = {
    listItem: { width: '50%', display: 'inline-block' },
    divContainer: { padding: '10px', margin: '5px', backgroundColor: 'rgba(100,149,237, 0.1)', position: 'relative', borderRadius: '5px' },
    imageItem: { width: '16px', height: '16px', verticalAlign: 'middle' },
    itemTitle: { display: 'inline-block', width: '93%', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', verticalAlign: 'middle', marginLeft: '5px' },
    totalItems: { marginTop: '10px', marginBottom: '2px' }
}

export let SpCustomActionsStyles: any = {
    contentStyles: contentStyles,
    list: listStyle
}
export let CustomActionItemStyles: any = {
    listItem: {},
    divContainer: { padding: '10px', margin: '5px', backgroundColor: 'rgba(100,149,237, 0.1)', position: 'relative', borderRadius: '5px' },
    itemTitle: { display: 'inline-block', width: '93%', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', verticalAlign: 'middle' },
    totalItems: { marginTop: '10px', marginBottom: '2px', wordBreak: 'break-word' },
    caNewBtnsContainer: { position: 'relative', height: '35px', marginTop: '10px' },
    caListItem: { position: 'relative' },
    caDescription: { fontStyle: 'italic', marginTop: '0px', color: 'gray' },
    inputStyle: {
        background: 'transparent',
        width: '97%',
        border: '1px solid #ababab'
    },
    labelStyles: { display: 'block', fontWeight: 'bold' }

}

export let SpFeaturesStyles = {
    contentStyles: {
        overflow: 'auto',
        height: '90%'
    },
    tableStyles: {
        borderSpacing: 0,
        borderCollapse: 'collapse',
        width: '100%'
    },
    tableContainerWeb: {
        marginTop: '6.5px',
        display: 'inline-block',
        width: "49%",
        verticalAlign: "top"
    },
    tableContainerSite: {
        marginTop: '6.5px',
        display: 'inline-block',
        width: "49%",
        verticalAlign: "top",
        marginLeft: '5px'
    },
    featureLogo: {
        paddingTop: '4px',
        paddingBottom: '4px',
        paddingLeft: '8px',
        paddingRight: '8px',
        float: 'left'
    },
    // featureTitle:{
    //     display: 'flex',
    //     justifyContent: 'center' 
    // },
    headerStyle: Utils.mergeObjects({ textAlign: 'left', wordBreak: 'break-word', display: 'flex', alignItems: 'center' }, tableCellStyle)
}