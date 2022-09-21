class Box {
    constructor(topLeft, bottomRight) { //Each of these variables is an array of two elements [x,z]
        this.topLeft = topLeft;
        this.bottomRight = bottomRight;
    }
    //Checks if the point P=(x,y) is inside the box. Returns true if the point is inside the box
    containsPoint(x, y) {
        return  (x>this.topLeft[0] && x<this.bottomRight[0] && y >this.topLeft[1] && y< this.bottomRight[1])
    }
}
export { Box }