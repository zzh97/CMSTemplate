// 避免直接使用proxy会警告：类型“ComponentInternalInstance | null”上不存在属性“proxy”
import { ComponentInternalInstance, getCurrentInstance } from "vue"

export default function userCurrentInstance() {
    // 因为getCurrentInstance可能返回null，故用as做类型断言（as是ts中的关键字）
    const { appContext } = getCurrentInstance() as ComponentInternalInstance
    const proxy = appContext.config.globalProperties
    return {
        proxy
    }
}