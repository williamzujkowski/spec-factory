/**
 * Mock MCP tool responses for deterministic testing.
 */

import type {
  DryRunResponse,
  ExecutionResponse,
  QueryTraceResponse,
  RegistryImportResponse,
} from '../types.js';

export const MOCK_DRY_RUN_RESPONSE: DryRunResponse = {
  mode: 'dry_run',
  spec: {
    title: 'Test Spec',
    requirements: ['Implement hello world'],
    acceptanceCriteria: ['Output contains hello'],
  },
  dag: {
    tasks: [
      { id: 'task-1', name: 'Implement hello world', dependencies: [] },
    ],
    edges: [],
  },
};

export const MOCK_EXECUTION_RESPONSE: ExecutionResponse = {
  mode: 'execute',
  execution: {
    runId: 'run-abc-123',
    status: 'completed',
    tasksCompleted: 1,
    tasksFailed: 0,
    durationMs: 5000,
    artifacts: ['output.txt'],
  },
  analysis: null,
};

export const MOCK_EXECUTION_WITH_FAILURES: ExecutionResponse = {
  mode: 'execute',
  execution: {
    runId: 'run-fail-456',
    status: 'partial',
    tasksCompleted: 2,
    tasksFailed: 1,
    durationMs: 8000,
    artifacts: [],
  },
  analysis: {
    failedTasks: [
      {
        id: 'task-3',
        name: 'Deploy service',
        error: 'Timeout after 30s',
        category: 'timeout',
      },
    ],
    recommendations: ['Increase deploy timeout', 'Check network connectivity'],
  },
};

export const MOCK_TRACE_RESPONSE: QueryTraceResponse = {
  runId: 'run-abc-123',
  events: [
    {
      eventType: 'task.started',
      taskId: 'task-1',
      timestamp: '2026-02-13T12:00:00Z',
      agent: 'code_expert',
    },
    {
      eventType: 'model.called',
      model: 'claude-sonnet-4-5',
      tokensIn: 500,
      tokensOut: 200,
      durationMs: 1200,
    },
    {
      eventType: 'task.completed',
      taskId: 'task-1',
      timestamp: '2026-02-13T12:00:05Z',
      success: true,
    },
  ],
  totalEvents: 3,
  truncated: false,
  source: 'disk',
};

export const MOCK_TRACE_NOT_FOUND: QueryTraceResponse = {
  runId: 'nonexistent',
  events: [],
  totalEvents: 0,
  truncated: false,
  source: 'not_found',
};

export const MOCK_TRACE_FILTERED: QueryTraceResponse = {
  runId: 'run-abc-123',
  events: [
    {
      eventType: 'model.called',
      model: 'claude-sonnet-4-5',
      tokensIn: 500,
      tokensOut: 200,
      durationMs: 1200,
    },
  ],
  totalEvents: 1,
  truncated: false,
  source: 'disk',
};

export const MOCK_REGISTRY_IMPORT_RESPONSE: RegistryImportResponse = {
  dryRun: true,
  entry: {
    id: 'claude-test-model',
    displayName: 'Claude Test Model',
    provider: 'anthropic',
    contextWindow: 200000,
    outputModalities: ['text', 'code'],
    inputModalities: ['text', 'code'],
    toolCapabilities: ['function_calling'],
    specialFeatures: [],
    pricing: { inputPer1M: 0, outputPer1M: 0 },
    qualityScores: {
      reasoning: 5,
      codeGeneration: 5,
      speed: 5,
      cost: 5,
    },
    cliName: 'claude',
    cliModelName: 'claude-test-model',
  },
  persisted: false,
  warnings: [
    'Quality scores set to 5/10 (unvalidated) — needs human review.',
    'Pricing set to 0 — update from anthropic pricing page.',
  ],
};

export const MOCK_REGISTRY_OPENAI: RegistryImportResponse = {
  dryRun: true,
  entry: {
    id: 'gpt-5-test',
    displayName: 'GPT-5 Test',
    provider: 'openai',
    contextWindow: 128000,
    outputModalities: ['text', 'code'],
    inputModalities: ['text', 'code'],
    toolCapabilities: ['function_calling'],
    specialFeatures: [],
    pricing: { inputPer1M: 0, outputPer1M: 0 },
    qualityScores: {
      reasoning: 5,
      codeGeneration: 5,
      speed: 5,
      cost: 5,
    },
    cliName: 'codex',
    cliModelName: 'gpt-5-test',
  },
  persisted: false,
  warnings: ['Quality scores set to 5/10 (unvalidated) — needs human review.'],
};
