declare global {
  interface IAbortSignal {
    signal: AbortSignal
  }
  type Dennis = any
  type GUID = string
  type GlobalContext = {
    abortController?: AbortController
  }
}

export {}
