// TODO add Zod runtime validation
// TODO refactor to only include one map - without the additional array
export function LruCache(capacity: number) {
  // stores keys and their values
  const data: { [key: string]: any } = {};
  // stores keys in order of access
  const accessQueue: string[] = [];

  function __interface() {
    function put(key: string, value: any) {
      evictLastMaybe();
      data[key] = value;
      accessQueue.push(key);
    }

    function evictLastMaybe() {
      if (accessQueue.length === capacity) {
        delete data[accessQueue.shift()!];
      }
    }

    function get(key: string) {
      console.log({ data, accessQueue });
      if (data[key]) {
        const index = accessQueue.indexOf(key);
        accessQueue.push(accessQueue[index]);
        accessQueue.splice(index, 1);
        return data[key];
      } else {
        return null;
      }
    }

    function peek(dataStructure: "data" | "queue") {
      if (dataStructure === "data") return data;
      if (dataStructure === "queue") return accessQueue;
      return null;
    }

    function length() {
      if (accessQueue.length === Object.keys(data).length) {
        return accessQueue.length;
      } else {
        throw new Error(
          `Something went wrong. The accessQueue and data are of different size.`,
        );
      }
    }

    return {
      get,
      length,
      peek,
      put,
    };
  }

  return __interface();
}
