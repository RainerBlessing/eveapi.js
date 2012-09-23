var inflect = require('inflect');

function capitalizeFirstLetter(string)
{
  return string[0].toUpperCase() + string.slice(1);
}


var ApiResult = function(){

  var getRowset = function(rowsetElement, columns){
    var rowsetElements;
    var element = null;
    var childElement;
    var childElements = [];
    var i;

    if(rowsetElement.name()==='rowset'){
      element = {};
      element['name'] = rowsetElement.attr('name').value();
      element['key'] = rowsetElement.attr('key').value();
      columns =  rowsetElement.attr('columns').value().split(',');  
      element['columns'] = columns;

      rowsetElements = rowsetElement.childNodes();
      for(i=0;i<rowsetElements.length;i++){
        childElement = getRowset(rowsetElements[i],columns);

        if(childElement!==null){
          childElements.push(childElement);
        }
      }
      element.rows = childElements;

    }
    else if(rowsetElement.name()==='row'){
      element = {};
      for(i=0;i<columns.length;i++){
        columnAttribute = rowsetElement.attr(columns[i]);
        element[columnAttribute.name()]= columnAttribute.value(); 
      }        
      rowsetElements = rowsetElement.childNodes();
      for(i=0;i<rowsetElements.length;i++){
        childElement = getRowset(rowsetElements[i],columns);
        if (childElement !== null && childElement.name!== undefined){
          element[childElement.name] = childElement;
          createFunctions.call(element, childElement); 
        }
      }
    }
    return element;
  };

  var parseRowset = function(api_method, rowsetElement){
    var i;
    var rowsetElement, rowsets;
    var element;
    var rowsets=[];

    element = getRowset(rowsetElement);
    if(element!=null){
      createFunctions.call(api_method, element); 
      rowsets[element.name]= element;
    }
    return rowsets;
  };

  var createFunctions = function( rowset){
    var rows, i;
    var propertyName = rowset['name']; 
    this['get'+capitalizeFirstLetter(propertyName)] = function() { return {};};
    this['get'+capitalizeFirstLetter(inflect.singularize(propertyName))] = function(id){
      rows = rowset.rows;
      for(i=0;i<rows.length;i++) {
        if(rows[i][rowset.key] == id){
          return rows[i];
        }
      }
      return null;
    };
    this.each = function(iterator){
      var rows, i;

      rows = rowset.rows;
      for(i=0;i<rows.length;i++) {
        iterator(rows[i]);
      }

    }
  };

  var addFunctions = function(api_method, baseElement){
    var i,j;
    var element, rowsets;
    var propertyName;
    var childNodes;
    var subobject,subsubobject;
    var rowsetElements;

    rowsetElements = baseElement.childNodes();
    for(i=0;i<rowsetElements.length;i++){
      propertyName = rowsetElements[i].name();
      if(propertyName==='rowset'){
        parseRowset(api_method,rowsetElements[i]);
      }
      element = rowsetElements[i];
      childNodes = element.childNodes();
      if(childNodes.length != 0){
        if(childNodes.length ==1 && childNodes[0].name()=='text'){
          api_method['get'+capitalizeFirstLetter(propertyName)] =  (function(element) { return function(){return element.text();};})(element);
        }else{
          subobject = {};
          if(propertyName!=='rowset'){
            api_method['get'+capitalizeFirstLetter(propertyName)] =  (function(subobject){return function(){return subobject;};})(subobject);
            for(j=0;j<childNodes.length;j++){
              if(childNodes[j].name()!='text'){ 
                subsubobject = {};
                if(childNodes[j].name()!=='rowset'){
                  addFunctions(subsubobject, childNodes[j]);
                  subobject['get'+capitalizeFirstLetter(childNodes[j].name())] = (function(subobject){return function(){return subobject;};})(subsubobject);
                }else{
                  parseRowset(subobject,childNodes[j]);
                }
              }
            }
          }else{
            parseRowset(subobject,childNodes[0]);
          }
        }
      }
    }
  };
  this.addFunctions = addFunctions;
  return this; 
}

exports.init = function(api_function, rowsetElements){
  var apiResult = new ApiResult();
  apiResult.addFunctions(api_function, rowsetElements[0]);
  return apiResult;
}
