---
# prettier-ignore
date: 2025-11-11
title: Relation Schema
description:
weight: 10
---

## Relational Model

The database is viewed as **tables** and their **attributes (keys)**.

ER diagrams can be mapped to relational schema, which gives a good overview of the system design to make the system easier to understand at a technical level.

Three components of conversion process from E-R diagram to relational model:

- Specify schema of relation itself.
- Specify primary key on the relation.
- Specify any foreign key references to other relations.

## Composite Attribute

Composite attribute is attribute which can be broken into few attributes.

Relational model does not handle composite attributes.

Each component attribute maps to a separate attribute in relation schema.

## Multivalued Attribute

Multivalued attribute is a type of attribute which can have zero or more values per record.

To convert a multivalued attribute in an E-R diagram into relational schema, a separate table for multivalued attribute along with the primary key of the base table should be created.

## Relationship Set

### 1 : 1

For one-to-one relationship mapping, one relation will include the primary key from the other relation as FK or vice versa.

### 1 : M

For many-to-one or one-to-many mappings, primary key from one side relation schema will become the FK of the many side relations.

### M : N

For many-to-many relationship, need to create a separate entity called associative / composite / bridge entity, which will have attributes which are the PK from the two participating entities.

## Mapping EER Model Constructs to Relations

### Options for Mapping Specialization or Generalization

#### Multiple Relations

##### Option A: Superclass and Subclass

1. Create relation for superclass and subclasses.
2. The primary key of superclass becomes the primary key of each subclasses.

This option works for any specialization.

##### Option B: Subclass Relations Only

1. Create a relation for each subclass, where the attributes of the superclass with the attributes of the subclases added with the attributes of each subclass.
2. Primary key of the superclass will be the primary key of each subclasses.

This option only works for a specialization whose subclasses are **total**.

If the specialization is overlapping, the same entity may be duplicated in several relations.

#### Single Relation

##### Option C: With One Type Attribute

1. Create one single relation with all the attributes from superclass and subclass.
2. Add a single attribute indicates the subclass to which each tuple belongs.

The attribute is called a type or discriminating attribute that indicates the subclass to which each tuple belongs.

##### Option D: With Multiple Type Attributes

1. Create a single relation with the attributes from superclass and subclasses.
2. Add multiple type attributes with Boolean data type which indicates whether a tuple belongs to the subclass.
