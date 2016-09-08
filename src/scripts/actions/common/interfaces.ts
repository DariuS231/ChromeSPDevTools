interface IKeyValue {
    key: string,
    value: any
}
interface ISiteContent {
    id: any,
    title: any,
    description: any,
    hidden: any,
    itemCount: any,
    imageUrl: any,
    created: any,
    lastModified: any,
    listUrl: any,
    settingsUrl: string
}
interface ICustomAction {
    name: any,
    description: any,
    id: any,
    title: any,
    registrationType: any,
    scriptSrc: any,
    scriptBlock: any,
    location: any,
    sequence: any,
    [key: string]: string //To allow index references with ICustomAction objects 
}