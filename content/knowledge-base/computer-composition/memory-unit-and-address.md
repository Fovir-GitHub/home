---
title: Memory Unit and Address
date: 2025-10-18
description: Note of memory unit and address.
weight: 4
---

## Memory Unit

It is the amount of data that can be stored in the storage unit, which is used to store data and instructions.

Computer memory stores data to be processed and instructions required for processing.

The storage capacity is expressed in terms of bytes, and it is divided into a lot of small parts called **cells**, where each cell has a unique address varying from $0$ to $\text{memory size} - 1$.

## Memory Address

Memory address is a reference to a specific memory location used in various levels by software and hardware.

Memory addresses are fixed-length sequences of **unsigned integers**.

## Types of Memory Addresses

### Physical Addresses

Each memory location has a physical address which is a code, and devices like CPU can use this code to access the corresponding memory location.

The width of bus, the number of addressable storage units, and the number of bits in each unit vary among computers.

### Logical Addresses

Application programs do not have a knowledge of physical addresses, so they access logical addresses by using memory management unit (MMU) and operating system memory mapping.

### Linear Address (Virtual Address)

Virtual address space is the set of ranges of virtual addresses that an operating system makes available to a process.

The range of virtual addresses usually starts at a low address and can extend to the highest address allowed by the computer's instruction set architecture and supported by the operating system's pointer size implementation, which can be $4$ bytes for 32-bit or $8$ bytes for 64-bit OS versions.

## Word Size

A word size is characteristic to a given computer architecture.

It denotes the number of bits that a CPU can process at one time.

Modern processors, including embedded systems, usually have a word size of 8, 16, 24, 32 or 64 bits; most current general purpose computers use 32 or 64 bits.

## Address Size

The address size is usually the same to the word size.

But computers can have memory addresses larger or smaller than their word size.

## Address of 80 X 86

### Logical Address

In 8086, a logical address is made up with two parts: `Segment:Offset`, and the corresponding physical address can be calculated by:

$$
\text{Physical} = \text{Segment} \times 16 + \text{Offset}
$$

### Linear Address (Virtual Address)

A single 32-bit unsigned integer that can be used to address up to $4$ GB.

### Physical Address

Physical addresses are represented as 32-bit or 36-bit unsigned integers.

## Content of Memory Location

Each memory location has:

- Bytes
- Words
- Double-words

If the address bus has $n$ lines, then the address set is $2^n$. And if $A$ is the address space, then

$$
A = \{0, 1, \dots, 2^n - 1\}
$$

## Memory Model in x86 Architecture

Early x86 computers use the segmented memory model addresses based on a combination of a memory segment and an offset within that segment.

Some segments are implicitly treated as code segments, dedicated for instructions, stack segments, or normal data segments

## Memory Segmentation

Memory segmentation is the division of a computer's primary memory into segments or sections.

It is a reference to a memory location includes a value that identifies a segment and an offset (memory location) within that segment.

### Types of Memory Segmentation

- Code Segment
- Stack Segment
- Data Segment
- Extra Segment

### Cases

#### Memory-8086

It can generate a 20-bit physical address with segmented memory model.

#### Memory-80386

It contains the following memory management models:

- Flat Model
- Segmented Model
- Paging Model
- Multi-Level Paging Model
- Segmentation And Paging Model
