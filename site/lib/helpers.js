function sectionHelper(name, options) {
    if (!this._sections)
        this._sections = {}
    this._sections[name] = options.fn(this)
    return null
}
exports.sectionHelper = sectionHelper;
