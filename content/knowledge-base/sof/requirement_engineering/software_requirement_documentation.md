---
title: Software Requirement Documentation / Specification
date: 2025-06-08
weight: 7
description: Introduce the software requirement specification (SRS).
---

## Definition

- The process of writing down the user and system requirements in a requirements document.
- User requirements have to be understandable by end users and customers who do not have a technical background.
- System requirements are more detailed requirements and may include more technical information.
- The requirements may be part of a contract for the system development.
- It is therefore important that these are as complete as possible.

## Need for SRS

- Help user understand his needs.
- SRS provides a reference for validation of the final product.
- High quality SRS essential for high Quality SW.
- Good SRS reduces the development cost.

## Structure of SRS

- Preface (including change history)
- Introduction
- Contents
- Glossary
- User requirements definition
- System architecture
- System requirements specification
- System models
- System evolution
- Appendices
- Index

## Key Characteristics of a Good SRS

- Some key ones are complete
- Unambiguous
- Consistent
- Verifiable
- Ranked for important and/or stability

## Requirements Document / Specification (SRS)

- The official statement of what is required of the system developers.
- Should include both a definition and a specification of requirement.
- It is not a design document.
- Set of what the system should do rather than how it should do it.
- **Specify external system behavior.** (What does it do?)
- **Specify implementation constraints.** (What system it must run on, what programming language it must use?)
- **Easy to change.** Serve as reference tool for maintenance.
- **Record forethought about the life cycle of the system.** (How can it be expanded for more users?)
- **Characterize response to unexpected events.** (e.g. What should it do if power is lost?)
- The level of detail depends on both the type of system and the development process being used.
- In evolutionary development model the requirements may change many times.
- In the waterfall model, it should be more complete before design stage.
- If the (sub-)system developed by an external contractor, or it is a critical system, more time needs to be taken on finalizing the requirements document.

### Way of Writing a System Requirements Specification

- Natural Language
  - mostly used, with some structure for the document Formal languages are precise and unambiguous, but hard Formal languages used for special features or in highly critical systems.
  - Lack of clarity.
  - Functional and non-functional requirements tend to be mixed-up in same document.
  - Several requirements may be expressed together, leading to problems with testing/debugging.
- Structured Natural Language
  - The requirement writer is limited and requirements are written in a standard way.
  - This works well for some types of requirements.
  - Form-based specifications:
    - Definition of the function or entity.
    - Description of inputs and where they come from.
    - Description of outputs and where they go to.
    - Information about the information needed for the computation and other entities used.
    - Description of the action to be taken.
    - Pre- and post-conditions (if appropriate).
    - The side effects (if any) of the function.
- Design Description Languages
- Graphical Notations
- Mathematical Specifications

## Use Case

- A description of the interactions possible between actors and system, that when executed, provide added value.
- Use case diagrams provide an overview.
- Use case descriptions provide the details.
