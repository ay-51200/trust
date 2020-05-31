let mysql = require('mysql');
var connection = require('../config');
var constant = require('../constant');

module.exports.login = function(req,res){   
    var username = req.body.user_name;
    var password = req.body.password;

    if(username == "admin@gmail.com"){
        if(password == '123456'){
            var token = Math.floor((Math.random() * 1000000) + 1);
            console.log(token);
            res.json({
                status:0,
                token : "1234567",//token,
                message:"Successfully login."
            }); 
        } else {
            res.json({
                status:0,
                message:constant.PASSWORD_NOT_MATCH
            }); 
        }
    } else {
        res.json({
            status:0,
            message:constant.USER_NOT_EXIST
        }); 
    }
}

module.exports.internal_list = function(req,res){
    var watchListName = req.query.watchListName;
    var listType = req.query.listType;
    var ref_key = req.headers.ref_key;

    var sql = "select * from internal_list_def where DELETE_FLG = 'N'";
    if((watchListName != undefined) && (listType != undefined)){
        sql += " and WATCHLIST_NAME like '%"+ watchListName +"%' and LIST_TYPE like '%"+ listType+"%'";
    } else if(watchListName != undefined){
        sql += " and WATCHLIST_NAME like '%"+ watchListName +"%'";
    } else if(listType != undefined){
        sql += " and LIST_TYPE like '%"+ listType+"%'";
    }else if(ref_key != undefined){
        sql += " and REF_KEY ="+ref_key;
    }
    connection.query(sql, function (err, result, fields) {
        if((result.length > 0) || (result.length != undefined)){

            res.json({
                status : 1,
                length:result.length,
                result : result,
                message : "Successfully get details."
            });
            return true;
        } else {
            res.json({
                status : 0,
                message: "List details not found."
            });
            return true;
        }
    });
}

module.exports.internal_watchlist = function(req,res){
    var customer_type = req.query.customer_type;
    var customer_name = req.query.customer_name;
    var serial_no = req.headers.serial_no;
    var customer_acc = req.query.customer_acc;
    var natinality = req.query.natinality;
    var id_no = req.query.id_no;
    var watchlist_name = req.query.watchlist_name;

    var sql = "select * from internal_watch_list where DELETE_FLG = 'N' ";
    
    if((customer_name != undefined) && (customer_name != "")){
        sql += " and CUSTOMER_NAME_ENGLISH like '%"+ customer_name +"%'";
    } 
    if((customer_acc != undefined) && (customer_acc != "")){
        sql += " and CUSTOMER_ACCOUNT like '%"+ customer_acc +"%'";
    } 
    if((customer_type != undefined) && (customer_type != "")){
        sql += " and CUSTOMER_TYPE like '%"+ customer_type+"%'";
    }
    if((natinality != undefined) && (natinality != "")){
        sql += " and NATIONALITY like '%"+ natinality +"%'";
    }
    if((id_no != undefined) && (id_no != "")){
        sql += " and ID_NUMBER like '%"+ id_no +"%'";
    }
    if((watchlist_name != undefined) && (watchlist_name != "")){
        sql += " and WATCHLIST_NAME like '%"+ watchlist_name +"%'";
    }
    if((serial_no != undefined) && (serial_no != "")){
        sql += " and UID_SERIAL_NO ="+serial_no;
    }
    // console.log(sql)
    connection.query(sql, function (err, result, fields) {
        if((result.length > 0) || (result.length != undefined)){

            res.json({
                status : 1,
                length:result.length,
                result : result,
                message : "Successfully get details."
            });
            return true;
        } else {
            res.json({
                status : 0,
                message: "List details not found."
            });
            return true;
        }
    });
}

module.exports.blocklist_bic = function(req,res){

    var sql = "select * from blacklisted_bic where DELETE_FLG = 'N' order by REF_KEY asc";
    connection.query(sql, function (err, result, fields) {
        if((result.length > 0) || (result.length != undefined)){

            res.json({
                status : 1,
                length:result.length,
                result : result,
                message : "Successfully get details."
            });
            return true;
        } else {
            res.json({
                status : 0,
                message: "List details not found."
            });
            return true;
        }
    });
}

module.exports.neutral_words = function(req,res){

    var sql = "select * from neutral_words where DELETE_FLG = 'N' order by REF_KEY asc";
    console.log(sql)
    connection.query(sql, function (err, result, fields) {
        if((result.length > 0) || (result.length != undefined)){

            res.json({
                status : 1,
                length:result.length,
                result : result,
                message : "Successfully get details."
            });
            return true;
        } else {
            res.json({
                status : 0,
                message: "List details not found."
            });
            return true;
        }
    });
}

module.exports.sanctioned_cities = function(req,res){

    var sql = "select * from sanctioned_cities where DELETE_FLG = 'N' order by REF_KEY asc";
    connection.query(sql, function (err, result, fields) {
        if((result.length > 0) || (result.length != undefined)){

            res.json({
                status : 1,
                length:result.length,
                result : result,
                message : "Successfully get details."
            });
            return true;
        } else {
            res.json({
                status : 0,
                message: "List details not found."
            });
            return true;
        }
    });
}

module.exports.zone_x_global_keywords = function(req,res){

    var sql = "select * from zone_x_global_wl_keywords where DELETE_FLG = 'N' order by REF_KEY asc";
    connection.query(sql, function (err, result, fields) {
        if((result.length > 0) || (result.length != undefined)){

            res.json({
                status : 1,
                length:result.length,
                result : result,
                message : "Successfully get details."
            });
            return true;
        } else {
            res.json({
                status : 0,
                message: "List details not found."
            });
            return true;
        }
    });
}

module.exports.high_risk_countries = function(req,res){

    var sql = "select * from high_risk_countries where DELETE_FLG = 'N' order by REF_KEY asc";
    connection.query(sql, function (err, result, fields) {
        if((result.length > 0) || (result.length != undefined)){

            res.json({
                status : 1,
                length:result.length,
                result : result,
                message : "Successfully get details."
            });
            return true;
        } else {
            res.json({
                status : 0,
                message: "List details not found."
            });
            return true;
        }
    });
}

