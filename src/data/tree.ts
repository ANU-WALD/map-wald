
export interface TreeNodeAction{
  icon:string;
  tooltip:string;
  action:(n:TreeModel)=>void
}

export interface TreeModel {
  label: string;
  data?: any;
  visible?: boolean ;
  expanded?: boolean;
  children?: Array<TreeModel>;
  actions?:Array<TreeNodeAction>;
}
