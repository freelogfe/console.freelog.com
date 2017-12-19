export const CONTRACT_STATUS = {
    uncreated: -1,
    initial: 1,
    running: 2,
    activated: 3,
    userTerminated: 4,
    sysTerminated: 5,
    terminated: 6
};


export const CONTRACT_STATUS_TIPS = {
    '-1': '未创建合同',
    1: '未开始执行',
    2: '执行中',
    3: '生效中',
    4: '用户终止',
    5: '系统终止',
    6: '合同已终止'
}