---
title: Queries
description: Queries in MySQL.
date: 2025-10-31
weight: 7
---

## Select All Elements

```sql
SELECT * FROM table;
```

## Remove Duplicated Elements

```sql
SELECT DISTINCT col FROM table;
```

## Selection with Conditions

```sql
SELECT * FROM mytable WHERE attr = 'something';
```

### Comparison Operators

| Operator                  | Mean               |
| ------------------------- | ------------------ |
| `=`                       | Equal              |
| `<>` or `!=`              | Not equal          |
| `<`                       | Less than          |
| `>`                       | More than          |
| `<=`                      | Less than or equal |
| `>=`                      | More than or equal |
| `<=>`                     | Safe equal         |
| `IS NULL` / `IS NOT NULL` | Equal to `NULL`    |

Only `<=>` can be used to judge two `NULL` are equal.

### Logical Operators

| Operator        | Mean |
| --------------- | ---- |
| `AND` or `&&`   | AND  |
| `OR` or `` ` `` | OR   |
| `NOT` or `!`    | NOT  |

### Other Condition Operators

| Operator                    | Mean                                  |
| --------------------------- | ------------------------------------- |
| `BETWEEN value1 AND value2` | `value1 <= value AND value <= value2` |
| `IN (...)`                  | In the set `(...)`                    |
| `NOT IN (...)`              | Not in the set `(...)`                |
| `LIKE`                      | Fuzzy match.                          |
| `REGEXP` or `RLIKE`         | Regular expression match.             |

## Wildcard Match

`%` can match multiple random characters.

`_` can match only one random character.

## `CONCAT`

```sql
SELECT CONCAT(col_1, ' ', col_2) 'Alias Name' FROM table;
```

## Sort

Default is ascending.

```sql
SELECT col_1, col_2 FROM table ORDER BY col_1;
```

Sort in descending order:

```sql
SELECT col_1, col_2 FROM table ORDER BY col_1 DESC;
```

## Sub Query

```sql
SELECT * FROM
  (SELECT * FROM table WHERE attr1 LIKE 'A%') AS new_table
  WHERE new_table.attr2 LIKE 'AB%';
```
