---
title: Database Opeartion
date: 2025-10-20
description: Use SQL statements to operate database.
weight: 3
---

## List All Database

```sql
SHOW DATABASES;
```

## Create Database

```sql
CREATE DATABASE mydb;
```

## Switch to A Database

```sql
USE mydb;
```

## Delete (Drop) A Database

```sql
DROP DATABASE mydb;
```

## Migrate Database

The migration process includes two steps, export and import.

### Export

In the CLI, the export operation can be done by the following command:

```bash
mysqldump -u root -p target_db_name > backup.sql
```

- `-u` is used to specify the user.
- `-p` is used to ask for password. If the user does not have a password, this argument should not be passed.

If you want to specify the socket, you can pass `--socket=/path/to/socket`.

### Import

After getting the `backup.sql` file, we can import it to a new database.

Suppose that we want to import the file into `new_db` database, then run the following command in CLI:

```bash
mysql -u root -p new_db < backup.sql
```

Each argument is the same as the previous section.

## Rename A Database

Modern MySQL had removed the directly rename method. So, to rename a database, we need to export the original database, create a new database with a new name, and finally import the original data, which is the same as migrate `old_db` to `new_db`.
