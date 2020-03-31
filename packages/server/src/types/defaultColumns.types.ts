/**
 * Interface for ensuring that DefaultColumns contains all expected columns.
 * If new fields should be added to DefaultColumns they should first be added here.
 */
export interface IDefaultColumns {
  _id_: number;
  _externalId_: string;
  _createdAt_: Date;
  _updatedAt_: Date;
  _archivedAt_: Date | null;
}
