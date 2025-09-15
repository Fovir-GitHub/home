---
title: Component Level Design
date: 2025-06-09
weight: 6
description: Introduce the component level design.
---

## Definition

- A complete set software components is defined during architectural design.
- The internal data structures and processing details of each component are not represented at a level of abstraction that is close to code.
- Component-level design defines the data structures, algorithms, interface characteristics, and communication mechanisms allocated to each component.

### Component View

- Object-oriented view:
  - A component is a set of collaborating classes.
- Conventional view:
  - A component is a functional element of a program that incorporates processing logic, the internal data structures required to implement the processing logic, and an interface that enables the component to be invoked and data to be passed to it.

### Process-related View

The system is building from existing components maintained in a library.

The software architecture is formulated, components are selected from the library and used to populate the architecture.

## Principles of Component-based Design

| Principle                                     | Description                                                                    |
| --------------------------------------------- | ------------------------------------------------------------------------------ |
| The Open-Closed Principle (OCP)               | A module component should be open for extension but closed for modification.   |
| The Liskov Substitution Principle (LSP)       | Subclasses should be substitutable for their base classes.                     |
| Dependency Inversion Principle (DIP)          | Depend on abstractions. Do not depend on concretions.                          |
| The Interface Segregation Principle (ISP)     | Many client-specific interfaces are better than one general purpose interface. |
| The Release Reuse Equivalency Principle (REP) | The granule of reuse is the granule of release.                                |
| The Common Closure Principle (CCP)            | Classes that change together belong together.                                  |
| The Common Reuse Principle (CRP)              | Classes that are not reused together should not be grouped together.           |

## Component-level Design Guidelines

1. Identify all design classes that correspond to the problem domain.
2. Identify all design classes that correspond to the infrastructure domain.
3. Elaborate all design classes that are not acquired as reusable components.
   - **Specify message details** when classes or component collaborate.
   - **Identify appropriate** interfaces for each component.
   - **Elaborate attributes** and define data types and data structures required to implement them.
   - **Describe processing** flow within each operation in detail.
4. Identify persistent data sources (databases and files) and identify the classes required to manage them.
5. Develop and elaborate behavioral representations for a class or component.
6. Elaborate deployment diagrams to provide additional implementation detail.
7. Factor every component-level design representation and always consider alternatives.
