// Pump.fun Replay Sprint — Paper Bot, Real Ranking.
// Entry point: the grader runs `node /bot/main.ts`. See strategy.ts for the strategy
// and STRATEGY.md for how it was chosen on the dev window.
import { runBot } from './vendor/makefun-bot.ts';
import { createStrategy, DEFAULT_PARAMS } from './strategy.ts';

await runBot(createStrategy(DEFAULT_PARAMS));
