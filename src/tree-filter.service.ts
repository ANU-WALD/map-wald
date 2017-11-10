import { Injectable } from '@angular/core';
import { TreeModel } from './data/tree';

@Injectable()
export class TreeFilterService {

  constructor() {
  }

  filterTree(tree: TreeModel, filterText: string) {

    tree.visible = false;

    filterText = filterText.trim().toLowerCase();

    const containsFilterText = (label: string, filterText: string) => label.trim().toLowerCase().indexOf(filterText) !== -1;

    if (tree.hasOwnProperty("children")) {

      tree.children.map(child => {
        this.filterTree(child, filterText)

        tree.visible = tree.visible || child.visible;
      });

    } else {
      tree.visible = containsFilterText(tree.label, filterText);
    }

    return(tree);

  }

}
