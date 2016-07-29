# Chrome SP Properties Admin
A Google chrome extension that will show a modal dialog within a SharePoint site with a list of all the web properties of the current SharePoint site and giving the user the option to *Create* new web properties, *Modify* or *Delete* existing properties.

## Google Chrome Installation

The application is published in the Google Chrome Web Store. [This](https://chrome.google.com/webstore/detail/chrome-sp-properties-admi/efhiadiopfkjpdihdmlccoffnpdblkho) is the direct link to it. 

## Development

### Installation

After cloning this repo, execute in your favourite shell:

* `mpm install` to install npm dependencies.
* `typings install` to install the typescript definitions.

### Compilation

Within the same shell window, execute:

* `gulp` to execute the task that will create the content of the dist folder.

### Loading the extension

From a google chrome window

1. Visit chrome://extensions in your browser (or open up the Chrome menu by clicking the icon to the far right of the Omnibox: ![Omnibox](https://developer.chrome.com/static/images/hotdogmenu.png) The menu's icon is three horizontal bars. and select Extensions under the Tools menu to get to the same place).

2. Check the **Developer mode** checkbox in the top right-hand corner.

3. Click **Load unpacked extension…** to pop up a file-selection dialog.

4. Navigate to the directory where the **dist** folder is, and select it.

## License

The MIT License (MIT)

Copyright (c) 2016 @darius231
