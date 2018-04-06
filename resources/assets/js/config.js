export const ApibaseURI = (process.env.NODE_ENV === 'production'
        ? 'https://api.godruoyi.com/'
        : 'http://api.godruoyi.test/')
