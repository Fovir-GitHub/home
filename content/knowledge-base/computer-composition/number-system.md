---
title: Number System
description: Introduction of the number system.
date: 2025-10-06
---

## Number Representation

A number can be represented by

$$
X_{n} X_{n - 1} \dots X_1 X_0 X_{-1} \dots X_{-m} = \sum^{n}_{i=-m}{X_i} \times 10^{i}
$$

Where $X$ is `base` or `radix`.

Let $b$ be the `base`, then $X \in [0, b)$

## Common Bases

| Name               | Base | Postfix    |
| ------------------ | ---- | ---------- |
| Binary Number      | $2$  | $B$        |
| Octal Number       | $8$  | $Q$ or $O$ |
| Decimal Number     | $10$ | $D$        |
| Hexadecimal Number | $16$ | $H$        |

## Number Conversions

### Convert to Decimal Numbers

Suppose there is a number in base $b$, which looks like $a_n a_{n-1} \dots a_1 a_0 . a_{-1} a_{-2} \dots a_{-m}$, then the formula of converting it to a decimal number is:

$$
\sum_{i=-m}^{n}{a_i b^i}
$$

### Convert A Decimal Number to Other Bases

Suppose there is a decimal number `n`, and it needs to be converted to a number based `b`. Then the process is:

1. Calculate $a = n \mod b$.
2. Append $a$ to the end of result.
3. Let $n = n / b$
4. Repeat steps 1 to 3 until $n = 0$.

### Conversion Between Non-decimal Numbers

Convert a number to binary number, and then convert the binary number to the target number.

## Non-numeric Data Representation

### Binary Coded Decimal (BCD) Code

The range of a BCD digit is `0000B` to `1001B`, also $0 - 9$ decimal.

It has two types, packed BCD and unpacked BCD.

- Packed BCD stores two digits per byte, which is better for storage.
- Unpacked BCD stores one digit per byte, which is easy for computer to access data.

### ASCII Code

The range of ASCII code is from $0$ to $127$, while extended ASCII code is range from $0$ to $255$.

## Units

- Bit ($0$ or $1$)
- Byte (8 bits)
- Word (16 bits)
- Double word (32 bits)
