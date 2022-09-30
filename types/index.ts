export interface Unit {
  id: number;
  name: string;
  parentId: string;
}

export interface IEvent {
  id: number;
  name: string;
  unitId: string;
  startDate: Date;
  endDate: Date;
  createdBy: string;
  eventGroupId: string;
}
