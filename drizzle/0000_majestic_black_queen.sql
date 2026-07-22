CREATE TABLE "rfqs" (
	"id" serial PRIMARY KEY NOT NULL,
	"supplier_id" integer,
	"from_user_id" integer,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"company" text NOT NULL,
	"role" text NOT NULL,
	"message" text NOT NULL,
	"status" text DEFAULT 'new' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "suppliers" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"owner_user_id" integer,
	"name" text NOT NULL,
	"city" text NOT NULL,
	"region" text NOT NULL,
	"category" text NOT NULL,
	"specialties" text NOT NULL,
	"moq" integer,
	"lead_time_days" integer,
	"rating" real DEFAULT 0 NOT NULL,
	"reviews" integer DEFAULT 0 NOT NULL,
	"certifications" text NOT NULL,
	"since" integer,
	"verified" boolean DEFAULT false NOT NULL,
	"status" text DEFAULT 'approved' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "suppliers_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"password_hash" text NOT NULL,
	"role" text NOT NULL,
	"company_name" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "rfqs" ADD CONSTRAINT "rfqs_supplier_id_suppliers_id_fk" FOREIGN KEY ("supplier_id") REFERENCES "public"."suppliers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rfqs" ADD CONSTRAINT "rfqs_from_user_id_users_id_fk" FOREIGN KEY ("from_user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "suppliers" ADD CONSTRAINT "suppliers_owner_user_id_users_id_fk" FOREIGN KEY ("owner_user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "rfqs_supplier_idx" ON "rfqs" USING btree ("supplier_id");--> statement-breakpoint
CREATE INDEX "suppliers_status_idx" ON "suppliers" USING btree ("status");--> statement-breakpoint
CREATE INDEX "suppliers_owner_idx" ON "suppliers" USING btree ("owner_user_id");--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_role_check" CHECK ("role" IN ('brand','manufacturer','retailer','admin'));--> statement-breakpoint
ALTER TABLE "suppliers" ADD CONSTRAINT "suppliers_status_check" CHECK ("status" IN ('pending','approved','rejected'));--> statement-breakpoint
ALTER TABLE "rfqs" ADD CONSTRAINT "rfqs_status_check" CHECK ("status" IN ('new','contacted','closed'));