([keys, ...tail]) => {
  return tail.map(values =>
    values.reduce((item, value, i) => {
      item[keys[i]] = value
      return item
    }, {})
  )
}
