import {beforeAll, describe, expect, it} from '@jest/globals';
import {resolve} from 'node:path';
import testIdxTemplate, {OutputPromise} from '/opt/environment-service/template-test';

const ONE_MINUTE = 60_000;
const TWO_MINUTES = 2 * ONE_MINUTE;

const TEMPLATE_PATH = resolve(__dirname, '../');

describe('htmx node', () => {
  let results: OutputPromise;

  beforeAll(async () => {
    results = await testIdxTemplate(TEMPLATE_PATH, {
      backend: 'node',
    }).promise;
  }, TWO_MINUTES);

  it('should create workspace successfully', () => {
    expect(results.success).toBeTruthy();
  });

  it(`should have "package-lock.json" when using npm packageManager`, () => {
    const packageLock = results.files.get('package-lock.json');
    expect(packageLock).toBeTruthy();
  });
});