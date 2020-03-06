const libName = 'itimplements'

function makeKeyMap(obj) {
  const keyMap = new Map()

  if (typeof obj === 'function') {
    obj = obj.prototype
  }

  for (const key of Object.getOwnPropertyNames(obj)) {
    if (key === '__name') {
      continue
    }

    let descr = {
      key: key,
      kind: null,
      params: 0
    }

    if (obj[key] !== null) {
      const keyType = typeof obj[key]
      switch(keyType) {
        case 'string':
          descr.kind = obj[key]
          break;
        case 'function':
          descr.kind = keyType
          descr.params = obj[key].length || 0
          break;
        default:
          descr.kind = keyType
      }
    }

    keyMap.set(key, descr)
  }
  return keyMap
}

function checkInterfaces(target, interfaces) {
  let targetName = target['__name'] ? target['__name'] : target.constructor.name
  if (typeof target === 'function') {
    targetName = target.name
  }
  const targetKeys = makeKeyMap(target)

  for (const iface of interfaces) {
    const ifaceName = iface['__name'] ? iface['__name'] : iface.constructor.name
    const ifaceKeys = makeKeyMap(iface)

    for (const iKeyDescr of ifaceKeys.values()) {
      const tKeyDescr = targetKeys.get(iKeyDescr.key)
      if (!tKeyDescr) {
        throw new Error(`${libName}: "${targetName}" doesn't implement all members of it's interface: ${ifaceName}.${iKeyDescr.key}`)
      }

      if (tKeyDescr.kind !== iKeyDescr.kind) {
        throw new Error(`${libName}: "${targetName}.${tKeyDescr.key}" is of type "${tKeyDescr.kind}", "${ifaceName}.${iKeyDescr.key}" expects "${iKeyDescr.kind}"`)
      }
      if (tKeyDescr.params < iKeyDescr.params) {
        throw new Error(`${libName}: "${targetName}.${tKeyDescr.key}" has ${tKeyDescr.params} parameters, "${ifaceName}.${iKeyDescr.key}" expects ${iKeyDescr.params}`)
      }
    }

  }
}

module.exports = function(...interfaces) {
  interfaces.forEach(iface => {
    if (typeof iface !== 'object') {
      throw new TypeError(`${libName}: Implemented interfaces must be of type "object", "${typeof iface}" given`)
    }
  })

  return (target) => {
    if (['function', 'object'].includes(typeof target)) {
      checkInterfaces(target, interfaces)
    } else {
      throw new TypeError(`${libName}: Interface implementer must be of type "object", "${typeof target}" given`)
    }
  }
}
