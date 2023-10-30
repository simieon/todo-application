export type CallBackFunction<T> = (arg: T) => void

export interface UseCase<T, TRes>{
  invoke: (value: T, callback: CallBackFunction<T> | undefined) => Promise<TRes>
}