
export function isVisible(train: any): boolean {
  const percentage = (train.arrivalTime.getTime() - Date.now()) / (train.arrivalTime.getTime() - train.departureTime.getTime());

  switch (train.destination) {
    case 'CASCAIS':
      return percentage > 0.5 && percentage < 0.7;
    case 'CAIS DO SODRÉ':
      return percentage > 0 && percentage < 0.8;
    case 'COINA':
    case 'SETÚBAL':
      return percentage > 0.1 && percentage < 0.65;
    case 'ROMA-AREEIRO':
      return percentage > 0.2 && percentage < 0.6;
    default:
      return false;
  }
}


export function getDirection(train: any): string {
  switch (train.destination) {
    case 'CASCAIS':
      return 'West';
    case 'CAIS DO SODRÉ':
      return 'East';
    case 'COINA':
    case 'SETÚBAL':
      return 'South';
    case 'ROMA-AREEIRO':
      return 'North';
    default:
      return '';
  }
}

export function percentage(train: any) {
  return (train.arrivalTime.getTime() - Date.now()) / (train.arrivalTime.getTime() - train.departureTime.getTime());
}
