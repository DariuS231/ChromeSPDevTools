# Chrome SP Dev Tools
A Google chrome extension design to make SharePoint Developer’s life easier. Providing several useful tools:

* __Property Bag tool:__ allowing Devs to *Create*, *Update* or *Delete* web properties.
* __Site Lists tool:__ showing a list of all the lists and libraries *Public* or *Hidden*.
* __Web Custom Actions tool:__ allowing Devs to *Create*, *Update* or *Delete* web custom actions.
* __Web and site fueature tool:__ showing a list of all the web and site features with the option of *Activate* of *Deactivate* andy of the shown features.

## Google Chrome Installation

The application is published in the Google Chrome Web Store. [This](https://chrome.google.com/webstore/detail/chrome-sp-properties-admi/efhiadiopfkjpdihdmlccoffnpdblkho) is the direct link to it. 

<br> 

## Development

### Installation

After cloning this repo, execute in your favourite shell:

* `npm install --global gulp` to make sure gulp is installed globally.
* `npm install` to install npm dependencies and TypeScript typings.


### Compilation Chrome extension

Within the same shell window, execute:

* `npm run generate` to execute the task that will create the content of the dist folder.

### Start Server, Compilation and watch Action files (using webpack)

Within the same shell window, execute:

* `npm run start` to execute the task that will create the content of the dist folder, start webpack-dev-server on 8080 port and keep watching the source files for changes


### Loading the extension

From a google chrome window

1. Visit chrome://extensions in your browser (or open up the Chrome menu by clicking the icon to the far right of the Omnibox: ![Omnibox](https://developer.chrome.com/static/images/hotdogmenu.png) The menu's icon is three horizontal bars. and select Extensions under the Tools menu to get to the same place).

2. Check the **Developer mode** checkbox in the top right-hand corner.

3. Click **Load unpacked extension…** to pop up a file-selection dialog.

4. Navigate to the directory where the **dist** folder is, and with in **chromeExtension**, select the **dev** folder.

<br>

## License

The MIT License (MIT)

Copyright (c) 2016 @darius231
