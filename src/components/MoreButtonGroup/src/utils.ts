export function guid(length: number) {
  let guid = ''
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (let i = 0; i < length; i++) {
    guid += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return guid
}


export function debounce(fn: () => any, wait: number) {
  let timer: number
  return (...args: any[]) => {
    clearTimeout(timer)
    timer =  window.setTimeout(() => {
      // @ts-expect-error
      return fn(...args)
    }, wait)
  }
}