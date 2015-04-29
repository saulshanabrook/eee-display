# eee-display
Allows you to export your Edx discussion posts.

Uses [my EDx api](saulshanabrook/eee) to make requests.


## Install

```
npm install -g broccoli-cli
npm install
```

## Usage


* fast processing in memory:

```
broccoli serve
```

* with additional [LiveReload](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei):

```
broccoli serve --live-reload-port 35729
```


* with watcher and generating files:

```
broccoli-timepiece dist
http-server dist/ -p 4200
```

Open `http://localhost:4200`


* building files for production (minified, mangled and compressed):

```
BROCCOLI_ENV=production broccoli build dist
```
