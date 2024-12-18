export const requireEither = ([prop1, prop2], message) => {
  return function (val, ctx) {
    const field1 = this.parent[prop1]
    const field2 = this.parent[prop2]
    if (!field1 && !field2) return ctx.createError({ message })
    return true
  }
}
