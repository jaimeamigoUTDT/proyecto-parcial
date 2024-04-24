export function calculatePosition(index,numberOfElements) {
    const angle = (index * 180 / numberOfElements) * (Math.PI / 180); // Convert degrees to radians
    const radiusX = 100; // Half of the width of the ellipse
    const radiusY = 100; // Half of the height of the ellipse
    const centerX = 80; // x-coordinate of the center of the ellipse
    const centerY = 90; // y-coordinate of the center of the ellipse

    const x = centerX - radiusX * Math.cos(angle/2);
    const y = centerY - radiusY * Math.sin(angle/2);
    console.log(x, y);

    return {x, y};
  }