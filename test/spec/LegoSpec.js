describe("Calculate Angle", function() {

  it("should return the correct angle", function() {
    expect( Utils.calculateAngle(1, 1) ).toEqual(45);
    expect( Math.round(Utils.calculateAngle(400, 300)) ).toEqual(37);
  });

});

describe("Transform class", function() {

  it("should return correct property values", function() {
    var t = new Transform("rotateX(-12deg) rotateY(-17deg) translateX(3px) translateY(-64px) scale3d(1.12, 1.12, 1.12)");
    expect( t.transform["rotateX"] ).toEqual("-12deg");
    expect( t.transform["rotateY"] ).toEqual("-17deg");
    expect( t.transform["scale3d"] ).toEqual("1.12, 1.12, 1.12");
    expect( t.transform["rotateZ"] ).toEqual(undefined);
    expect( t.getPropValueInDegree("rotateX") ).toEqual(-12);
    expect( t.getPropValueInDegree("rotateY") ).toEqual(-17);
    t.transform["rotateX"] = "-10deg";
    expect( t.getPropValueInDegree("rotateX") ).toEqual(-10);
    expect( t.toString() ).toEqual("rotateX(-10deg) rotateY(-17deg) translateX(3px) translateY(-64px) scale3d(1.12, 1.12, 1.12)");
  });

});

describe("Utils", function() {
  it("should calculate distance", function() {
    expect( Utils.calcDistance(645, 270, 672, 96) ).toEqual( 176 );
    expect( Utils.calcDistance(0, 0, 3, 4) ).toEqual( 5 );
  });
});