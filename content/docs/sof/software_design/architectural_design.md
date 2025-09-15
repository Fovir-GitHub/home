---
title: Architectural Design
date: 2025-06-09
weight: 5
description: Introduce the architectural design.
---

## Software Architecture

- Architectural Design:
  - The design process for identifying the sub-systems making up a system.
  - And the framework for subsystems control and communication.
- Software Architecture: the output of Architectural Design process.

## Introduction of Architectural Design

- It is concerned with understanding how a software system should be organized and designing the overall structure of that system.
- Architectural design is the critical link between design and requirements engineering, as it identifies the main structural components in a system and the relationships between them.
- The output of the architectural design process is an architectural model that describes how the system is organized as a set of communicating components.
- Software architecture affects the performance, robustness, disreputability, and maintainability of a system.

## Architectural Abstraction

- Architecture in the small is concerned with the architecture of individual programs. At the level, an individual program is decomposed into components.
- Architecture in the large is concerned with the architecture of complex enterprise systems that include other systems, and program components.
- These enterprise systems are distributed over different computers, which may be owned and managed bu different companies.

## Architecture View

There are four architecture view:

- Logic view
  - Shows the key abstractions in the system as objects or object classes.
- Process view
  - Show how the system is composed of interacting processes at run-time.
- Development view
  - Shows how the software is decomposed for development.
- Physical view
  - Shows the system hardware and how software components are distributed across the processors in the system.

## Architectural Representations

**Informal block diagrams** showing entities and relationships are the most frequently used method for documenting software architectures.

They have the following disadvantages:

- Lack of semantics.
- Do not show the types of relationships between entities nor the visible properties of entities in the architecture.
- It depends on the use of architectural models. And the requirements for model semantics depends on how the model are used.
- It is very abstract, because they do not show the nature of component relationships nor the externally visible properties of the sub-systems.

On the other hand, they also have advantage, which is useful for communication with stakeholders and for project planning.

### Advantages of Explicit Architecture

- Stakeholder Communication
  - Architecture may be used as focus of discussion by system stakeholders.
- System Analysis
  - Make it possible to analyze whether the system can meet its non-functional requirements.
- Large-scale Reuse
  - The architecture may be reusable across a range of systems.
  - Product-line architectures may be developed.

### Use of Architectural Models

- As a way of facilitating discussion about the system design:
  - A high-level architectural view of a system is useful for communication with system stakeholders and project planning because it is not cluttered with detail.
  - Stakeholders can relate to it and understand an abstract view of the system.
  - Stakeholders can discuss the system as a whole without being confused by detail.
- As a way of documenting an architecture that has been designed.
  - The aim is to produce a complete system model that shows the different components in a system, their interfaces, and their connections.

## Architectural Design Decision

Architectural design is a creative process so the differs depending on the type of system being developed.

However, a number of common decisions span all design processes and these decisions affect the non-functional characteristics of the system.

## Architecture Reuse

- Systems in the same domain often have similar architecture that reflect domain concepts.
- Application product lines are built around a core architecture with variants that satisfy particular customer requirements.
- The architecture of a system may be designed around one of more architectural patterns or styles.
- These capture the essence of an architecture and can be instantiated in different ways.
