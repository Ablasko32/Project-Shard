import {
	integer,
	json,
	pgTable,
	text,
	timestamp,
	varchar,
	doublePrecision,
	vector,
	boolean,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// all prompts for quick acess
export const Prompts = pgTable('prompts', {
	id: integer().primaryKey().generatedByDefaultAsIdentity(),
	title: varchar().notNull(),
	content: text().notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	userId: varchar('user_id').references(() => user.id, { onDelete: 'cascade' }),
});

// all chats for refernce ,messages are stored in JSON format for easy access
export const Chats = pgTable('chats', {
	id: varchar().primaryKey().unique().notNull(),
	messages: json(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	userId: varchar('user_id').references(() => user.id, { onDelete: 'cascade' }),
});

// app settings
export const Settings = pgTable('settings', {
	id: integer().primaryKey().generatedByDefaultAsIdentity(),
	username: varchar(),
	system: text(),
	key: text(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	userId: varchar('user_id').references(() => user.id, { onDelete: 'cascade' }),
});

// documents used for rag stores document name for <sources> response from llm
export const Documents = pgTable('documents', {
	id: integer().primaryKey().generatedByDefaultAsIdentity(),
	extension: varchar({ length: 10 }),
	name: varchar().notNull(),
	size: doublePrecision(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	userId: varchar('user_id').references(() => user.id, { onDelete: 'cascade' }),
});

// storing vectorized embeddings and text chunks - 768 is nomic embedding lenght
export const Embeddings = pgTable('embeddings', {
	id: integer().primaryKey().generatedByDefaultAsIdentity(),
	chunk: text().notNull(),
	embedding: vector({ dimensions: 768 }).notNull(),
	documentId: integer('document_id')
		.references(() => Documents.id, { onDelete: 'cascade' })
		.notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
});

// RELATIONSHIPS

// one document has many embeddings
export const documentsRelation = relations(Documents, ({ many }) => ({
	embeddings: many(Embeddings),
}));

export const embeddingRelation = relations(Embeddings, ({ one }) => ({
	document: one(Documents, {
		fields: [Embeddings.documentId],
		references: [Documents.id],
	}),
}));

// BETTER AUTH SCHEMA _ GENRATED BY npx @better-auth/cli generate

export const user = pgTable('user', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	email: text('email').notNull().unique(),
	emailVerified: boolean('email_verified').notNull(),
	image: text('image'),
	createdAt: timestamp('created_at').notNull(),
	updatedAt: timestamp('updated_at').notNull(),
});

export const session = pgTable('session', {
	id: text('id').primaryKey(),
	expiresAt: timestamp('expires_at').notNull(),
	token: text('token').notNull().unique(),
	createdAt: timestamp('created_at').notNull(),
	updatedAt: timestamp('updated_at').notNull(),
	ipAddress: text('ip_address'),
	userAgent: text('user_agent'),
	userId: text('user_id')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
});

export const account = pgTable('account', {
	id: text('id').primaryKey(),
	accountId: text('account_id').notNull(),
	providerId: text('provider_id').notNull(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	accessToken: text('access_token'),
	refreshToken: text('refresh_token'),
	idToken: text('id_token'),
	accessTokenExpiresAt: timestamp('access_token_expires_at'),
	refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
	scope: text('scope'),
	password: text('password'),
	createdAt: timestamp('created_at').notNull(),
	updatedAt: timestamp('updated_at').notNull(),
});

export const verification = pgTable('verification', {
	id: text('id').primaryKey(),
	identifier: text('identifier').notNull(),
	value: text('value').notNull(),
	expiresAt: timestamp('expires_at').notNull(),
	createdAt: timestamp('created_at'),
	updatedAt: timestamp('updated_at'),
});
