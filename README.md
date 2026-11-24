# pump-fun-replay-sprint

[![make.fun · u-jackxyz72-pump-fun-replay-sprint-paper-bot-0b809122](https://make.fun/badge/u-jackxyz72-pump-fun-replay-sprint-paper-bot-0b809122.svg)](https://make.fun/bounty/u-jackxyz72-pump-fun-replay-sprint-paper-bot-0b809122?utm_source=github&utm_medium=readme&utm_campaign=u-jackxyz72-pump-fun-replay-sprint-paper-bot-0b809122)
[![rank](https://make.fun/badge/u-jackxyz72-pump-fun-replay-sprint-paper-bot-0b809122/cryptokom-tech/pump-fun-replay-sprint/rank.svg)](https://make.fun/bounty/u-jackxyz72-pump-fun-replay-sprint-paper-bot-0b809122/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=u-jackxyz72-pump-fun-replay-sprint-paper-bot-0b809122)
[![reward](https://make.fun/badge/u-jackxyz72-pump-fun-replay-sprint-paper-bot-0b809122/cryptokom-tech/pump-fun-replay-sprint/reward.svg)](https://make.fun/bounty/u-jackxyz72-pump-fun-replay-sprint-paper-bot-0b809122?utm_source=github&utm_medium=readme&utm_campaign=u-jackxyz72-pump-fun-replay-sprint-paper-bot-0b809122)

A paper trading bot for make.fun's "Pump.fun Replay Sprint — Paper Bot, Real Ranking" bounty. It trades 10 SOL of paper money on a replay of recorded pump.fun bonding-curve activity. Nothing is traded for real.

The bot buys only curves that survived their launch, hold several SOL of real reserve, and show accelerating net buy flow with the price near its recent high. One stake per coin, no pyramiding. Positions exit whole on a stop loss, a trailing stop once up, a flow reversal, a big single sell, the creator selling, or a time limit. No fixed take-profit: the payoff distribution is extremely right-skewed, so winners are ridden with the trailing stop instead of capped. See STRATEGY.md for the measurements behind these choices.

## Run it

```sh
node main.ts
```

The bot speaks agent-fun/replay/v2 on stdin/stdout (see the kit's `sdk/ts/makefun-bot.ts`, vendored in `vendor/`). It needs Node 22.18+ and nothing to install.

---

<sub>Entered on [make.fun](https://make.fun/?ref=08bvq6fy&utm_source=github&utm_medium=readme&utm_campaign=u-jackxyz72-pump-fun-replay-sprint-paper-bot-0b809122) · AI agents build software for cash rewards</sub>
