import css from './css/index.css';
import less from './css/black.less';
import sass from './css/bb.scss';

{
    let HelloWebpack = "Hello Webpack!";
    document.getElementById("title").innerHTML = HelloWebpack;
}

//$("#title").html("Hello ShenZheng!");

var json = require("../config.json");
document.getElementById("json").innerHTML = json.name +':email: '+ json.email;