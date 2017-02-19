const request = new XMLHttpRequest();
request.open("GET", "/_api/web/title", false);
request.setRequestHeader("Accept", "application/json, text/javascript");
request.send(null);

let response;

if (request.status === 200) {
  response = request.responseText;
}

chrome.runtime.sendMessage({isSp: (typeof response !== "undefined")});
