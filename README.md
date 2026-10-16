# Subscription service

> Короткий опис відповідальності — 1–2 речення. **TODO**

**Status:** TODO (implemented / partial / scaffolded / planned)

## Documentation map

| Topic | File |
|-------|------|
| Entities & ER diagram | [docs/entities.md](docs/entities.md) |
| Product requirements | [docs/product-requirements.md](docs/product-requirements.md) |
| Business logic | [docs/business-logic.md](docs/business-logic.md) |
| HTTP API | [docs/api.md](docs/api.md) |
| Kafka messaging | [docs/messaging.md](docs/messaging.md) |
| Architecture | [docs/architecture.md](docs/architecture.md) |
| Datastores | [docs/datastores.md](docs/datastores.md) |
| Dependencies | [docs/dependencies.md](docs/dependencies.md) |
| Configuration | [docs/configuration.md](docs/configuration.md) |

## Canonical references

- Cross-service catalog: `mindlet-api/docs/services.md` (file not added yet; TBD)
- Domain model: [../../../docs/02-domain-model.md](../../../docs/02-domain-model.md)
- Roles & permissions: [../../../docs/03-roles-and-permissions.md](../../../docs/03-roles-and-permissions.md)
- Kafka events catalog: [../../docs/kafka-events.md](../../docs/kafka-events.md)
- Product feature(s):

- [16-subscription-and-payments.md](../../../docs/features/16-subscription-and-payments.md)

## Team plan limits

`FindTeamPlanLimits` (gRPC, `SubscriptionPlanService`) returns the limits that apply to a team. Plans are not stored yet, so every team gets the platform ceiling from the environment:

| Variable | Meaning | Default |
|---|---|---|
| `MAX_COURSES_PER_TEAM` | Course ceiling returned as `maxCoursesPerTeam` | `50` (placeholder; a positive integer is required, anything else falls back to the default) |

When plan limits are stored, only `SubscriptionPlanService.findTeamPlanLimits` changes; callers (the course service, ADR-0009 of the courses feature) keep the same contract.
