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

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

export function distanceBetweenPoints(point1: Point, point2: Point): number {
  const R = 6371; // Earth's radius in kilometers

  const lat1 = toRadians(point1.y);
  const lon1 = toRadians(point1.x);
  const lat2 = toRadians(point2.y);
  const lon2 = toRadians(point2.x);

  const dlat = lat2 - lat1;
  const dlon = lon2 - lon1;

  const a = Math.sin(dlat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c;

  return distance;
}

export function knotsToKmPerSec(knots: number): number {
  const kmPerHour = knots * 1.852; // Convert knots to km/h
  const kmPerSec = kmPerHour / 3600; // Convert km/h to km/s
  return kmPerSec;
}
