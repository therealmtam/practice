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
    if (this.isValidChildToAdd(childPanel)) {
      this.children.push(childPanel);
    }
    return this.childrensNames().sort();
  }

  childrensNames() {
    return this.children.map(child => child.name);
  }

  isValidChildToAdd(child) {
    return !this.isDescendantOfParent(child) &&
      !this.isAncenstorOfParent(child) &&
      !this.isSameAsParent(child);
  }

  isSameAsParent(child) {
    return (child.name === this.name);
  }

  isDescendantOfParent(child) {
    const parentsDescendants = [...this.children];

    for (let i = 0; i < parentsDescendants.length; i++) {
      if (parentsDescendants[i].name === child.name) return true;
    }
    return false;
  }

  isAncenstorOfParent(child) {
    const childsDescendants = [...child.children];

    for (let i = 0; i < childsDescendants.length; i++) {
      if (childsDescendants[i].name === this.name) return true;

      if (this.hasDescendants(childsDescendants[i])) {
        if (this.isAncenstorOfParent(childsDescendants[i])) return true;
      }
    }
    return false;
  }

  hasDescendants(panel) {
    return (panel.children.length > 0);
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
