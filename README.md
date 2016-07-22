# AppFramework
The AppFramework provides a full set of libraries to build applications fast and efficiently. This framework has a complete set of tools to connect applications with different analytical platforms like Google Analytics and Adobe Reports and Analytics and installs tags of a great variety of advertising platforms. 

## How to use
> Please place the libraries into a folder called com. 
Add the following lines to the <head> section of your HTML file:

```
<script src=com/"Core/AppFramework.js"></script>
<link rel="stylesheet" href="main.css">
<link rel="stylesheet" href="com/libs/jquery-ui-1.11.4/jquery-ui.min.css">
```
> Add the following code after the <body> tag:

```
<!-- <Framework:StarterScript> -->
    <script>
        AppFramework.init('../../../', 'MainScript.js');
    </script>
    <!-- </Framework:StarterScript> -->
    <!-- <Framework:Components> -->
    <div id="customAlert"></div>
    <div id="alert_container">
        <div id="alert-body">
            <div id="alert-image"></div>
            <div id="alert-title">Error</div>
            <div id="alert-description">Description error</div>
            <div id="alert-close">X</div>
        </div>
    </div>
    <div id="loading-container">
        <div class="loading-content" style="text-align:center;">
            <img src="../../images/ajax-loader.gif" style="margin: 0 auto 0 auto;" />
        </div>
    </div>
    <div id="mainContainer_div" style="text-align:center; width:100%;">
        
    </div>
    <!-- </Framework:Components> -->
```
