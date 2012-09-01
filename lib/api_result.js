var RowsetFunction = function(rowsetElements){
  var getRowset = function(){
      var i,j,k;
      var rowsetElement, rowsets, name, key, columns;

      var rowElement, rows, row, columnAttribute;

      rowsets=[];
      for(i=0;i<rowsetElements.length;i++){
        rowsetElement = rowsetElements[i];
        name = rowsetElement.attr('name').value();  
        key = rowsetElement.attr('key').value();  
        columns = rowsetElement.attr('columns').value().split(',');  

        var rowElements = rowsetElements[i].find('row');
        
        for(j=0;j<rowElements.length;j++){
          rowElement = rowElements[j];
          rows = [];
          row = {};

          for(k=0;k<columns.length;k++){
            columnAttribute = rowElement.attr(columns[k]);
            row[columnAttribute.name()]= columnAttribute.value(); 
          }
          rows.push(row); 
        }
        rowsets[name] = rows;
      }
      return rowsets;
    }
  return getRowset; 
}
exports.getRowsetFunction = function(rowsetElements){
  return new RowsetFunction(rowsetElements);
}
