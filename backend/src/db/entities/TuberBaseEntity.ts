import { BaseEntity, PrimaryKey, Property } from "@mikro-orm/core";
import { SoftDeletable } from "mikro-orm-soft-delete";

@SoftDeletable(() => TuberBaseEntity, "deleted_at", () => new Date())
//https://mikro-orm.io/docs/defining-entities/#using-mikroorms-baseentity-previously-wrappedentity
export class TuberBaseEntity extends BaseEntity<TuberBaseEntity, "id"> {
  @PrimaryKey()
	id!: number;
	
	@Property()
	created_at = new Date();
	
	@Property({onUpdate: () => new Date()})
	updated_at = new Date();

	@Property({ nullable: true })
	deleted_at?: Date;
}


@SoftDeletable (() => TuberCompositeEntity, "deleted_at", () => new Date())
export class TuberCompositeEntity {
	@Property()
	created_at = new Date();

	@Property({onUpdate: () => new Date()})
	updated_at = new Date();

	@Property({ nullable: true})
	deleted_at?: Date;
}