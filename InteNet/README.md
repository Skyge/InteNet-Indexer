## Envio Blank Template

*Please refer to the [documentation website](https://docs.envio.dev) for a thorough guide on all [Envio](https://envio.dev) indexer features*

### Running The Indexer Locally

Before running the Envio CLI command to start the indexer locally, please make sure you have **Docker** running.

**Add configs**

```bash
mv .env.example .env
```

Get `ENVIO_API_TOKEN` at [Envio API Token](https://envio.dev/app/api-tokens)
Get `RPC_URL` at [dRPC](https://drpc.org?ref=19ac18)

**Run the indexer**

```bash
pnpm dev
```

**Stop the indexer**

```bash
pnpm envio stop
```
