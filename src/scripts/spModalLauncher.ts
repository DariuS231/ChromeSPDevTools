'use strict';

var scr = document.createElement('script');
scr.src = 'https://cdn.rawgit.com/DariuS231/ChromeSPPropertiesAdmin/master/spPropertyBag/SpPropertyBag.js';
(document.head || document.documentElement).appendChild(scr);
//and then hide the evidence as much as possible.
scr.parentNode.removeChild(scr);