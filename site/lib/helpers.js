function sectionHelper(name, options) {
    if (!this.section)
        this.section = {}
    this.section[name] = options.fn(this)
    return null
}
exports.sectionHelper = sectionHelper;
