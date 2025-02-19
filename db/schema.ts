import {
	integer,
	json,
	pgTable,
	text,
	timestamp,
	varchar,
	doublePrecision,
	vector,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// all prompts for quick acess
export const Prompts = pgTable('prompts', {
	id: integer().primaryKey().generatedByDefaultAsIdentity(),
	title: varchar().notNull(),
	content: text().notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
});

// all chats for refernce ,messages are stored in JSON format for easy access
export const Chats = pgTable('chats', {
	id: varchar().primaryKey().unique().notNull(),
	messages: json(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
});

// app settings
export const Settings = pgTable('settings', {
	id: integer().primaryKey().generatedByDefaultAsIdentity(),
	username: varchar(),
	system: text(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
});

// documents used for rag stores document name for <sources> response from llm
export const Documents = pgTable('documents', {
	id: integer().primaryKey().generatedByDefaultAsIdentity(),
	extension: varchar({ length: 10 }),
	name: varchar().notNull(),
	size: doublePrecision(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
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
