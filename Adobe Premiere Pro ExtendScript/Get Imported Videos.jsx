﻿//json2.js 
this.JSON||(this.JSON={}),function(){function f(t){return t<10?"0"+t:t}"function"!=typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(t){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(t){return this.valueOf()});var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;function quote(t){return escapable.lastIndex=0,escapable.test(t)?'"'+t.replace(escapable,function(t){var e=meta[t];return"string"==typeof e?e:"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+t+'"'}function str(t,e){var n,r,f,o,u,i=gap,a=e[t];switch(a&&"object"==typeof a&&"function"==typeof a.toJSON&&(a=a.toJSON(t)),"function"==typeof rep&&(a=rep.call(e,t,a)),typeof a){case"string":return quote(a);case"number":return isFinite(a)?String(a):"null";case"boolean":case"null":return String(a);case"object":if(!a)return"null";if(gap+=indent,u=[],"[object Array]"===Object.prototype.toString.apply(a)){for(o=a.length,n=0;n<o;n+=1)u[n]=str(n,a)||"null";return f=0===u.length?"[]":gap?"[\n"+gap+u.join(",\n"+gap)+"\n"+i+"]":"["+u.join(",")+"]",gap=i,f}if(rep&&"object"==typeof rep)for(o=rep.length,n=0;n<o;n+=1)"string"==typeof(r=rep[n])&&(f=str(r,a))&&u.push(quote(r)+(gap?": ":":")+f);else for(r in a)Object.hasOwnProperty.call(a,r)&&(f=str(r,a))&&u.push(quote(r)+(gap?": ":":")+f);return f=0===u.length?"{}":gap?"{\n"+gap+u.join(",\n"+gap)+"\n"+i+"}":"{"+u.join(",")+"}",gap=i,f}}"function"!=typeof JSON.stringify&&(JSON.stringify=function(t,e,n){var r;if(gap="",indent="","number"==typeof n)for(r=0;r<n;r+=1)indent+=" ";else"string"==typeof n&&(indent=n);if(rep=e,e&&"function"!=typeof e&&("object"!=typeof e||"number"!=typeof e.length))throw new Error("JSON.stringify");return str("",{"":t})}),"function"!=typeof JSON.parse&&(JSON.parse=function(text,reviver){var j;function walk(t,e){var n,r,f=t[e];if(f&&"object"==typeof f)for(n in f)Object.hasOwnProperty.call(f,n)&&(void 0!==(r=walk(f,n))?f[n]=r:delete f[n]);return reviver.call(t,e,f)}if(text=String(text),cx.lastIndex=0,cx.test(text)&&(text=text.replace(cx,function(t){return"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4)})),/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return j=eval("("+text+")"),"function"==typeof reviver?walk({"":j},""):j;throw new SyntaxError("JSON.parse")})}();
var importedVideos=[];
var importedVideosAsString;
var project = app.project;
var projectItem = project.rootItem;

function getFilePath(item,i,j,n,pathArr){
    if(i!=n){
        pathArr.push(item.name);
          //$.writeln(item.name);
    }
    if(i==n){
        return;
    }
    var nextItem=item.children[i]; 
    var type=nextItem.type;
    if(type==2){
        getFilePath(nextItem, 0,n-1,nextItem.children.numItems,pathArr);
        getFilePath(item, i+1,j,n,pathArr);
    }else if(type==1){
        projectItemList.push(nextItem);
        pathArr.push(nextItem.name);
       // $.writeln(nextItem.name);
        return getFilePath(item,i+1,j,n,pathArr);
    }else{
        return;
    }
}
   
function validFileType(path){
    if(path.length<3)return false;
    var ext=path.substring(path.length-4,path.length).toLowerCase();
    var validExt=[".mp4","jpeg",".wmv",".wav",".mov",".mxf",".mts",".png",".jpg",".mkv",".gif",".avi",".csv",".cvs",".doc","docx",".exe",".pdf",".tif",".txt",".zip","proj",".xls","xlsx","json"];
    for(var i=0;i<validExt.length;i++){
    if(ext==validExt[i])
    return true;
    }
    return false;
}
function generatePath(pathArr,finalPaths){
    var path="";
    var n=pathArr.length;
    var pre=[];
    var fn=0;
    pre.push(pathArr[0]);
    for(var i=1;i<n;i++){
        var flag1=0;
        if(path==pathArr[i])continue;
        if(validFileType(pathArr[i])){
            for(var preIndex=1;preIndex<pre.length-1;preIndex++){
                if(pre[preIndex]==pathArr[i-1]){
                    pre.pop();
                    break;
                }
            }
            finalPaths[fn]="";
            for(var j=0;j<pre.length;j++){
            finalPaths[fn]+=pre[j]+"/";
            }
            finalPaths[fn]+=pathArr[i];
            fn=fn+1;
        }else{
        for(var preIndex=1;preIndex<pre.length-1;preIndex++){
            if(pre[preIndex]==pathArr[i]){
                pre.pop();
                flag1=1;
                break;
            }
        }
        if(flag1)continue;
            path=pathArr[i];
            if(pre[0]==path)pre=[];
            pre.push(path);
        }
    }
 }
try{
    for(var i=0;i<projectItem.children.numItems;i++){
        if(projectItem.children[i].type==2){
            var folderName=projectItem.children[i].name;
            if(folderName.toLowerCase()!="bin")continue;
            var pathArr=[];
            var finalPaths=[];
            var n=projectItem.children[i].children.numItems;
            getFilePath(projectItem.children[i],0,n,n,pathArr);
            generatePath(pathArr,finalPaths);
          
           for(var fn=0;fn<finalPaths.length;fn++){
               importedVideos.push(finalPaths[fn]);           
             }
          }else if(projectItem.children[i].type==1){
             if(validFileType(projectItem.children[i].name)){
                importedVideos.push(projectItem.children[i].name);
            }    
       }
  }
    importedVideosAsString=JSON.stringify(importedVideos);
    }catch(e){
    importedVideosAsString="";
    alert("Can't get imported videos. Please restart the extension.");
    }

$.writeln(importedVideosAsString);