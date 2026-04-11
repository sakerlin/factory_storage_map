
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model StorageRecord
 * 
 */
export type StorageRecord = $Result.DefaultSelection<Prisma.$StorageRecordPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more StorageRecords
 * const storageRecords = await prisma.storageRecord.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more StorageRecords
   * const storageRecords = await prisma.storageRecord.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.storageRecord`: Exposes CRUD operations for the **StorageRecord** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more StorageRecords
    * const storageRecords = await prisma.storageRecord.findMany()
    * ```
    */
  get storageRecord(): Prisma.StorageRecordDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.3
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    StorageRecord: 'StorageRecord'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "storageRecord"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      StorageRecord: {
        payload: Prisma.$StorageRecordPayload<ExtArgs>
        fields: Prisma.StorageRecordFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StorageRecordFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorageRecordPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StorageRecordFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorageRecordPayload>
          }
          findFirst: {
            args: Prisma.StorageRecordFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorageRecordPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StorageRecordFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorageRecordPayload>
          }
          findMany: {
            args: Prisma.StorageRecordFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorageRecordPayload>[]
          }
          create: {
            args: Prisma.StorageRecordCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorageRecordPayload>
          }
          createMany: {
            args: Prisma.StorageRecordCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StorageRecordCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorageRecordPayload>[]
          }
          delete: {
            args: Prisma.StorageRecordDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorageRecordPayload>
          }
          update: {
            args: Prisma.StorageRecordUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorageRecordPayload>
          }
          deleteMany: {
            args: Prisma.StorageRecordDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StorageRecordUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StorageRecordUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorageRecordPayload>[]
          }
          upsert: {
            args: Prisma.StorageRecordUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorageRecordPayload>
          }
          aggregate: {
            args: Prisma.StorageRecordAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStorageRecord>
          }
          groupBy: {
            args: Prisma.StorageRecordGroupByArgs<ExtArgs>
            result: $Utils.Optional<StorageRecordGroupByOutputType>[]
          }
          count: {
            args: Prisma.StorageRecordCountArgs<ExtArgs>
            result: $Utils.Optional<StorageRecordCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    storageRecord?: StorageRecordOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model StorageRecord
   */

  export type AggregateStorageRecord = {
    _count: StorageRecordCountAggregateOutputType | null
    _avg: StorageRecordAvgAggregateOutputType | null
    _sum: StorageRecordSumAggregateOutputType | null
    _min: StorageRecordMinAggregateOutputType | null
    _max: StorageRecordMaxAggregateOutputType | null
  }

  export type StorageRecordAvgAggregateOutputType = {
    id: number | null
    fgId: number | null
    storageNum: number | null
  }

  export type StorageRecordSumAggregateOutputType = {
    id: number | null
    fgId: number | null
    storageNum: number | null
  }

  export type StorageRecordMinAggregateOutputType = {
    id: number | null
    fgId: number | null
    pdnum: string | null
    pdName: string | null
    zone: string | null
    area: string | null
    subArea: string | null
    code: string | null
    storageType: string | null
    unit: string | null
    storageNum: number | null
    lastModify: string | null
    operator: string | null
    extype: string | null
    stockChange: string | null
    source: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StorageRecordMaxAggregateOutputType = {
    id: number | null
    fgId: number | null
    pdnum: string | null
    pdName: string | null
    zone: string | null
    area: string | null
    subArea: string | null
    code: string | null
    storageType: string | null
    unit: string | null
    storageNum: number | null
    lastModify: string | null
    operator: string | null
    extype: string | null
    stockChange: string | null
    source: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StorageRecordCountAggregateOutputType = {
    id: number
    fgId: number
    pdnum: number
    pdName: number
    zone: number
    area: number
    subArea: number
    code: number
    storageType: number
    unit: number
    storageNum: number
    lastModify: number
    operator: number
    extype: number
    stockChange: number
    source: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type StorageRecordAvgAggregateInputType = {
    id?: true
    fgId?: true
    storageNum?: true
  }

  export type StorageRecordSumAggregateInputType = {
    id?: true
    fgId?: true
    storageNum?: true
  }

  export type StorageRecordMinAggregateInputType = {
    id?: true
    fgId?: true
    pdnum?: true
    pdName?: true
    zone?: true
    area?: true
    subArea?: true
    code?: true
    storageType?: true
    unit?: true
    storageNum?: true
    lastModify?: true
    operator?: true
    extype?: true
    stockChange?: true
    source?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StorageRecordMaxAggregateInputType = {
    id?: true
    fgId?: true
    pdnum?: true
    pdName?: true
    zone?: true
    area?: true
    subArea?: true
    code?: true
    storageType?: true
    unit?: true
    storageNum?: true
    lastModify?: true
    operator?: true
    extype?: true
    stockChange?: true
    source?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StorageRecordCountAggregateInputType = {
    id?: true
    fgId?: true
    pdnum?: true
    pdName?: true
    zone?: true
    area?: true
    subArea?: true
    code?: true
    storageType?: true
    unit?: true
    storageNum?: true
    lastModify?: true
    operator?: true
    extype?: true
    stockChange?: true
    source?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type StorageRecordAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StorageRecord to aggregate.
     */
    where?: StorageRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StorageRecords to fetch.
     */
    orderBy?: StorageRecordOrderByWithRelationInput | StorageRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StorageRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StorageRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StorageRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned StorageRecords
    **/
    _count?: true | StorageRecordCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StorageRecordAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StorageRecordSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StorageRecordMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StorageRecordMaxAggregateInputType
  }

  export type GetStorageRecordAggregateType<T extends StorageRecordAggregateArgs> = {
        [P in keyof T & keyof AggregateStorageRecord]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStorageRecord[P]>
      : GetScalarType<T[P], AggregateStorageRecord[P]>
  }




  export type StorageRecordGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StorageRecordWhereInput
    orderBy?: StorageRecordOrderByWithAggregationInput | StorageRecordOrderByWithAggregationInput[]
    by: StorageRecordScalarFieldEnum[] | StorageRecordScalarFieldEnum
    having?: StorageRecordScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StorageRecordCountAggregateInputType | true
    _avg?: StorageRecordAvgAggregateInputType
    _sum?: StorageRecordSumAggregateInputType
    _min?: StorageRecordMinAggregateInputType
    _max?: StorageRecordMaxAggregateInputType
  }

  export type StorageRecordGroupByOutputType = {
    id: number
    fgId: number | null
    pdnum: string
    pdName: string
    zone: string
    area: string
    subArea: string
    code: string
    storageType: string | null
    unit: string | null
    storageNum: number
    lastModify: string | null
    operator: string | null
    extype: string | null
    stockChange: string | null
    source: string
    createdAt: Date
    updatedAt: Date
    _count: StorageRecordCountAggregateOutputType | null
    _avg: StorageRecordAvgAggregateOutputType | null
    _sum: StorageRecordSumAggregateOutputType | null
    _min: StorageRecordMinAggregateOutputType | null
    _max: StorageRecordMaxAggregateOutputType | null
  }

  type GetStorageRecordGroupByPayload<T extends StorageRecordGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StorageRecordGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StorageRecordGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StorageRecordGroupByOutputType[P]>
            : GetScalarType<T[P], StorageRecordGroupByOutputType[P]>
        }
      >
    >


  export type StorageRecordSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fgId?: boolean
    pdnum?: boolean
    pdName?: boolean
    zone?: boolean
    area?: boolean
    subArea?: boolean
    code?: boolean
    storageType?: boolean
    unit?: boolean
    storageNum?: boolean
    lastModify?: boolean
    operator?: boolean
    extype?: boolean
    stockChange?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["storageRecord"]>

  export type StorageRecordSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fgId?: boolean
    pdnum?: boolean
    pdName?: boolean
    zone?: boolean
    area?: boolean
    subArea?: boolean
    code?: boolean
    storageType?: boolean
    unit?: boolean
    storageNum?: boolean
    lastModify?: boolean
    operator?: boolean
    extype?: boolean
    stockChange?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["storageRecord"]>

  export type StorageRecordSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fgId?: boolean
    pdnum?: boolean
    pdName?: boolean
    zone?: boolean
    area?: boolean
    subArea?: boolean
    code?: boolean
    storageType?: boolean
    unit?: boolean
    storageNum?: boolean
    lastModify?: boolean
    operator?: boolean
    extype?: boolean
    stockChange?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["storageRecord"]>

  export type StorageRecordSelectScalar = {
    id?: boolean
    fgId?: boolean
    pdnum?: boolean
    pdName?: boolean
    zone?: boolean
    area?: boolean
    subArea?: boolean
    code?: boolean
    storageType?: boolean
    unit?: boolean
    storageNum?: boolean
    lastModify?: boolean
    operator?: boolean
    extype?: boolean
    stockChange?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type StorageRecordOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "fgId" | "pdnum" | "pdName" | "zone" | "area" | "subArea" | "code" | "storageType" | "unit" | "storageNum" | "lastModify" | "operator" | "extype" | "stockChange" | "source" | "createdAt" | "updatedAt", ExtArgs["result"]["storageRecord"]>

  export type $StorageRecordPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "StorageRecord"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      fgId: number | null
      pdnum: string
      pdName: string
      zone: string
      area: string
      subArea: string
      code: string
      storageType: string | null
      unit: string | null
      storageNum: number
      lastModify: string | null
      operator: string | null
      extype: string | null
      stockChange: string | null
      source: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["storageRecord"]>
    composites: {}
  }

  type StorageRecordGetPayload<S extends boolean | null | undefined | StorageRecordDefaultArgs> = $Result.GetResult<Prisma.$StorageRecordPayload, S>

  type StorageRecordCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StorageRecordFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StorageRecordCountAggregateInputType | true
    }

  export interface StorageRecordDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['StorageRecord'], meta: { name: 'StorageRecord' } }
    /**
     * Find zero or one StorageRecord that matches the filter.
     * @param {StorageRecordFindUniqueArgs} args - Arguments to find a StorageRecord
     * @example
     * // Get one StorageRecord
     * const storageRecord = await prisma.storageRecord.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StorageRecordFindUniqueArgs>(args: SelectSubset<T, StorageRecordFindUniqueArgs<ExtArgs>>): Prisma__StorageRecordClient<$Result.GetResult<Prisma.$StorageRecordPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one StorageRecord that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StorageRecordFindUniqueOrThrowArgs} args - Arguments to find a StorageRecord
     * @example
     * // Get one StorageRecord
     * const storageRecord = await prisma.storageRecord.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StorageRecordFindUniqueOrThrowArgs>(args: SelectSubset<T, StorageRecordFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StorageRecordClient<$Result.GetResult<Prisma.$StorageRecordPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StorageRecord that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StorageRecordFindFirstArgs} args - Arguments to find a StorageRecord
     * @example
     * // Get one StorageRecord
     * const storageRecord = await prisma.storageRecord.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StorageRecordFindFirstArgs>(args?: SelectSubset<T, StorageRecordFindFirstArgs<ExtArgs>>): Prisma__StorageRecordClient<$Result.GetResult<Prisma.$StorageRecordPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StorageRecord that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StorageRecordFindFirstOrThrowArgs} args - Arguments to find a StorageRecord
     * @example
     * // Get one StorageRecord
     * const storageRecord = await prisma.storageRecord.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StorageRecordFindFirstOrThrowArgs>(args?: SelectSubset<T, StorageRecordFindFirstOrThrowArgs<ExtArgs>>): Prisma__StorageRecordClient<$Result.GetResult<Prisma.$StorageRecordPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more StorageRecords that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StorageRecordFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all StorageRecords
     * const storageRecords = await prisma.storageRecord.findMany()
     * 
     * // Get first 10 StorageRecords
     * const storageRecords = await prisma.storageRecord.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const storageRecordWithIdOnly = await prisma.storageRecord.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StorageRecordFindManyArgs>(args?: SelectSubset<T, StorageRecordFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StorageRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a StorageRecord.
     * @param {StorageRecordCreateArgs} args - Arguments to create a StorageRecord.
     * @example
     * // Create one StorageRecord
     * const StorageRecord = await prisma.storageRecord.create({
     *   data: {
     *     // ... data to create a StorageRecord
     *   }
     * })
     * 
     */
    create<T extends StorageRecordCreateArgs>(args: SelectSubset<T, StorageRecordCreateArgs<ExtArgs>>): Prisma__StorageRecordClient<$Result.GetResult<Prisma.$StorageRecordPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many StorageRecords.
     * @param {StorageRecordCreateManyArgs} args - Arguments to create many StorageRecords.
     * @example
     * // Create many StorageRecords
     * const storageRecord = await prisma.storageRecord.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StorageRecordCreateManyArgs>(args?: SelectSubset<T, StorageRecordCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many StorageRecords and returns the data saved in the database.
     * @param {StorageRecordCreateManyAndReturnArgs} args - Arguments to create many StorageRecords.
     * @example
     * // Create many StorageRecords
     * const storageRecord = await prisma.storageRecord.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many StorageRecords and only return the `id`
     * const storageRecordWithIdOnly = await prisma.storageRecord.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StorageRecordCreateManyAndReturnArgs>(args?: SelectSubset<T, StorageRecordCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StorageRecordPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a StorageRecord.
     * @param {StorageRecordDeleteArgs} args - Arguments to delete one StorageRecord.
     * @example
     * // Delete one StorageRecord
     * const StorageRecord = await prisma.storageRecord.delete({
     *   where: {
     *     // ... filter to delete one StorageRecord
     *   }
     * })
     * 
     */
    delete<T extends StorageRecordDeleteArgs>(args: SelectSubset<T, StorageRecordDeleteArgs<ExtArgs>>): Prisma__StorageRecordClient<$Result.GetResult<Prisma.$StorageRecordPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one StorageRecord.
     * @param {StorageRecordUpdateArgs} args - Arguments to update one StorageRecord.
     * @example
     * // Update one StorageRecord
     * const storageRecord = await prisma.storageRecord.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StorageRecordUpdateArgs>(args: SelectSubset<T, StorageRecordUpdateArgs<ExtArgs>>): Prisma__StorageRecordClient<$Result.GetResult<Prisma.$StorageRecordPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more StorageRecords.
     * @param {StorageRecordDeleteManyArgs} args - Arguments to filter StorageRecords to delete.
     * @example
     * // Delete a few StorageRecords
     * const { count } = await prisma.storageRecord.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StorageRecordDeleteManyArgs>(args?: SelectSubset<T, StorageRecordDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StorageRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StorageRecordUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many StorageRecords
     * const storageRecord = await prisma.storageRecord.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StorageRecordUpdateManyArgs>(args: SelectSubset<T, StorageRecordUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StorageRecords and returns the data updated in the database.
     * @param {StorageRecordUpdateManyAndReturnArgs} args - Arguments to update many StorageRecords.
     * @example
     * // Update many StorageRecords
     * const storageRecord = await prisma.storageRecord.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more StorageRecords and only return the `id`
     * const storageRecordWithIdOnly = await prisma.storageRecord.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends StorageRecordUpdateManyAndReturnArgs>(args: SelectSubset<T, StorageRecordUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StorageRecordPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one StorageRecord.
     * @param {StorageRecordUpsertArgs} args - Arguments to update or create a StorageRecord.
     * @example
     * // Update or create a StorageRecord
     * const storageRecord = await prisma.storageRecord.upsert({
     *   create: {
     *     // ... data to create a StorageRecord
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the StorageRecord we want to update
     *   }
     * })
     */
    upsert<T extends StorageRecordUpsertArgs>(args: SelectSubset<T, StorageRecordUpsertArgs<ExtArgs>>): Prisma__StorageRecordClient<$Result.GetResult<Prisma.$StorageRecordPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of StorageRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StorageRecordCountArgs} args - Arguments to filter StorageRecords to count.
     * @example
     * // Count the number of StorageRecords
     * const count = await prisma.storageRecord.count({
     *   where: {
     *     // ... the filter for the StorageRecords we want to count
     *   }
     * })
    **/
    count<T extends StorageRecordCountArgs>(
      args?: Subset<T, StorageRecordCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StorageRecordCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a StorageRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StorageRecordAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StorageRecordAggregateArgs>(args: Subset<T, StorageRecordAggregateArgs>): Prisma.PrismaPromise<GetStorageRecordAggregateType<T>>

    /**
     * Group by StorageRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StorageRecordGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StorageRecordGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StorageRecordGroupByArgs['orderBy'] }
        : { orderBy?: StorageRecordGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StorageRecordGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStorageRecordGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the StorageRecord model
   */
  readonly fields: StorageRecordFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for StorageRecord.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StorageRecordClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the StorageRecord model
   */
  interface StorageRecordFieldRefs {
    readonly id: FieldRef<"StorageRecord", 'Int'>
    readonly fgId: FieldRef<"StorageRecord", 'Int'>
    readonly pdnum: FieldRef<"StorageRecord", 'String'>
    readonly pdName: FieldRef<"StorageRecord", 'String'>
    readonly zone: FieldRef<"StorageRecord", 'String'>
    readonly area: FieldRef<"StorageRecord", 'String'>
    readonly subArea: FieldRef<"StorageRecord", 'String'>
    readonly code: FieldRef<"StorageRecord", 'String'>
    readonly storageType: FieldRef<"StorageRecord", 'String'>
    readonly unit: FieldRef<"StorageRecord", 'String'>
    readonly storageNum: FieldRef<"StorageRecord", 'Float'>
    readonly lastModify: FieldRef<"StorageRecord", 'String'>
    readonly operator: FieldRef<"StorageRecord", 'String'>
    readonly extype: FieldRef<"StorageRecord", 'String'>
    readonly stockChange: FieldRef<"StorageRecord", 'String'>
    readonly source: FieldRef<"StorageRecord", 'String'>
    readonly createdAt: FieldRef<"StorageRecord", 'DateTime'>
    readonly updatedAt: FieldRef<"StorageRecord", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * StorageRecord findUnique
   */
  export type StorageRecordFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StorageRecord
     */
    select?: StorageRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StorageRecord
     */
    omit?: StorageRecordOmit<ExtArgs> | null
    /**
     * Filter, which StorageRecord to fetch.
     */
    where: StorageRecordWhereUniqueInput
  }

  /**
   * StorageRecord findUniqueOrThrow
   */
  export type StorageRecordFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StorageRecord
     */
    select?: StorageRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StorageRecord
     */
    omit?: StorageRecordOmit<ExtArgs> | null
    /**
     * Filter, which StorageRecord to fetch.
     */
    where: StorageRecordWhereUniqueInput
  }

  /**
   * StorageRecord findFirst
   */
  export type StorageRecordFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StorageRecord
     */
    select?: StorageRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StorageRecord
     */
    omit?: StorageRecordOmit<ExtArgs> | null
    /**
     * Filter, which StorageRecord to fetch.
     */
    where?: StorageRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StorageRecords to fetch.
     */
    orderBy?: StorageRecordOrderByWithRelationInput | StorageRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StorageRecords.
     */
    cursor?: StorageRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StorageRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StorageRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StorageRecords.
     */
    distinct?: StorageRecordScalarFieldEnum | StorageRecordScalarFieldEnum[]
  }

  /**
   * StorageRecord findFirstOrThrow
   */
  export type StorageRecordFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StorageRecord
     */
    select?: StorageRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StorageRecord
     */
    omit?: StorageRecordOmit<ExtArgs> | null
    /**
     * Filter, which StorageRecord to fetch.
     */
    where?: StorageRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StorageRecords to fetch.
     */
    orderBy?: StorageRecordOrderByWithRelationInput | StorageRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StorageRecords.
     */
    cursor?: StorageRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StorageRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StorageRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StorageRecords.
     */
    distinct?: StorageRecordScalarFieldEnum | StorageRecordScalarFieldEnum[]
  }

  /**
   * StorageRecord findMany
   */
  export type StorageRecordFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StorageRecord
     */
    select?: StorageRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StorageRecord
     */
    omit?: StorageRecordOmit<ExtArgs> | null
    /**
     * Filter, which StorageRecords to fetch.
     */
    where?: StorageRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StorageRecords to fetch.
     */
    orderBy?: StorageRecordOrderByWithRelationInput | StorageRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing StorageRecords.
     */
    cursor?: StorageRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StorageRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StorageRecords.
     */
    skip?: number
    distinct?: StorageRecordScalarFieldEnum | StorageRecordScalarFieldEnum[]
  }

  /**
   * StorageRecord create
   */
  export type StorageRecordCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StorageRecord
     */
    select?: StorageRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StorageRecord
     */
    omit?: StorageRecordOmit<ExtArgs> | null
    /**
     * The data needed to create a StorageRecord.
     */
    data: XOR<StorageRecordCreateInput, StorageRecordUncheckedCreateInput>
  }

  /**
   * StorageRecord createMany
   */
  export type StorageRecordCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many StorageRecords.
     */
    data: StorageRecordCreateManyInput | StorageRecordCreateManyInput[]
  }

  /**
   * StorageRecord createManyAndReturn
   */
  export type StorageRecordCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StorageRecord
     */
    select?: StorageRecordSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StorageRecord
     */
    omit?: StorageRecordOmit<ExtArgs> | null
    /**
     * The data used to create many StorageRecords.
     */
    data: StorageRecordCreateManyInput | StorageRecordCreateManyInput[]
  }

  /**
   * StorageRecord update
   */
  export type StorageRecordUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StorageRecord
     */
    select?: StorageRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StorageRecord
     */
    omit?: StorageRecordOmit<ExtArgs> | null
    /**
     * The data needed to update a StorageRecord.
     */
    data: XOR<StorageRecordUpdateInput, StorageRecordUncheckedUpdateInput>
    /**
     * Choose, which StorageRecord to update.
     */
    where: StorageRecordWhereUniqueInput
  }

  /**
   * StorageRecord updateMany
   */
  export type StorageRecordUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update StorageRecords.
     */
    data: XOR<StorageRecordUpdateManyMutationInput, StorageRecordUncheckedUpdateManyInput>
    /**
     * Filter which StorageRecords to update
     */
    where?: StorageRecordWhereInput
    /**
     * Limit how many StorageRecords to update.
     */
    limit?: number
  }

  /**
   * StorageRecord updateManyAndReturn
   */
  export type StorageRecordUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StorageRecord
     */
    select?: StorageRecordSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StorageRecord
     */
    omit?: StorageRecordOmit<ExtArgs> | null
    /**
     * The data used to update StorageRecords.
     */
    data: XOR<StorageRecordUpdateManyMutationInput, StorageRecordUncheckedUpdateManyInput>
    /**
     * Filter which StorageRecords to update
     */
    where?: StorageRecordWhereInput
    /**
     * Limit how many StorageRecords to update.
     */
    limit?: number
  }

  /**
   * StorageRecord upsert
   */
  export type StorageRecordUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StorageRecord
     */
    select?: StorageRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StorageRecord
     */
    omit?: StorageRecordOmit<ExtArgs> | null
    /**
     * The filter to search for the StorageRecord to update in case it exists.
     */
    where: StorageRecordWhereUniqueInput
    /**
     * In case the StorageRecord found by the `where` argument doesn't exist, create a new StorageRecord with this data.
     */
    create: XOR<StorageRecordCreateInput, StorageRecordUncheckedCreateInput>
    /**
     * In case the StorageRecord was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StorageRecordUpdateInput, StorageRecordUncheckedUpdateInput>
  }

  /**
   * StorageRecord delete
   */
  export type StorageRecordDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StorageRecord
     */
    select?: StorageRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StorageRecord
     */
    omit?: StorageRecordOmit<ExtArgs> | null
    /**
     * Filter which StorageRecord to delete.
     */
    where: StorageRecordWhereUniqueInput
  }

  /**
   * StorageRecord deleteMany
   */
  export type StorageRecordDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StorageRecords to delete
     */
    where?: StorageRecordWhereInput
    /**
     * Limit how many StorageRecords to delete.
     */
    limit?: number
  }

  /**
   * StorageRecord without action
   */
  export type StorageRecordDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StorageRecord
     */
    select?: StorageRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StorageRecord
     */
    omit?: StorageRecordOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const StorageRecordScalarFieldEnum: {
    id: 'id',
    fgId: 'fgId',
    pdnum: 'pdnum',
    pdName: 'pdName',
    zone: 'zone',
    area: 'area',
    subArea: 'subArea',
    code: 'code',
    storageType: 'storageType',
    unit: 'unit',
    storageNum: 'storageNum',
    lastModify: 'lastModify',
    operator: 'operator',
    extype: 'extype',
    stockChange: 'stockChange',
    source: 'source',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type StorageRecordScalarFieldEnum = (typeof StorageRecordScalarFieldEnum)[keyof typeof StorageRecordScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    
  /**
   * Deep Input Types
   */


  export type StorageRecordWhereInput = {
    AND?: StorageRecordWhereInput | StorageRecordWhereInput[]
    OR?: StorageRecordWhereInput[]
    NOT?: StorageRecordWhereInput | StorageRecordWhereInput[]
    id?: IntFilter<"StorageRecord"> | number
    fgId?: IntNullableFilter<"StorageRecord"> | number | null
    pdnum?: StringFilter<"StorageRecord"> | string
    pdName?: StringFilter<"StorageRecord"> | string
    zone?: StringFilter<"StorageRecord"> | string
    area?: StringFilter<"StorageRecord"> | string
    subArea?: StringFilter<"StorageRecord"> | string
    code?: StringFilter<"StorageRecord"> | string
    storageType?: StringNullableFilter<"StorageRecord"> | string | null
    unit?: StringNullableFilter<"StorageRecord"> | string | null
    storageNum?: FloatFilter<"StorageRecord"> | number
    lastModify?: StringNullableFilter<"StorageRecord"> | string | null
    operator?: StringNullableFilter<"StorageRecord"> | string | null
    extype?: StringNullableFilter<"StorageRecord"> | string | null
    stockChange?: StringNullableFilter<"StorageRecord"> | string | null
    source?: StringFilter<"StorageRecord"> | string
    createdAt?: DateTimeFilter<"StorageRecord"> | Date | string
    updatedAt?: DateTimeFilter<"StorageRecord"> | Date | string
  }

  export type StorageRecordOrderByWithRelationInput = {
    id?: SortOrder
    fgId?: SortOrderInput | SortOrder
    pdnum?: SortOrder
    pdName?: SortOrder
    zone?: SortOrder
    area?: SortOrder
    subArea?: SortOrder
    code?: SortOrder
    storageType?: SortOrderInput | SortOrder
    unit?: SortOrderInput | SortOrder
    storageNum?: SortOrder
    lastModify?: SortOrderInput | SortOrder
    operator?: SortOrderInput | SortOrder
    extype?: SortOrderInput | SortOrder
    stockChange?: SortOrderInput | SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StorageRecordWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    subArea_pdnum_code?: StorageRecordSubAreaPdnumCodeCompoundUniqueInput
    AND?: StorageRecordWhereInput | StorageRecordWhereInput[]
    OR?: StorageRecordWhereInput[]
    NOT?: StorageRecordWhereInput | StorageRecordWhereInput[]
    fgId?: IntNullableFilter<"StorageRecord"> | number | null
    pdnum?: StringFilter<"StorageRecord"> | string
    pdName?: StringFilter<"StorageRecord"> | string
    zone?: StringFilter<"StorageRecord"> | string
    area?: StringFilter<"StorageRecord"> | string
    subArea?: StringFilter<"StorageRecord"> | string
    code?: StringFilter<"StorageRecord"> | string
    storageType?: StringNullableFilter<"StorageRecord"> | string | null
    unit?: StringNullableFilter<"StorageRecord"> | string | null
    storageNum?: FloatFilter<"StorageRecord"> | number
    lastModify?: StringNullableFilter<"StorageRecord"> | string | null
    operator?: StringNullableFilter<"StorageRecord"> | string | null
    extype?: StringNullableFilter<"StorageRecord"> | string | null
    stockChange?: StringNullableFilter<"StorageRecord"> | string | null
    source?: StringFilter<"StorageRecord"> | string
    createdAt?: DateTimeFilter<"StorageRecord"> | Date | string
    updatedAt?: DateTimeFilter<"StorageRecord"> | Date | string
  }, "id" | "subArea_pdnum_code">

  export type StorageRecordOrderByWithAggregationInput = {
    id?: SortOrder
    fgId?: SortOrderInput | SortOrder
    pdnum?: SortOrder
    pdName?: SortOrder
    zone?: SortOrder
    area?: SortOrder
    subArea?: SortOrder
    code?: SortOrder
    storageType?: SortOrderInput | SortOrder
    unit?: SortOrderInput | SortOrder
    storageNum?: SortOrder
    lastModify?: SortOrderInput | SortOrder
    operator?: SortOrderInput | SortOrder
    extype?: SortOrderInput | SortOrder
    stockChange?: SortOrderInput | SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: StorageRecordCountOrderByAggregateInput
    _avg?: StorageRecordAvgOrderByAggregateInput
    _max?: StorageRecordMaxOrderByAggregateInput
    _min?: StorageRecordMinOrderByAggregateInput
    _sum?: StorageRecordSumOrderByAggregateInput
  }

  export type StorageRecordScalarWhereWithAggregatesInput = {
    AND?: StorageRecordScalarWhereWithAggregatesInput | StorageRecordScalarWhereWithAggregatesInput[]
    OR?: StorageRecordScalarWhereWithAggregatesInput[]
    NOT?: StorageRecordScalarWhereWithAggregatesInput | StorageRecordScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"StorageRecord"> | number
    fgId?: IntNullableWithAggregatesFilter<"StorageRecord"> | number | null
    pdnum?: StringWithAggregatesFilter<"StorageRecord"> | string
    pdName?: StringWithAggregatesFilter<"StorageRecord"> | string
    zone?: StringWithAggregatesFilter<"StorageRecord"> | string
    area?: StringWithAggregatesFilter<"StorageRecord"> | string
    subArea?: StringWithAggregatesFilter<"StorageRecord"> | string
    code?: StringWithAggregatesFilter<"StorageRecord"> | string
    storageType?: StringNullableWithAggregatesFilter<"StorageRecord"> | string | null
    unit?: StringNullableWithAggregatesFilter<"StorageRecord"> | string | null
    storageNum?: FloatWithAggregatesFilter<"StorageRecord"> | number
    lastModify?: StringNullableWithAggregatesFilter<"StorageRecord"> | string | null
    operator?: StringNullableWithAggregatesFilter<"StorageRecord"> | string | null
    extype?: StringNullableWithAggregatesFilter<"StorageRecord"> | string | null
    stockChange?: StringNullableWithAggregatesFilter<"StorageRecord"> | string | null
    source?: StringWithAggregatesFilter<"StorageRecord"> | string
    createdAt?: DateTimeWithAggregatesFilter<"StorageRecord"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"StorageRecord"> | Date | string
  }

  export type StorageRecordCreateInput = {
    fgId?: number | null
    pdnum: string
    pdName: string
    zone: string
    area: string
    subArea: string
    code?: string
    storageType?: string | null
    unit?: string | null
    storageNum?: number
    lastModify?: string | null
    operator?: string | null
    extype?: string | null
    stockChange?: string | null
    source?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StorageRecordUncheckedCreateInput = {
    id?: number
    fgId?: number | null
    pdnum: string
    pdName: string
    zone: string
    area: string
    subArea: string
    code?: string
    storageType?: string | null
    unit?: string | null
    storageNum?: number
    lastModify?: string | null
    operator?: string | null
    extype?: string | null
    stockChange?: string | null
    source?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StorageRecordUpdateInput = {
    fgId?: NullableIntFieldUpdateOperationsInput | number | null
    pdnum?: StringFieldUpdateOperationsInput | string
    pdName?: StringFieldUpdateOperationsInput | string
    zone?: StringFieldUpdateOperationsInput | string
    area?: StringFieldUpdateOperationsInput | string
    subArea?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    storageType?: NullableStringFieldUpdateOperationsInput | string | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    storageNum?: FloatFieldUpdateOperationsInput | number
    lastModify?: NullableStringFieldUpdateOperationsInput | string | null
    operator?: NullableStringFieldUpdateOperationsInput | string | null
    extype?: NullableStringFieldUpdateOperationsInput | string | null
    stockChange?: NullableStringFieldUpdateOperationsInput | string | null
    source?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StorageRecordUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    fgId?: NullableIntFieldUpdateOperationsInput | number | null
    pdnum?: StringFieldUpdateOperationsInput | string
    pdName?: StringFieldUpdateOperationsInput | string
    zone?: StringFieldUpdateOperationsInput | string
    area?: StringFieldUpdateOperationsInput | string
    subArea?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    storageType?: NullableStringFieldUpdateOperationsInput | string | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    storageNum?: FloatFieldUpdateOperationsInput | number
    lastModify?: NullableStringFieldUpdateOperationsInput | string | null
    operator?: NullableStringFieldUpdateOperationsInput | string | null
    extype?: NullableStringFieldUpdateOperationsInput | string | null
    stockChange?: NullableStringFieldUpdateOperationsInput | string | null
    source?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StorageRecordCreateManyInput = {
    id?: number
    fgId?: number | null
    pdnum: string
    pdName: string
    zone: string
    area: string
    subArea: string
    code?: string
    storageType?: string | null
    unit?: string | null
    storageNum?: number
    lastModify?: string | null
    operator?: string | null
    extype?: string | null
    stockChange?: string | null
    source?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StorageRecordUpdateManyMutationInput = {
    fgId?: NullableIntFieldUpdateOperationsInput | number | null
    pdnum?: StringFieldUpdateOperationsInput | string
    pdName?: StringFieldUpdateOperationsInput | string
    zone?: StringFieldUpdateOperationsInput | string
    area?: StringFieldUpdateOperationsInput | string
    subArea?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    storageType?: NullableStringFieldUpdateOperationsInput | string | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    storageNum?: FloatFieldUpdateOperationsInput | number
    lastModify?: NullableStringFieldUpdateOperationsInput | string | null
    operator?: NullableStringFieldUpdateOperationsInput | string | null
    extype?: NullableStringFieldUpdateOperationsInput | string | null
    stockChange?: NullableStringFieldUpdateOperationsInput | string | null
    source?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StorageRecordUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    fgId?: NullableIntFieldUpdateOperationsInput | number | null
    pdnum?: StringFieldUpdateOperationsInput | string
    pdName?: StringFieldUpdateOperationsInput | string
    zone?: StringFieldUpdateOperationsInput | string
    area?: StringFieldUpdateOperationsInput | string
    subArea?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    storageType?: NullableStringFieldUpdateOperationsInput | string | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    storageNum?: FloatFieldUpdateOperationsInput | number
    lastModify?: NullableStringFieldUpdateOperationsInput | string | null
    operator?: NullableStringFieldUpdateOperationsInput | string | null
    extype?: NullableStringFieldUpdateOperationsInput | string | null
    stockChange?: NullableStringFieldUpdateOperationsInput | string | null
    source?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type StorageRecordSubAreaPdnumCodeCompoundUniqueInput = {
    subArea: string
    pdnum: string
    code: string
  }

  export type StorageRecordCountOrderByAggregateInput = {
    id?: SortOrder
    fgId?: SortOrder
    pdnum?: SortOrder
    pdName?: SortOrder
    zone?: SortOrder
    area?: SortOrder
    subArea?: SortOrder
    code?: SortOrder
    storageType?: SortOrder
    unit?: SortOrder
    storageNum?: SortOrder
    lastModify?: SortOrder
    operator?: SortOrder
    extype?: SortOrder
    stockChange?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StorageRecordAvgOrderByAggregateInput = {
    id?: SortOrder
    fgId?: SortOrder
    storageNum?: SortOrder
  }

  export type StorageRecordMaxOrderByAggregateInput = {
    id?: SortOrder
    fgId?: SortOrder
    pdnum?: SortOrder
    pdName?: SortOrder
    zone?: SortOrder
    area?: SortOrder
    subArea?: SortOrder
    code?: SortOrder
    storageType?: SortOrder
    unit?: SortOrder
    storageNum?: SortOrder
    lastModify?: SortOrder
    operator?: SortOrder
    extype?: SortOrder
    stockChange?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StorageRecordMinOrderByAggregateInput = {
    id?: SortOrder
    fgId?: SortOrder
    pdnum?: SortOrder
    pdName?: SortOrder
    zone?: SortOrder
    area?: SortOrder
    subArea?: SortOrder
    code?: SortOrder
    storageType?: SortOrder
    unit?: SortOrder
    storageNum?: SortOrder
    lastModify?: SortOrder
    operator?: SortOrder
    extype?: SortOrder
    stockChange?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StorageRecordSumOrderByAggregateInput = {
    id?: SortOrder
    fgId?: SortOrder
    storageNum?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}