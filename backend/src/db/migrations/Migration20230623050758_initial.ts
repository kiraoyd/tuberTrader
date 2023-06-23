import { Migration } from '@mikro-orm/migrations';

export class Migration20230623050758 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "users" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null, "name" varchar(255) not null, "email" varchar(255) not null, "password" varchar(255) not null, "role" text check ("role" in (\'Admin\', \'User\')) not null);');
    this.addSql('alter table "users" add constraint "users_email_unique" unique ("email");');

    this.addSql('create table "profile" ("id" serial primary key, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null, "island_name" varchar(255) not null, "picture" varchar(255) not null, "turnips_held" int not null, "price_paid" int not null, "owner_id" int not null, "created_at" timestamptz(0) not null);');

    this.addSql('create table "transactions" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null, "number_sold" int not null, "price_sold" int not null, "profits" int not null, "seller_id" int not null, "host_id" int not null);');

    this.addSql('create table "selling_price_history" ("id" serial primary key, "deleted_at" timestamptz(0) null, "island_id" int not null, "date" varchar(255) not null, "price_am" int not null, "price_pm" int not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');

    this.addSql('create table "message" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null, "sender_id" int not null, "receiver_id" int not null, "message" varchar(255) not null);');

    this.addSql('create table "iphistory" ("id" serial primary key, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null, "ip" varchar(255) not null, "user_id" int not null, "created_at" timestamptz(0) not null);');

    this.addSql('alter table "profile" add constraint "profile_owner_id_foreign" foreign key ("owner_id") references "users" ("id") on update cascade;');

    this.addSql('alter table "transactions" add constraint "transactions_seller_id_foreign" foreign key ("seller_id") references "users" ("id") on update cascade;');
    this.addSql('alter table "transactions" add constraint "transactions_host_id_foreign" foreign key ("host_id") references "profile" ("id") on update cascade;');

    this.addSql('alter table "selling_price_history" add constraint "selling_price_history_island_id_foreign" foreign key ("island_id") references "profile" ("id") on update cascade;');

    this.addSql('alter table "message" add constraint "message_sender_id_foreign" foreign key ("sender_id") references "users" ("id") on update cascade;');
    this.addSql('alter table "message" add constraint "message_receiver_id_foreign" foreign key ("receiver_id") references "users" ("id") on update cascade;');

    this.addSql('alter table "iphistory" add constraint "iphistory_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "profile" drop constraint "profile_owner_id_foreign";');

    this.addSql('alter table "transactions" drop constraint "transactions_seller_id_foreign";');

    this.addSql('alter table "message" drop constraint "message_sender_id_foreign";');

    this.addSql('alter table "message" drop constraint "message_receiver_id_foreign";');

    this.addSql('alter table "iphistory" drop constraint "iphistory_user_id_foreign";');

    this.addSql('alter table "transactions" drop constraint "transactions_host_id_foreign";');

    this.addSql('alter table "selling_price_history" drop constraint "selling_price_history_island_id_foreign";');

    this.addSql('drop table if exists "users" cascade;');

    this.addSql('drop table if exists "profile" cascade;');

    this.addSql('drop table if exists "transactions" cascade;');

    this.addSql('drop table if exists "selling_price_history" cascade;');

    this.addSql('drop table if exists "message" cascade;');

    this.addSql('drop table if exists "iphistory" cascade;');
  }

}
