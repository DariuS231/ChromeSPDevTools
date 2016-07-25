'use strict';

var scr = document.createElement('script');
scr.src = 'https://rawgit.com/DariuS231/SpPropertyBag.js/master/dist/SpPropertyBag.js';
(document.head || document.documentElement).appendChild(scr);
//and then hide the evidence as much as possible.
scr.parentNode.removeChild(scr);