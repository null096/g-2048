class Tools {
  static getObjectProp(obj, ...props) {
    if (!props.length) return obj;
    let prop = obj[props[0]];
    for (let i = 1; i < props.length; i++) {
      if (prop instanceof Object) prop = prop[props[i]];
      else return undefined;
    }

    return prop;
  }
}

export default Tools;