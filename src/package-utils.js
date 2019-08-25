

module.exports = {

  resolvePackage: function() {
    return this.structuralElements.reduce((e) => {
      if(isPackage()) {
        return e + e.resolvePackage()
      }
    })
  }

}
