
export interface TableRow{
  [key:string]:any;
}

export function parseCSV(txt:string):TableRow[]{
  let lines = txt.split('\n');
  let header = lines[0];
  lines = lines.slice(1);
  let columns = header.split(',');

  return lines.filter(ln=>ln.length).map(ln=>{
    let data = ln.split(',');

    let result:TableRow = {};
    data.forEach((val,i)=>{
      result[columns[i]] = parseVal(val);
    });
    return result;
  });
}

function parseVal(val:string):any{

  // Try date...
  let components = val.split('-');
  if(components.length===3){
    let dateComponents = components.map(c=>+c);
    if(!dateComponents.some(isNaN)){
      return new Date(Date.UTC(dateComponents[0],dateComponents[1]-1,dateComponents[2]));
    }
  }

  if(val===''){
    return val;
  }

  // Try numeric
  let numeric:number = +val;
  if(!isNaN(numeric)){
    return numeric;
  }

  return val;
}
