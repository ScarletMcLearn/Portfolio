---
title: 'API Contract, Schema & Microservice Validation Strategy'
discipline: 'quality-engineering'
projectType: 'case-study'
summary: 'Contract and schema-validation strategy for a distributed API platform, using Schemathesis, Pact, and OpenAPI tooling to prevent breaking changes.'
context: >
  Microservice-testing work for a distributed API platform (anonymized), where multiple services
  evolved independently and needed a way to catch breaking API changes before they reached
  consumers.
problem: >
  API-breaking changes were being discovered by downstream consumers in production rather than
  caught pre-release, because there was no automated contract or schema validation between
  services.
constraints: >
  Services were owned by different teams on independent release cycles, so validation needed to be
  decentralized (each service verifies its own contract) rather than relying on a single central
  test suite.
role: >
  Contract-testing lead: introduced Pact-based consumer-driven contract testing and OpenAPI schema
  validation into the CI pipeline for each service.
technologies:
  - Pact
  - Schemathesis
  - OpenAPI
  - Redocly CLI
  - Ajv
  - REST Assured
  - Postman
outcomes:
  - 'Introduced consumer-driven contract testing so API-breaking changes were caught in CI before deployment, preventing downstream failures.'
  - 'Added schema validation (Schemathesis, Ajv) against OpenAPI specifications to catch undocumented or invalid response shapes.'
  - 'Improved API test coverage across services by standardizing the contract-testing pattern each team could adopt independently.'
lessons:
  - Consumer-driven contracts scale better than a central integration-test suite when services have independent release cycles.
  - Schema validation catches a different class of bug than functional tests — documentation drift, not just logic errors.
publicEvidence: >
  This engagement involved a private distributed API platform and is anonymized here. The
  contract-testing and schema-validation tooling (Pact, Schemathesis, Ajv, Redocly CLI) reflects
  skills demonstrated across the broader automation portfolio.
confidentiality: 'anonymized'
evidenceLevel: 'medium'
order: 3
featured: false
---

## Approach

Each service published a Pact contract describing what its consumers actually relied on; the
provider verified that contract in its own CI pipeline before deploying. Independently, OpenAPI
specs were validated against real API responses using Schemathesis and Ajv, catching schema drift
that functional tests alone would miss.

## Additional notes

The specific distributed platform is confidential and anonymized here as a "distributed API
platform." The contract- and schema-validation approach is described at an architectural level.
