import {Entity, Property, ManyToOne, Cascade} from "@mikro-orm/core";
import type {Ref,Rel} from "@mikro-orm/core";
import {TuberBaseEntity} from "./TuberBaseEntity.js";
import {User} from "./User.js";

@Entity()
export class Message extends TuberBaseEntity {

    @ManyToOne()
    sender!: Ref<User>;

    @ManyToOne('User')
    receiver!: Rel<User>;

    @Property()
    message!: string;
}