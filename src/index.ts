/**
 * spec-factory — AI software factory pipeline E2E tester
 *
 * Exercises: execute_spec, query_trace, registry_import
 */

export type { ToolCaller } from './factory-pipeline.js';
export {
  executeSpec,
  queryTrace,
  importModel,
  runFactoryPipeline,
  buildTestSpec,
} from './factory-pipeline.js';
export type {
  FactoryConfig,
  FactoryResult,
  ExecuteSpecInput,
  SpecResponse,
  DryRunResponse,
  ExecutionResponse,
  QueryTraceInput,
  QueryTraceResponse,
  RegistryImportInput,
  RegistryImportResponse,
  ModelEntry,
} from './types.js';
export {
  ExecuteSpecInputSchema,
  SpecResponseSchema,
  DryRunResponseSchema,
  ExecutionResponseSchema,
  QueryTraceInputSchema,
  QueryTraceResponseSchema,
  RegistryImportInputSchema,
  RegistryImportResponseSchema,
  ModelEntrySchema,
  QualityScoresSchema,
} from './types.js';
