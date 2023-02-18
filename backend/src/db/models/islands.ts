/** @module Models/Profile */
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity, JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
    Relation
} from "typeorm";
import {User} from "./user";
import {Match} from "./match";