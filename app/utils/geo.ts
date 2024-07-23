export interface Point {
  x: number;
  y: number;
}

function vector(p1: Point, p2: Point): Point {
  return { x: p2.x - p1.x, y: p2.y - p1.y };
}

function isPointInTriangle(pt: Point, v1: Point, v2: Point, v3: Point): boolean {
  const v0 = vector(v1, v3);
  const v1_ = vector(v1, v2);
  const v2_ = vector(v1, pt);

  const dot00 = v0.x * v0.x + v0.y * v0.y;
  const dot01 = v0.x * v1_.x + v0.y * v1_.y;
  const dot02 = v0.x * v2_.x + v0.y * v2_.y;
  const dot11 = v1_.x * v1_.x + v1_.y * v1_.y;
  const dot12 = v1_.x * v2_.x + v1_.y * v2_.y;

  const invDenom = 1 / (dot00 * dot11 - dot01 * dot01);
  const u = (dot11 * dot02 - dot01 * dot12) * invDenom;
  const v = (dot00 * dot12 - dot01 * dot02) * invDenom;

  return (u >= 0) && (v >= 0) && (u + v < 1);
}

export function isPointInQuadrilateral(point: Point, quad: Point[]): boolean {
  const [a, b, c, d] = quad;

  return isPointInTriangle(point, a, b, c) || isPointInTriangle(point, a, c, d);
}
