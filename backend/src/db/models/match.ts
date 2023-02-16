/** @module Models/Match */
import {BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Relation} from "typeorm";
import {User} from "./user";
import {Profile} from "./profile";

/**
 * Match model - Holds all pet profile matches
 */
@Entity()
export class Match extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	matching_profile: Relation<Profile>;
	matched_profile: Relation<Profile>;

	@CreateDateColumn()
	created_at: string;
}
