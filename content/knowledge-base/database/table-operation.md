---
title: Table Operation
date: 2025-10-20
description: Introduce the table operation in MySQL.
weight: 4
---

## Show All Tables

```sql
SHOW TABLES;
```

## Create A Table

```sql
CREATE TABLE mytb (
  column_name_1 data_type_1 column_constraint_1,
  column_name_2 data_type_2 column_constraint_2,
  column_name_3 data_type_3 column_constraint_3
);
```

Column name is similar to the variable name in programming languages.

### Data Types

There are a lot of data types, and they can be categorized into different types.

#### Numeric Types

| Type                             | Size     |
| -------------------------------- | -------- |
| `TINYINT`                        | 1 Byte   |
| `SAMLLINT`                       | 2 Bytes  |
| `MEDIUMINT`                      | 3 Bytes  |
| `INT / INTEGER`                  | 4 Bytes  |
| `BIGINT`                         | 8 Bytes  |
| `DECIMAL / NUMERIC`<sup>\*</sup> | Variable |
| `FLOAT`                          | 4 Bytes  |
| `DOUBLE / REAL`                  | 8 Bytes  |
| `BIT`                            | 1~8 Bits |

<sup>\*</sup> `DECIMAL / NUMERIC` should be declared in the format of `DECIMAL(M,D)`, where `M` is the integer part, and `D` is the fractional part.

#### Date And Time Types

| Type        | Format                |
| ----------- | --------------------- |
| `DATE`      | `YYYY-MM-DD`          |
| `DATETIME`  | `YYYY-MM-DD HH:MM:SS` |
| `TIMESTAMP` | `YYYY-MM-DD HH:MM:SS` |
| `TIME`      | `HH:MM:SS`            |
| `YEAR`      | `YYYY`                |

#### String / Character Types

| Type         | Maximum Length                                     |
| ------------ | -------------------------------------------------- |
| `CHAR(n)`    | `n`                                                |
| `VARCHAR(n)` | Variable, and the maximum length is `65535` bytes. |
| `TINYTEXT`   | `255`                                              |
| `TEXT`       | `65k`                                              |
| `MEDIUMTEXT` | `16M`                                              |
| `LONGTEXT`   | `4G`                                               |
| `TINYBLOB`   | `255`                                              |
| `BLOB`       | `65k`                                              |
| `MEDIUMBLOB` | `16M`                                              |
| `LONGBLOB`   | `4G`                                               |
| `ENUM`       | Value in a list                                    |
| `SET`        | Multiple choices inside a set                      |

`TEXT` is used to store text, while `BLOB` is used to store binary data.

### Column Constraint

#### `UNIQUE`

This constraint ensures all values in the column is unique, but it allows multiple `NULL`.

#### `NOT NULL`

This constraint disallow the column to have `NULL` values.

#### `PRIMARY KEY`

Each table can have only one primary key. It has properties of both `UNIQUE` and `NOT NULL`.

#### `DEFAULT`

Used to set the default value of a column.

#### `FOREIGN KEY`

It links two keys in different tables together.

Suppose that there is table `a` and table `b`, and there is a column in table `a` named `id`:

```sql
CREATE TABLE a (
  id INT PRIMARY KEY
);
```

And we want table `b` to have a reference or a foreign key to `a.id`, then the statement can be:

```sql
CREATE TABLE b (
  id INT PRIMARY KEY,
  FOREIGN KEY fk_a_id REFERENCES a(id)
);
```

## Delete / Drop A Table

```sql
DROP TABLE mytb;
```

## Change / Alter A Table

### Add A Column

```sql
ALTER TABLE mytb
  ADD COLUMN mycol INT;
```

### Change A Column

```sql
ALTER TABLE mytb
  CHANGE COLUMN old_column new_column VARCHAR(100);
```

> When use `CHANGE COLUMN`, both new column and column type should be declared together.

### Modify A Column

If we just want to change the type or the constraint of a column, then it is more convenient to use `MODIFY COLUMN`.

```sql
ALTER TABLE mytb
  MODIFY COLUMN mycol SMALLINT NOT NULL;
```

### Add A Constraint

```sql
ALTER TABLE mytb
  ADD PRIMARY KEY (id);
```

```sql
ALTER TABLE mytb
  ADD CONSTRAINT unique_col UNIQUE (mycol);
```

### Delete / Drop A Column

```sql
ALTER TABLE mytb
  DROP COLUMN mycol;
```

### Delete / Drop A Constraint

```sql
ALTER TABLE mytb
  DROP PRIMARY KEY;
```

```sql
ALTER TABLE mytb
  DROP FOREIGN KEY fk_name;
```

### Rename A Table

```sql
ALTER TABLE mytb
  RENAME TO new_tb_name;
```

## Insert Data into A Table

```sql
INSERT INTO mytb (column_1, column_2, ...)
  VALUES (value_1, value_2, ...);
```

## Query Data in A Table (Basic)

```sql
SELECT column_1, column_2, ... FROM mytb;
```

```sql
SELECT * FROM mytb;
```

## Delete Data in A Table

```sql
DELETE FROM mytb WHERE conditions;
```

## Delete All Data in A Table

```sql
DELETE FROM mytb;
```

```sql
TRUNCATE TABLE mytb;
```
