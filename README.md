# Chrome SP Dev Tools
A Google chrome extension design to make SharePoint Developer’s life easier. Providing several useful tools:

* __Property Bag tool:__ allowing Devs to *Create*, *Update* or *Delete* web properties.
* __Site Lists tool:__ showing a list of all the lists and libraries *Public* or *Hidden*.
* __Web Custom Actions tool:__ allowing Devs to *Create*, *Update* or *Delete* web custom actions.
* __Web and site fueature tool:__ showing a list of all the web and site features with the option of *Activate* of *Deactivate* andy of the shown features.

## Google Chrome Installation

The application is published in the Google Chrome Web Store. [This](https://chrome.google.com/webstore/detail/chrome-sp-properties-admi/efhiadiopfkjpdihdmlccoffnpdblkho) is the direct link to it. 

## Development

### Installation

After cloning this repo, execute in your favourite shell:

* `npm install --global gulp` to make sure gulp is installed globally.
* `npm install` to install npm dependencies and TypeScript typings.

### Certificate

In order to run the local server and be able to fetch the local script files from localhost, a self-signed certificate is required it can be created with the following openssl command

```
openssl req -x509 -newkey rsa:2048 -keyout key.pem -out cert.pem -days 365
```

This step is very important as without *cert.pem* and *key.pem* files, the server wont be able to start up and hence no scripts file will be available for fetching

For the windows users, [here](https://blog.didierstevens.com/2015/03/30/howto-make-your-own-cert-with-openssl-on-windows/) is a nice post explaining how to install and create a certificate.

### Compilation Chrome extension

Within the same shell window, execute:

* `gulp generate-chrome-dev` to execute the task that will create the content of the dist folder.

### Compilation and watch Action files

Within the same shell window, execute:

* `gulp` to execute the task that will create the content of the dist folder and keep watching the source files fir changes

### Local server
IN another shell windows, run the the local server with:

```
http-server --ssl
```

### Loading the extension

From a google chrome window

1. Visit chrome://extensions in your browser (or open up the Chrome menu by clicking the icon to the far right of the Omnibox: ![Omnibox](https://developer.chrome.com/static/images/hotdogmenu.png) The menu's icon is three horizontal bars. and select Extensions under the Tools menu to get to the same place).

2. Check the **Developer mode** checkbox in the top right-hand corner.

3. Click **Load unpacked extension…** to pop up a file-selection dialog.

4. Navigate to the directory where the **dist** folder is, and select it.

## License

The MIT License (MIT)

Copyright (c) 2016 @darius231
