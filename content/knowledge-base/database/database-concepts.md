---
title: Database Concepts
description: Introduction of database concepts.
date: 2025-10-08
weight: 2
---

## Database System Concepts

- **Data**: Information stored in a structured form.
- **Database**: A structured collection of data stored electronically.
- **Database Management System (DBMS)**: A software system used to manage databases and allows users to interact with data.
- **Database Model**: The way data is logically structured and represented such as relational, NoSQL, etc.
- **Queries**: A way to retrieve or manipulate data using languages like SQL.

## Data Schema

A data schema defines the structure and organization of data within a database.

- **Entity**: A definable thing.
- **Attribute**: A property or characteristic of an entity.
- **Relationship**: How entities are associated with each other.
- **Relation**: A relation is a table with columns and rows.
- **Tuple**: A tuple is a row of a relation.
- **Cardinality**: The cardinality of a relation is the number of tuples it contains.

### Characteristics of a Relation

1. Rows contain data about an entity.
2. Columns contain data about attributes of the entity.
3. Cells of the table hold a single value.
4. All entries in a column are of the same kind.
5. Each column has a unique name.
6. The order of the columns is unimportant.
7. The order of the rows is unimportant.
8. No two rows may be identical.

## Entity Relationship (ER) Diagram

An ER diagram is a type of flowchart, illustrating how entities related to each other within a system.

### Shapes

1. Rectangles represent entity sets.
2. Diamonds represent relationship sets.
3. Lines link attributes to entity sets and entity sets to relationship sets.
4. Ellipses represent attributes
   - Double ellipses represent multivalued attributes.
   - Dashed ellipses denote derived attributes.
5. Underline indicates primary key attributes

**Example**:

```mermaid
flowchart TD
  customer["Customer"]
  id(["ID"])
  name(["Name"])
  street(["Street"])
  city(["City"])

  customer---id
  customer---name
  customer---street
  customer---city

  loan["Loan"]
  number(["Number"])
  amount(["Amount"])

  loan---number
  loan---amount

  borrower{"Borrower"}
  customer---borrower---loan
```
