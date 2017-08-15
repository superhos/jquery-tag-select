# jQuery Tag Select

A Dropdown plugin for selecting the tag items.

![demo](https://raw.githubusercontent.com/superhos/jquery-tag-select/master/screenshot/tagselect.gif)

## Getting Started
1. Downloading or Forking this repository 
2. Setup the build
3. Run grunt to create the built files in the "dist" directory.

or 

Just download the jquery.tab-select.min.js/css from "dist" directory.

## Usage

Include css and js file, like:

```html
<link rel="stylesheet" type="text/css" href="dist/tag-select.min.css"  />
<script src="jquery.js"></script>
<script src="dist/tag-select.min.js"></script>
```
HTML target as below.

```html
<div id="selectTag" class="tag-select clearfix">
    <input id="tags" name="tags" type="hidden" />
    <ul>
        <li>Smoke</li>
        <li>Drink</li>
        <li>Single</li>
        <li>Handsome</li>
        <li>GoodStudy</li>
        <li>Hot</li>
    </ul>
</div>
```
Use it like:

```html
jQuery(function($) {
  $('#selectTag').tagSelect({
	  	targetInput: 'tags' // input box of the form
  });
});
```

## Documentation
Currently this plugin supports the following options.
#### targetInput
	- Default: `true`
	- Acceptable-Values: String
	- Function: The result of selection will store in this input's value. 

#### maxNum
	- Defaullt: `-1`
	- Acceptable-Values: Integer
	- Function: Max numbers of selection tags. '-1' means unlimit.

#### inputCss
	- Defaullt: `{height:'35px',minWidth:'80px',background:'#FFF'}`
	- Acceptable-Values: JSON Object
	- Function: Styles setting for the input box.

#### dropdownCss
	- Defaullt: `{}`
	- Acceptable-Values: JSON Object
	- Function: Styles setting for the dropdown box.

#### itemCss
	- Defaullt: `{background:'#76d3ff'}`
	- Acceptable-Values: JSON Object
	- Function: Styles setting for the tag item.

#### existAnim: 
	- Defaullt: `String`
	- Acceptable-Values: JSON Object
	- Option: `swing`,`pulse`,`shake`
	- Function: The Animation will be run while the tag is existed.

#### separator
	- Default: `,`
	- Acceptable-Values: String
	- Function: The final multiple result will split by this separator.

#### defaultItem
    - Default: `,`
	- Acceptable-Values: Array
	- Function: The default value.

## Release History
###0.1.0
Basic Function Version.
