---
title: Concepts in Software Design
date: 2025-06-09
description: Introduce some concepts in software design.
weight: 3
---

## Abstraction

- Solution is stated in large terms using the language of the problem environment at the highest level abstraction.
- The lower level of abstraction provides a more detail description of the solution.
- A sequence of instruction that contain a specific and limited function refers in a procedural abstraction.
- A collection of data that describes a data object is a data abstraction.

## Architecture

- The complete structure of the software is known as software architecture.
- Structure provides conceptual integrity for a system in a number of ways.
- The architecture is the structure of program modules where they interact with each other in a specialized way.
- The components use the structure of data.
- The aim of the software design is to obtain an architectural framework of a system.
- The more detailed design activities are conducted from the framework.

## Patterns

- Describe a design structure and that structure solves a particular design problem in a specified content.

## Modularity

- A software is separately divided into name and addressable components.
- Modularity is the single attribute of a software that permits a program to be managed easily.

## Information Hiding

- Modules must be specified and designed so that the information like algorithm and data presented in a module is not accessible for other modules not requiring that information.

## Functional Independence

- The functional independence is the concept of separation and related to the concept of modularity, abstraction, and information hiding.
- It is accessed using two criteria, Cohesion and Coupling.
  - **Cohesion** is an extension of the information hiding concept. A cohesive module performs a single task, and it requires a small interaction with the other components in other parts of the program.
  - **Coupling** is an indication of interconnection between modules in a structure of software.

## Refinement

- It is a top-down design approach.
- It is a process of elaboration.
- A program is established for refining levels of procedural details.
- A hierarchy is established by decomposing a statement of function in a stepwise manner till the programming language statement are reached.

## Refactoring

- It is a reorganization technique, which simplifies the design of components without changing its function behavior.
- It does not change the external behavior of the code still improves its internal structure.

## Design Classes

- The model of software is defined as a set of design classes.
- Every class describes the elements of problem domain and the features of the problem which are user visible.
