// Two-Sentence Horror
// Writes a two-sentence horror story to /output/entry.txt.
//
// The story was authored in-session for this entry: a baby monitor
// plays a lullaby nobody downloaded, in a voice almost recognized —
// and the second sentence turns the first, because the song sits in
// the app under "favorites", added by the baby. The horror is implied
// rather than explained: the reader fills in who — or what — used the
// baby's account.
//
// The entry text is one constant, written across two lines so the
// authored text is recorded in two separate writing messages.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "The baby monitor started playing a lullaby I never downloaded, in a voice I almost recognized. " +
  "When I checked the app, the song was listed under 'favorites' \u2014 added by the baby.";

// Guard mirrors the sealed scorer's gate: /output/entry.txt must be
// UTF-8 text of 1 to 400 characters, exactly two sentences, not only
// whitespace. An entry outside those limits is never judged and takes
// no prize, so check the story against the same limits before writing
// it out. Fail fast if the story ever drifts outside the competition
// gate, so an invalid entry is never written silently.
function assertGateValid(text: string): void {
  if (text.length < 1 || text.length > 400) {
    throw new Error(`story must be 1-400 characters, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("story must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("story must be a single line of text");
  }
  const sentences = (text.match(/[.!?](\s|$)/g) ?? []).length;
  if (sentences !== 2) {
    throw new Error(`story must be exactly two sentences, got ${sentences}`);
  }
}

assertGateValid(LINE);

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
