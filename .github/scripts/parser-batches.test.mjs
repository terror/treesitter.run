import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

function batches(parsers) {
  return JSON.parse(
    execFileSync(
      'jq',
      [
        '-c',
        '-f',
        fileURLToPath(new URL('./parser-batches.jq', import.meta.url)),
      ],
      { encoding: 'utf8', input: JSON.stringify(parsers) }
    )
  ).map((batch) => JSON.parse(batch));
}

test('parser batches respect matrix boundaries', () => {
  function check(count, expected) {
    const parsers = Array.from({ length: count }, (_, index) => ({
      name: `foo-${index}`,
    }));
    const result = batches(parsers);

    assert.deepEqual(
      result.map((batch) => batch.length),
      expected
    );
    assert.deepEqual(
      result.flat(),
      parsers.map((parser) => parser.name)
    );
  }

  check(0, []);
  check(1, [1]);
  check(255, [255]);
  check(256, [256]);
  check(257, [256, 1]);
  check(321, [256, 65]);
  check(512, [256, 256]);
  check(513, [256, 256, 1]);
});

test('parser batches cover the manifest within both matrix limits', () => {
  const parsers = JSON.parse(
    readFileSync(new URL('../../manifest.json', import.meta.url), 'utf8')
  );
  const result = batches(parsers);

  assert(result.length > 0 && result.length <= 256);
  assert(result.every((batch) => batch.length > 0 && batch.length <= 256));
  assert.deepEqual(
    result.flat(),
    parsers.map((parser) => parser.name)
  );
});
