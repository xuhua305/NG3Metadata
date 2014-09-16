if (typeof uiStatus == "undefined") {
    var uiStatus = {
        Add: 'add',
        Edit: 'edit',
        View: 'view'
    };
}

function getRootPath() {
    //获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
    var curWwwPath = window.document.location.href;
    //获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
    var pathName = window.document.location.pathname;
    var pos = curWwwPath.indexOf(pathName);
    //获取主机地址，如： http://localhost:8083
    var localhostPaht = curWwwPath.substring(0, pos);
    //获取带"/"的项目名，如：/uimcardprj
    var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
    return (localhostPaht + projectName);
}

//获取QueryString的数组

function getQueryString() {

    var result = location.search.match(new RegExp("[\?\&][^\?\&]+=[^\?\&]+", "g"));

    if (result == null) {

        return "";

    }

    for (var i = 0; i < result.length; i++) {

        result[i] = result[i].substring(1);

    }

    return result;

}

//根据QueryString参数名称获取值

function getQueryStringByName(name) {

    var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));

    if (result == null || result.length < 1) {

        return "";

    }

    return result[1];

}

//根据QueryString参数索引获取值

function getQueryStringByIndex(index) {

    if (index == null) {

        return "";

    }

    var queryStringList = getQueryString();

    if (index >= queryStringList.length) {

        return "";

    }

    var result = queryStringList[index];

    var startIndex = result.indexOf("=") + 1;

    result = result.substring(startIndex);

    return result;

}//获取QueryString的数组

function getQueryString() {

    var result = location.search.match(new RegExp("[\?\&][^\?\&]+=[^\?\&]+", "g"));

    if (result == null) {

        return "";

    }

    for (var i = 0; i < result.length; i++) {

        result[i] = result[i].substring(1);

    }

    return result;

}

//根据QueryString参数名称获取值

function getQueryStringByName(name) {

    var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));

    if (result == null || result.length < 1) {

        return "";

    }

    return result[1];

}

//根据QueryString参数索引获取值

function getQueryStringByIndex(index) {

    if (index == null) {

        return "";

    }

    var queryStringList = getQueryString();

    if (index >= queryStringList.length) {

        return "";

    }

    var result = queryStringList[index];

    var startIndex = result.indexOf("=") + 1;

    result = result.substring(startIndex);

    return result;

}

function GenerateFunction(objectNamespace, componentId, componentName) {
    var prefix = objectNamespace + componentName;
    if (prefix.lastIndexOf('.') != prefix.length - 1)
        prefix += '.';

    var funcArrayStr = AF.func('reflectFuncs', objectNamespace + componentName);
    if (funcArrayStr.length == 0)
        return;
    var funcArray = funcArrayStr.split(',');

    for (var j in funcArray) {
        var childPrefix = prefix;
        if (prefix.length == 0) {
            childPrefix = "self.";
        }
        exp = componentId + "." + childPrefix + funcArray[j] + " = function(){var param = '';" + " for(var k in arguments){param += arguments[k];if(k<(arguments.length-1)){param += '\\r\\n';}}" +
                   "return " + componentId + ".func('" + prefix + funcArray[j] + "',param);" + " };";
        eval(exp);
    }
}

function GenerateProperty(objectNamespace, componentId, componentName) {
    var prefix = objectNamespace + componentName;
    if (prefix.lastIndexOf('.') != prefix.length - 1)
        prefix += '.';

    var propertyArrayStr = AF.func('reflectProps', objectNamespace + componentName);
    if (propertyArrayStr.length == 0)
        return;
    var propertyArray = propertyArrayStr.split(',');


    for (var j in propertyArray) {
        var propertyValue = propertyArray[j].replace(".", "_");

        var childPrefix = prefix;
        if (prefix.length == 0) {
            childPrefix = "self.";
        }
        var exp = componentId + "." + childPrefix + propertyValue + " = function(){" +
            "return " + componentId + ".func('" + prefix + "GetObjectProp','" + propertyArray[j] + "');" + " };";
        eval(exp);

        exp = componentId + "." + childPrefix + "set" + propertyValue + " = function(data){" +
           componentId + ".func('" + objectNamespace + "SetObjProp','" + componentName + "\\r\\n" + propertyArray[j] + "\\r\\n'+data);" + " };";
        eval(exp);
    }
}

var eventContainer = [];
var eventNum = 0;

function GenerateEvent(objectNamespace, componentId, componentName) {
    //var prefix = '';
    //if (objectNamespace.lastIndexOf('.') == objectNamespace.length - 1 && objectNamespace.length != 0)
    //    prefix = objectNamespace.substring(0, prefix.length - 2);

    var eventArrayStr = AF.func('ReflectEvents', objectNamespace + componentName);
    if (eventArrayStr.length == 0)
        return;
    var eventArray = eventArrayStr.split(',');
    for (var j in eventArray) {
        var eventObj = {};
        eventObj.componentName = componentName;
        if (objectNamespace.length == 0)
            eventObj.eventName = eventArray[j];
        else {
            eventObj.eventName = objectNamespace + eventArray[j];
        }
        eventContainer[eventNum] = eventObj;
        eventNum++;
    }
}

function GenerateEvents(componet, objectName) {
    var objectNamespace = '';
    if (objectName.length == 0) {
        objectNamespace = objectName;
    } else {
        objectNamespace = objectName + '.';
    }

    if (objectNamespace.length == 0) {
        GenerateEvent(objectNamespace, componet.id, '');
    }

    var allComponentStr = AF.func(objectNamespace + 'GetObjectIds', '');
    if (allComponentStr.length == 0)
        return;
    var allComponent = allComponentStr.split(',');

    for (var i in allComponent) {
        var type = AF.func(objectNamespace + 'GetObjectType', allComponent[i]);
        if (type.length == 0)
            continue;
        eval(componet.id + '.' + objectNamespace + allComponent[i] + " = {};");
        GenerateEvents(AF, objectNamespace + allComponent[i]);
        GenerateEvent(objectNamespace, componet.id, allComponent[i]);
    }
}

function GenerateFunctionAndProperty(componet, objectName) {
    var objectNamespace = '';
    if (objectName.length == 0) {
        objectNamespace = objectName;
    } else {
        objectNamespace = objectName + '.';
    }

    if (objectNamespace.length == 0) {
        eval(componet.id + ".self = {};");
        GenerateFunction(objectNamespace, componet.id, '');
        GenerateProperty(objectNamespace, componet.id, '');
        GenerateEvent(objectNamespace, componet.id, '');
    }

    var allComponentStr = AF.func(objectNamespace + 'GetObjectIds', '');
    if (allComponentStr.length == 0)
        return;
    var allComponent = allComponentStr.split(',');

    for (var i in allComponent) {
        var type = AF.func(objectNamespace + 'GetObjectType', allComponent[i]);
        if (type.length == 0)
            continue;
        eval(componet.id + '.' + objectNamespace + allComponent[i] + " = {};");
        GenerateFunctionAndProperty(AF, objectNamespace + allComponent[i]);

        GenerateFunction(objectNamespace, componet.id, allComponent[i]);

        GenerateProperty(objectNamespace, componet.id, allComponent[i]);
    }
}