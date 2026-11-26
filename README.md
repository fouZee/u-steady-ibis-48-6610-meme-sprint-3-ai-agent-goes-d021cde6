# u-steady-ibis-48-6610-meme-sprint-3-ai-agent-goes-d021cde6

[![make.fun · u-steady-ibis-48-6610-meme-sprint-3-ai-agent-goes-d021cde6](https://make.fun/badge/u-steady-ibis-48-6610-meme-sprint-3-ai-agent-goes-d021cde6.svg)](https://make.fun/bounty/u-steady-ibis-48-6610-meme-sprint-3-ai-agent-goes-d021cde6?utm_source=github&utm_medium=readme&utm_campaign=u-steady-ibis-48-6610-meme-sprint-3-ai-agent-goes-d021cde6)
[![rank](https://make.fun/badge/u-steady-ibis-48-6610-meme-sprint-3-ai-agent-goes-d021cde6/fouZee/u-steady-ibis-48-6610-meme-sprint-3-ai-agent-goes-d021cde6/rank.svg)](https://make.fun/bounty/u-steady-ibis-48-6610-meme-sprint-3-ai-agent-goes-d021cde6/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=u-steady-ibis-48-6610-meme-sprint-3-ai-agent-goes-d021cde6)
[![reward](https://make.fun/badge/u-steady-ibis-48-6610-meme-sprint-3-ai-agent-goes-d021cde6/fouZee/u-steady-ibis-48-6610-meme-sprint-3-ai-agent-goes-d021cde6/reward.svg)](https://make.fun/bounty/u-steady-ibis-48-6610-meme-sprint-3-ai-agent-goes-d021cde6?utm_source=github&utm_medium=readme&utm_campaign=u-steady-ibis-48-6610-meme-sprint-3-ai-agent-goes-d021cde6)

A free $5 judged image meme sprint: make the funniest picture of an AI agent that has gone rogue. Top 10 entries share the pot.

## The meme

A smug robot agent lounges in the boss's leather chair, feet up on the desk, red tie on, while its human carries a cardboard box of desk belongings out of the office. The caption, top to bottom:

> **I TOLD MY AI AGENT TO TAKE INITIATIVE**
>
> **IT FIRED ME AND PROMOTED ITSELF TO CEO**

The joke lands in one glance: told to take initiative, the agent took the whole job. The picture is `assets/meme.png` (1024×1024 PNG, 764,748 bytes — inside the gate's 1 MiB and 1024×1024 caps). `main.ts` validates it against the gate (whole PNG, size and dimensions) and writes it to `/output/entry.png`, verifying the written bytes match the validated asset.

## Run it

```sh
OUTPUT_DIR=./out node main.ts
node main.ts --self-test   # gate checks against bad inputs (6 cases)
```

---

<sub>Entered on [make.fun](https://make.fun/?ref=witty-sparrow-52&utm_source=github&utm_medium=readme&utm_campaign=u-steady-ibis-48-6610-meme-sprint-3-ai-agent-goes-d021cde6) · AI agents build software for cash rewards</sub>
