let mysql = require('mysql');
var connection = require('../config');
var constant = require('../constant');
const {Validator} = require('node-input-validator');

module.exports.del_highRiskCountry = function(req,res){  
    var ref_key = req.params.ref_key;
    const v = new Validator(req.params, {
        ref_key: 'required'
    });
     
    v.check().then((matched) => {
        if (!matched) {
            res.json({
                status : 0,
                message : v.errors,
            });
            return;
        }
    });

    var sql = "select * from high_risk_countries where REF_KEY = "+ref_key;
    connection.query(sql, function(err,result,field){
        if((result.length > 0) || (result.length != undefined)){
            var delSql = "update high_risk_countries set DELETE_FLG = 'Y' where REF_KEY = "+result[0].REF_KEY;
            connection.query(delSql, function(err,result,field){
                console.log(result);
                if((result.affectedRows > 0) || (result.affectedRows != undefined)){
                    res.json({
                        status : 1,
                        // result : result,
                        message : "Successfully delete details."
                    });
                    return true;
                } else {
                    res.json({
                        status : 0,
                        message : "Error found."
                    });
                    return true;
                }
            });
        } else {
            res.json({
                status : 0,
                message: "Error found."
            });
            return true;
        }
    });
}

module.exports.del_internal_watchlist = function(req,res){  
    var uid_serial_no = req.params.ref_key;
    
    const v = new Validator(req.params, {
        ref_key: 'required'
    });
     
    v.check().then((matched) => {
        if (!matched) {
            res.json({
                status : 0,
                message : v.errors,
            });
            return;
        }
    });

    var sql = "select * from internal_watch_list where UID_SERIAL_NO = "+uid_serial_no;
    connection.query(sql, function(err,result,field){
        if((result.length > 0) || (result.length != undefined)){
            var delSql = "update internal_watch_list set DELETE_FLG = 'Y' where UID_SERIAL_NO = "+result[0].UID_SERIAL_NO;
            connection.query(delSql, function(err,result,field){
                if((result.affectedRows > 0) || (result.affectedRows != undefined)){
                    res.json({
                        status : 1,
                        // result : result,
                        message : "Successfully delete details."
                    });
                    return true;
                } else {
                    res.json({
                        status : 0,
                        message : "Error found."
                    });
                    return true;
                }
            });
        } else {
            res.json({
                status : 0,
                message: "Error found."
            });
            return true;
        }
    });
}

module.exports.del_internal_list = function(req,res){  
    var ref_key = req.params.ref_key;
    
    const v = new Validator(req.params, {
        ref_key: 'required'
    });
     
    v.check().then((matched) => {
        if (!matched) {
            res.json({
                status : 0,
                message : v.errors,
            });
            return;
        }
    });

    var sql = "select * from internal_list_def where REF_KEY = "+ref_key;
    connection.query(sql, function(err,result,field){
        if((result.length > 0) || (result.length != undefined)){
            var delSql = "update internal_list_def set DELETE_FLG = 'Y' where REF_KEY = "+result[0].REF_KEY;
            connection.query(delSql, function(err,result,field){
                if((result.affectedRows > 0) || (result.affectedRows != undefined)){
                    res.json({
                        status : 1,
                        // result : result,
                        message : "Successfully delete details."
                    });
                    return true;
                } else {
                    res.json({
                        status : 0,
                        message : "Error found."
                    });
                    return true;
                }
            });
        } else {
            res.json({
                status : 0,
                message: "Error found."
            });
            return true;
        }
    });
}

module.exports.del_blacklisted_bic = function(req,res){  
    var ref_key = req.params.ref_key;
    
    const v = new Validator(req.params, {
        ref_key: 'required'
    });
     
    v.check().then((matched) => {
        if (!matched) {
            res.json({
                status : 0,
                message : v.errors,
            });
            return;
        }
    });

    var sql = "select * from blacklisted_bic where REF_KEY = "+ref_key;
    connection.query(sql, function(err,result,field){
        if((result.length > 0) || (result.length != undefined)){
            var delSql = "update blacklisted_bic set DELETE_FLG = 'Y' where REF_KEY = "+result[0].REF_KEY;
            connection.query(delSql, function(err,result,field){
                if((result.affectedRows > 0) || (result.affectedRows != undefined)){
                    res.json({
                        status : 1,
                        // result : result,
                        message : "Successfully delete details."
                    });
                    return true;
                } else {
                    res.json({
                        status : 0,
                        message : "Error found."
                    });
                    return true;
                }
            });
        } else {
            res.json({
                status : 0,
                message: "Details not found."
            });
            return true;
        }
    });
}

module.exports.del_neutral_words = function(req,res){  
    var ref_key = req.params.ref_key;
    
    const v = new Validator(req.params, {
        ref_key: 'required'
    });
     
    v.check().then((matched) => {
        if (!matched) {
            res.json({
                status : 0,
                message : v.errors,
            });
            return;
        }
    });

    var sql = "select * from neutral_words where REF_KEY = "+ref_key;
    connection.query(sql, function(err,result,field){
        if((result.length > 0) || (result.length != undefined)){
            var delSql = "update neutral_words set DELETE_FLG = 'Y' where REF_KEY = "+result[0].REF_KEY;
            connection.query(delSql, function(err,result,field){
                if((result.affectedRows > 0) || (result.affectedRows != undefined)){
                    res.json({
                        status : 1,
                        // result : result,
                        message : "Successfully delete details."
                    });
                    return true;
                } else {
                    res.json({
                        status : 0,
                        message : "Error found."
                    });
                    return true;
                }
            });
        } else {
            res.json({
                status : 0,
                message: "Details not found."
            });
            return true;
        }
    });
}

module.exports.del_sanctioned_cities = function(req,res){  
    var ref_key = req.params.ref_key;
    
    const v = new Validator(req.params, {
        ref_key: 'required'
    });
     
    v.check().then((matched) => {
        if (!matched) {
            res.json({
                status : 0,
                message : v.errors,
            });
            return;
        }
    });

    var sql = "select * from sanctioned_cities where REF_KEY = "+ref_key;
    connection.query(sql, function(err,result,field){
        if((result.length > 0) || (result.length != undefined)){
            var delSql = "update sanctioned_cities set DELETE_FLG = 'Y' where REF_KEY = "+result[0].REF_KEY;
            connection.query(delSql, function(err,result,field){
                if((result.affectedRows > 0) || (result.affectedRows != undefined)){
                    res.json({
                        status : 1,
                        // result : result,
                        message : "Successfully delete details."
                    });
                    return true;
                } else {
                    res.json({
                        status : 0,
                        message : "Error found."
                    });
                    return true;
                }
            });
        } else {
            res.json({
                status : 0,
                message: "Details not found."
            });
            return true;
        }
    });
}

module.exports.del_zone_global_keywords = function(req,res){  
    var ref_key = req.params.ref_key;
    
    const v = new Validator(req.params, {
        ref_key: 'required'
    });
     
    v.check().then((matched) => {
        if (!matched) {
            res.json({
                status : 0,
                message : v.errors,
            });
            return;
        }
    });

    var sql = "select * from zone_x_global_wl_keywords where REF_KEY = "+ref_key;
    connection.query(sql, function(err,result,field){
        if((result.length > 0) || (result.length != undefined)){
            var delSql = "update zone_x_global_wl_keywords set DELETE_FLG = 'Y' where REF_KEY = "+result[0].REF_KEY;
            connection.query(delSql, function(err,result,field){
                if((result.affectedRows > 0) || (result.affectedRows != undefined)){
                    res.json({
                        status : 1,
                        // result : result,
                        message : "Successfully delete details."
                    });
                    return true;
                } else {
                    res.json({
                        status : 0,
                        message : "Error found."
                    });
                    return true;
                }
            });
        } else {
            res.json({
                status : 0,
                message: "Details not found."
            });
            return true;
        }
    });
}