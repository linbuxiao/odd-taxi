/**
 * 实现：
 * 1. 避免上下重复，缓存 5 次以内发送过的句子。
 * 
 * a. 那么缓存必须以 chat_id 为 key 。
 * b. 为了避免数据溢出，储存的所有内容将会保留 10 分钟，十分钟后再次访问 cache 时置空。
 *  - 那么每个 chat_id 都可以保留一个最后的更新时间。
 *  - 写入前，当前没有 chat_id ，则创建，并保留
 *  - 写入后，遍历所有的 chat_id ，超时则 delete 。
 */

// import dayjs from 'dayjs'

// class ResponseCache {
//   map = new Map<number, { date: number, set: string[] }>()

//   read(id: number) {
//     return this.map.has(id) ? this.map.get(id)! : null
//   }

//   write(id: number, date: number, msg: string) {
//     if(this.map.has(id)) {
//       const cache = this.map.get(id)!
//       cache.date = date
//       cache.set.push(msg)
//       while(cache.set.length > 5) {
//         cache.set.shift()
//       }
//     } else {
//       const cache = {
//         date,
//         set: [msg]
//       }
//       this.map.set(id, cache)
//     }

//     const now = dayjs().unix()
//     const willDeleteKey: number[] = []
//     this.map.forEach((value, key) => {
//       if( now - value.date > 300 ) willDeleteKey.push(key)
//     })
//     for(const key in willDeleteKey) {
//       this.map.delete(+key)
//     }
//   }
// }

// export const cache = new ResponseCache()

import NodeCache from 'node-cache'

export const cache = new NodeCache({
  stdTTL: 300
})