//加载静态文件资源
export const getAssetsFile = (url: string) => {
  return new URL(`../../assets/mainIcon/${url}`, import.meta.url).href
}
