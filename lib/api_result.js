var inflect = require('inflect');

function capitalizeFirstLetter(string)
{
  return string[0].toUpperCase() + string.slice(1);
}


var ApiResult = function(rowsetElements){

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
  }

  var parseRowsets = function(api_method){
    var i;
    var rowsetElement, rowsets;
    var element;
    var rowsets=[];
    for(i=0;i<rowsetElements.length;i++){
      rowsetElement = rowsetElements[i];
      element = getRowset(rowsetElement);
      createFunctions.call(api_method, element); 
      rowsets[element.name]= element;
    }
    return rowsets;
  }

  var createFunctions = function( rowset){
    var rows, row;
    var propertyName = rowset['name']; 
    this['get'+capitalizeFirstLetter(propertyName)] = function() { return rowsets[propertyName].rows;};
    this['get'+capitalizeFirstLetter(inflect.singularize(propertyName))] = function(id){
      rows = rowset.rows;
      for(row in rows) {
        if(rows[row][rowset.key] == id){
          return rows[row];
        }
      }
      return null;
    };
    this.each = function(iterator){
      var rows, row;

      rows = rowset.rows;
      for(row in rows) {
        iterator(rows[row]);
      }

    }
  }
  this.parseRowsets = parseRowsets;
  return this; 
}

exports.init = function(api_function, rowsetElements){
  var apiResult = new ApiResult(rowsetElements);
  apiResult.parseRowsets(api_function); 
  return apiResult;
}
