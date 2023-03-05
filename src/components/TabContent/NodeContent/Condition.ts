export declare interface ConditionOption {
    key: string,
    operator: string,
    value: any,
}

const operator_alias:{[key:string]:string} = {
    '=': 'eq',
    '!=': 'neq',
    '>=': 'egt',
    '>': 'gt',
    '<': 'lt',
    '<=': 'elt',
}

const handler:{[key:string]:Function}= {
    eq(data: any, value: any) {
        return data === value
    },
    neq(data: any, value: any) {
        return data !== value
    },
    egt(data: any, value: any) {
        return data >= value
    },
    gt(data: any, value: any) {
        return data > value
    },
    lt(data: any, value: any) {
        return data < value
    },
    elt(data: any, value: any) {
        return data <= value
    },
    include(data: any, value: any) {
        return value.indexOf(data) !== -1
    },
    not_include(data: any, value: any) {
        return value.indexOf(data) === -1
    },
}

export function handleCondition(data: {[key:string]:any},c_option?: ConditionOption){
    if (!c_option){
        return true
    }
    const option= Object.assign({},{
        operator: 'eq'
    },c_option)
    if (operator_alias[option.operator]){
        option.operator=operator_alias[option.operator]
    }
    const fn = handler[option.operator]
    return fn(data[option.key],option.value)
}