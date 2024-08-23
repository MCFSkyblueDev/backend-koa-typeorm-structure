import {CustomBaseEntity} from "@entity/postgres/base.entity";

export class Pagination<T extends CustomBaseEntity> {
   private readonly pageNumber: number;
   private readonly pageTotal: number;
   private readonly pageSize: number;

   private readonly data: T[];

   constructor(
      pageNumber: number,
      pageTotal: number,
      pageSize: number,
      data: T[]
   ) {
      this.pageNumber = pageNumber;
      this.pageTotal = pageTotal;
      this.pageSize = pageSize;
      this.data = data;
   }

   public getPageNumber(): number {
      return this.pageNumber;
   }

   public getPageTotal(): number {
      return this.pageTotal;
   }

   public getPageSize(): number {
      return this.pageSize;
   }

   public getData(): T[] {
      return this.data;
   }
}
