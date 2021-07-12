# MatterFOSS Web

This is an open source webapp based on the Mattermost(tm) codebase.
The MatterFOSS name is not (to the best of our knowledge) protected under any trademark
and you are encouraged to modify, remix and redistribute the MatterFOSS project within
the terms of the Apache 2.0 license.

This project should be used along with the [MatterFOSS server](https://github.com/cjdelisle/MatterFOSS)
in order to provide fully open source, non-trademarked, community chat server software.

## No warrantees
This is a *community project* and is not supported in any way, we don't even promise to
fix security issues in a timely manner. If you wish to use chat in a corporate environment,
we recommend that you use the Mattermost(tm) product and support the original developers
of great open source code.

## How to build
The recommended way to install this application is by building your own version, so that
you can quickly and easily make any changes you want.

```
npm install
npm run build
```

The result of this should be a `/dist` directory which you can configure your
[MatterFOSS server](https://github.com/cjdelisle/MatterFOSS) to serve.

## Custom Branding
You're welcome to change the name from MatterFOSS to whatever you like, but unfortunately
it's not trivial to do so. You can easily change all instances of MatterFOSS in the i18n
directory to your brand of choice, but in other places around the codebase it will be
somewhat harder. If you want to change the logos, the files you will need to change are:

* [images/logo_compact.png](https://github.com/cjdelisle/MatterfossWeb/blob/master/images/logo_compact.png)
* [images/icon_WS.png](https://github.com/cjdelisle/MatterfossWeb/blob/master/images/icon_WS.png)
* [images/icon50x50.png](https://github.com/cjdelisle/MatterfossWeb/blob/master/images/icon50x50.png)
* [images/icon64x64.png](https://github.com/cjdelisle/MatterfossWeb/blob/master/images/icon64x64.png)
* [images/logo-email.png](https://github.com/cjdelisle/MatterfossWeb/blob/master/images/logo-email.png)
* [images/logo.png](https://github.com/cjdelisle/MatterfossWeb/blob/master/images/logo.png)
* [images/logo.svg](https://github.com/cjdelisle/MatterfossWeb/blob/master/images/logo.svg)
* [images/logoWhite.png](https://github.com/cjdelisle/MatterfossWeb/blob/master/images/logoWhite.png)
* [images/favicon/everything](https://github.com/cjdelisle/MatterfossWeb/blob/master/images/favicon)
* [images/status_green.png](https://github.com/cjdelisle/MatterfossWeb/blob/master/images/status_green.png)
* [images/status_red.png](https://github.com/cjdelisle/MatterfossWeb/blob/master/images/status_red.png)
* [images/status_yellow.png](https://github.com/cjdelisle/MatterfossWeb/blob/master/images/status_yellow.png)

If you want to replace the matterfoss emoji, you will also need to run
[make-emojis](https://github.com/cjdelisle/MatterfossWeb/blob/master/build/make-emojis)
to generate the emoji files.

## Attribution
The MatterFOSS logo was created by QualityIcons ( https://thenounproject.com/nivya.becse/ ) and
is provided under the Creative Commons Attribution license.

