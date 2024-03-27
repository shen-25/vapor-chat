import { createPinia } from "pinia";
/**
 * 创建store
 */
export const store = createPinia();

/**
 * 设置store
 * @param app
 */
export function setupStore(app) {
  app.use(store);
}
