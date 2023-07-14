let config_data = null
module.exports = function() {
// if the static data was already set. return it
if(config_data != null && config_data != undefined) {
        return config_data
}
    
config_data = {}

//LOAD FROM ENV VARIABLES
config_data.connection_string = process.env.connection_string 
config_data.port = process.env.port || config_data.port
return config_data;
}
