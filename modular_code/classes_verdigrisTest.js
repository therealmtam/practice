class Panel {
  /**
   * Instantiates a new Panel with given name and sub panels.
   *
   * @param {String} name - panel name.
   * @param {Panel[]} children - an array subpanel instances.
   */
  constructor(name, children) {
    this.name = name;
    this.children = children || [];
  }

  //Adds a Child Panel to this Panel's Children
  addChildPanel(childPanel) {
    if (this.isValidChildToAdd(childPanel, this)) {
      this.children.push(childPanel);
    }

    return this.getChildrenNames(this).sort();
  }

  getChildrenNames(panel) {
    return panel.children.reduce((names, child) => {
      names.push(child.name);
      return names;
    }, []);
  }

  isValidChildToAdd(child, parent) {
    return !this.isDescendantOfParent(child, parent) &&
      !this.isAncenstorOfParent(child, parent) &&
      !this.isSamePanel(child, parent);
  }

  isSamePanel(child, parent) {
    return (child.name === parent.name);
  }

  isDescendantOfParent(child, parent) {
    for (let i = 0; i < parent.children.length; i++) {
      if (parent.children[i].name === child.name) return true;
    }
    return false;
  }

  isAncenstorOfParent(child, parent) {
    for (let i = 0; i < child.children.length; i++) {
      const childDescendant = child.children[i];
      if (childDescendant.name === parent.name) return true;

      if (this.hasChildren(childDescendant)) {
        if (this.isAncenstorOfParent(childDescendant, parent)) return true;
      }
    }
    return false;
  }

  hasChildren(panel) {
    return (panel.children.length > 0)
  }
}

/*
Panel Hierarchy Diagram:

Ballroom Lighting (p6) =>

  /=> HVAC(p3)
Mains(p1)
  \=> Lab (p2) => Supply Fan (p4) => Chiller Starters (p5)
*/

const panel6 = new Panel('Ballroom Lighting');
const panel5 = new Panel('Chiller Starters');
const panel4 = new Panel('Supply Fan', [panel5]);
const panel3 = new Panel('HVAC');
const panel2 = new Panel('Lab', [panel4]);
const panel1 = new Panel('Mains', [panel2, panel3]);
const panels = {
  'Mains': panel1,
  'Lab': panel2,
  'HVAC': panel3,
  'Supply Fan': panel4,
  'Chiller Starters': panel5,
  'Ballroom Lighting': panel6
};


console.log(panel1.addChildPanel(panel2)); //[HVAC, Lab]
console.log(panel3.addChildPanel(panel4)); //[Supply Fan]
console.log(panel1.addChildPanel(panel6)); //[Ballroom Lighting, HVAC, Lab]
