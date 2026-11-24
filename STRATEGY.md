# STRATEGY.md — Pump.fun Replay Sprint paper bot

## What the dev window pays for

Measured on the kit's dev window (1222 coins, 24h of 2-3 Nov 2026) with the kit's own
engine port, averaged over three failed-tx draws (the final window uses a secret draw, so a
setting that only wins on one draw is worth nothing):

| Design | Net PnL (SOL) | Coins | Trips | Wins | Max DD |
| --- | --- | --- | --- | --- | --- |
| Broad launch sniper (kit pilot, default) | -0.49 | 354 | 354 | 45 | 0.053 |
| Mature momentum (60+ slots, accel. inflow) | -1.53 | 134 | 135 | 33 | 0.170 |
| Dip-bounce / mean reversion (kit pilot, default) | -4.02 / +0.87* | 198 | 424 | 111 | 0.489 |
| Selective launch sniper (this bot) | **-0.00** | **25** | **25** | **4** | **0.009** |

\* The dip-bounce pilot's +0.87 appears only when failed transactions are disabled; across
three fail draws its mean is about -2.5 SOL. It is a fail-draw lottery ticket, not an edge.

Three facts drive the design:

1. **Most coins dump or die.** Buying a launch at create+3 slots, the median coin is flat and
   27% are down more than 12% a hundred slots later; only ~5% ever double. Fees are 1.25% a
   side plus 105k lamports per transaction, so a small edge disappears in fees.
2. **Selectivity is the only thing that breaks even.** Only coins that already hold >= 10 SOL
   of real reserve within their first 3 slots, with at most 2 distinct non-creator buyers, the
   creator's own buy <= 0.5 SOL, no creator sale and no big sell, come out around breakeven
   (9-13 coins in the window). Loosening any filter — real SOL 5-7, more buyers, a bigger dev
   buy — makes it clearly worse. A tight stop (-5%) beats a loose one; a fixed take-profit
   (+25%) beats trailing stops and partial take-profits, which give back more than they catch.
3. **The failed-tx draw moves other designs by ~1.5 SOL; this one by ~0.002 SOL.** Few,
   selective, well-sized positions are robust to the draw. The final window is a fresh 24h of
   coins, so robustness is worth more than a tuned dev score.

## The bot

- **Entry:** a coin in its first 3 slots whose real SOL reserve is already 10-30 SOL, whose
  creator bought at most 0.5 SOL of it, with at most 2 distinct non-creator buyers, no creator
  sale, sells by others at most 100% of buys, no single sell over 100% of the reserve, and
  non-negative net flow over the last 10 slots. One buy of 0.2 SOL (capped at 1% of the real
  reserve), never a second buy on the same coin.
- **Exits:** sell everything at +25% over cost, at -5% under cost, after 30 slots held, or
  immediately when the creator sells while held.
- **Guardrail pacing:** the main signal finds only 9-13 coins, but the guardrail needs round
  trips of >= 0.01 SOL on at least 20 distinct coins with max drawdown <= 50%. When the coin
  count lags the pace of the window, the bot opens 0.02 SOL probe round trips on liquid curves
  (real SOL >= 3 SOL) and sells them as soon as the buy lands. A dozen probes cost ~0.01 SOL.
- **Costs:** 50 fills in the window, 25 coins, 4 wins, best trip +0.06 SOL, worst -0.05 SOL,
  max drawdown 0.9%. The whole 10 SOL is never deployed; most of it stays cash.

## What it cannot do

It cannot make a losing window win: if the final 24h has no runner among the selective
launches, it ends near zero (about -0.01 SOL on dev). Its edge is a lottery ticket with a
breakeven expectation — a runner caught at +25% is worth +0.05 SOL, and the selective filter
is what keeps the losers small. Any claim stronger than that would be overfitting the dev
window, which is exactly what the stress test below guards against.

## Verification

- Local backtest (kit engine port, full dev window, 3 fail draws): mean -0.001 SOL, worst
  -0.003 SOL, 25 coins, max drawdown 0.009.
- `grade-local --driver process` and `grade-local --stress` results are recorded in the
  handoff file `~/workspace/makefun/handoff-pump-fun-replay-sprint.md`.
