const storageFactory = artifacts.require("StorageFactory")

module.exports = function(deployer){
    deployer.deploy(storageFactory)
}