/**
 * Zod schema validation tests
 */

import { describe, it, expect } from 'vitest';
import {
  ExecuteSpecInputSchema,
  DryRunResponseSchema,
  ExecutionResponseSchema,
  SpecResponseSchema,
  QueryTraceInputSchema,
  QueryTraceResponseSchema,
  RegistryImportInputSchema,
  RegistryImportResponseSchema,
  ModelEntrySchema,
  QualityScoresSchema,
} from './types.js';
import {
  MOCK_DRY_RUN_RESPONSE,
  MOCK_EXECUTION_RESPONSE,
  MOCK_TRACE_RESPONSE,
  MOCK_REGISTRY_IMPORT_RESPONSE,
} from './fixtures/mock-responses.js';

describe('ExecuteSpecInputSchema', () => {
  it('accepts valid input', () => {
    const result = ExecuteSpecInputSchema.safeParse({
      spec: '# Test\n## Requirements\n- Do thing',
      dryRun: true,
    });
    expect(result.success).toBe(true);
  });

  it('rejects empty spec', () => {
    const result = ExecuteSpecInputSchema.safeParse({ spec: '' });
    expect(result.success).toBe(false);
  });

  it('rejects spec over 50k chars', () => {
    const result = ExecuteSpecInputSchema.safeParse({
      spec: 'x'.repeat(50001),
    });
    expect(result.success).toBe(false);
  });

  it('accepts without dryRun', () => {
    const result = ExecuteSpecInputSchema.safeParse({ spec: 'test' });
    expect(result.success).toBe(true);
  });
});

describe('DryRunResponseSchema', () => {
  it('validates dry run response', () => {
    const result = DryRunResponseSchema.safeParse(MOCK_DRY_RUN_RESPONSE);
    expect(result.success).toBe(true);
  });

  it('rejects wrong mode', () => {
    const result = DryRunResponseSchema.safeParse({
      ...MOCK_DRY_RUN_RESPONSE,
      mode: 'execute',
    });
    expect(result.success).toBe(false);
  });
});

describe('ExecutionResponseSchema', () => {
  it('validates execution response', () => {
    const result = ExecutionResponseSchema.safeParse(MOCK_EXECUTION_RESPONSE);
    expect(result.success).toBe(true);
  });

  it('accepts null analysis', () => {
    const result = ExecutionResponseSchema.safeParse({
      ...MOCK_EXECUTION_RESPONSE,
      analysis: null,
    });
    expect(result.success).toBe(true);
  });
});

describe('SpecResponseSchema', () => {
  it('validates dry run variant', () => {
    const result = SpecResponseSchema.safeParse(MOCK_DRY_RUN_RESPONSE);
    expect(result.success).toBe(true);
  });

  it('validates execution variant', () => {
    const result = SpecResponseSchema.safeParse(MOCK_EXECUTION_RESPONSE);
    expect(result.success).toBe(true);
  });

  it('rejects invalid mode', () => {
    const result = SpecResponseSchema.safeParse({ mode: 'invalid' });
    expect(result.success).toBe(false);
  });
});

describe('QueryTraceInputSchema', () => {
  it('accepts valid input', () => {
    const result = QueryTraceInputSchema.safeParse({
      runId: 'run-123',
      eventType: 'model.called',
      limit: 50,
    });
    expect(result.success).toBe(true);
  });

  it('rejects empty runId', () => {
    const result = QueryTraceInputSchema.safeParse({ runId: '' });
    expect(result.success).toBe(false);
  });

  it('rejects limit over 500', () => {
    const result = QueryTraceInputSchema.safeParse({
      runId: 'test',
      limit: 501,
    });
    expect(result.success).toBe(false);
  });
});

describe('QueryTraceResponseSchema', () => {
  it('validates trace response', () => {
    const result = QueryTraceResponseSchema.safeParse(MOCK_TRACE_RESPONSE);
    expect(result.success).toBe(true);
  });

  it('rejects invalid source', () => {
    const result = QueryTraceResponseSchema.safeParse({
      ...MOCK_TRACE_RESPONSE,
      source: 'invalid',
    });
    expect(result.success).toBe(false);
  });
});

describe('RegistryImportInputSchema', () => {
  it('accepts all providers', () => {
    for (const provider of ['anthropic', 'google', 'openai']) {
      const result = RegistryImportInputSchema.safeParse({
        provider,
        modelId: 'test',
      });
      expect(result.success).toBe(true);
    }
  });

  it('rejects invalid provider', () => {
    const result = RegistryImportInputSchema.safeParse({
      provider: 'invalid',
      modelId: 'test',
    });
    expect(result.success).toBe(false);
  });

  it('rejects empty modelId', () => {
    const result = RegistryImportInputSchema.safeParse({
      provider: 'anthropic',
      modelId: '',
    });
    expect(result.success).toBe(false);
  });
});

describe('ModelEntrySchema', () => {
  it('validates model entry', () => {
    const result = ModelEntrySchema.safeParse(
      MOCK_REGISTRY_IMPORT_RESPONSE.entry
    );
    expect(result.success).toBe(true);
  });
});

describe('QualityScoresSchema', () => {
  it('validates quality scores', () => {
    const result = QualityScoresSchema.safeParse({
      reasoning: 8,
      codeGeneration: 7,
      speed: 6,
      cost: 5,
    });
    expect(result.success).toBe(true);
  });

  it('rejects missing fields', () => {
    const result = QualityScoresSchema.safeParse({
      reasoning: 8,
    });
    expect(result.success).toBe(false);
  });
});

describe('RegistryImportResponseSchema', () => {
  it('validates full response', () => {
    const result = RegistryImportResponseSchema.safeParse(
      MOCK_REGISTRY_IMPORT_RESPONSE
    );
    expect(result.success).toBe(true);
  });

  it('validates warnings array', () => {
    const result = RegistryImportResponseSchema.safeParse(
      MOCK_REGISTRY_IMPORT_RESPONSE
    );
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.warnings.length).toBeGreaterThan(0);
    }
  });
});
