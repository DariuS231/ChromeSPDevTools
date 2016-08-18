
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
        fontSize: 'large',
        borderRadius: '0 5px'
    }
}
