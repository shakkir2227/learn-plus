export const throttle = (fn: any, delay: number) => {
    let lastExecTime = 0

    return async function (...args: unknown[]) {
        const currentTime = new Date().getTime()
        if (currentTime - lastExecTime >= delay) {
            lastExecTime = currentTime
            return await fn(...args)
        }
    }
}