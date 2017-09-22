
export interface TreeNodeAction{
  icon:string;
  tooltip:string;
  action:(n:TreeModel)=>void
}

export interface TreeModel {
  label: string;
  data?: any;
  expanded?: boolean;
  children?: Array<TreeModel>;
  actions?:Array<TreeNodeAction>;
}
