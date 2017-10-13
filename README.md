# MMM-Deezer

This is a module for the [MagicMirror²](https://github.com/MichMich/MagicMirror/).

Deezer music player for MagicMirror².

For the moment, only one button to start playing the list of loved songs that you have on your Deezer's account.
Work still in progress !

## Using the module

To use this module, add the following configuration block to the modules array in the `config/config.js` file:
```js
var config = {
    modules: [
        {
		module: "MMM-Deezer",
		position: "bottom_center",
		header: "Deezer"
	}
    ]
}
```

## Configuration options

| Option           | Description
|----------------- |-----------
| `option1`        | *Required* DESCRIPTION HERE
| `option2`        | *Optional* DESCRIPTION HERE TOO <br><br>**Type:** `int`(milliseconds) <br>Default 60000 milliseconds (1 minute)
