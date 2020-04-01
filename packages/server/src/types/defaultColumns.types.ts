/**
 * Interface for ensuring that DefaultColumns contains all expected columns.
 * If new fields should be added to DefaultColumns they should first be added here.
 */
export interface IDefaultColumns {
  id: number;
  externalId: string;
  createdAt: Date;
  updatedAt: Date;
  archivedAt: Date | null;
}
