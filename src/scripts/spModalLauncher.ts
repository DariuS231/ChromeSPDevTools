// For each new version of the script file, a new URL must be generated 
// from the https://rawgit.com/ site using the url of the specific commit 
let cdnUrl:string = 'https://cdn.rawgit.com/DariuS231/ChromeSPPropertiesAdmin/e6466f8867ccb464ae57d1b7f746d3b63507aced/src/scripts/SpPropertyBag/SpPropertyBag.ts';

let script:HTMLScriptElement = document.createElement('script');
script.src = cdnUrl;
(document.head || document.documentElement).appendChild(script);
//and then hide the evidence as much as possible.
script.parentNode.removeChild(script);