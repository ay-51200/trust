let mysql = require('mysql');
var connection = require('../config');
var constant = require('../constant');
const {Validator} = require('node-input-validator');

module.exports.add_highRiskCountry = function(req,res){   
    var ZONE_ID = "QA";
    var COUNTRY_CODE = req.body.country_code;
    var COUNTRY_NAME = req.body.country_name;
    var RISK_LEVEL = req.body.risk_level;
    var SANCTIONED_FLAG = req.body.sanctioned_flag;
    var MAKER_USER_ID = req.body.maker_user_id;
    var CHECKER_USER_ID = req.body.checker_user_id;
    var MAKER_USER_NM = req.body.maker_user_nm;
    var CHECKER_USER_NM = req.body.checker_user_nm;
    var MAKER_COMMENT = req.body.maker_comment;
    var CHECKER_COMMENT = req.body.checker_comment;
    var MAKER_DTTM = req.body.maker_dttm;
    var CHECKER_DTTM = req.body.checker_dttm;
    var MAKER_DATE = req.body.maker_date;
    var CHECKER_DATE = req.body.checker_date;
    var CHANGE_TYPE = req.body.change_type;
    var UPDATE_VERSION = req.body.update_version;
    var VALIDATION_STATUS = req.body.validation_status;
    var VALID_FROM_DTTM = req.body.valid_from_dttm;
    var VALID_TO_DTTM = req.body.valid_to_dttm;


    const v = new Validator(req.body, {
        country_name: 'required',
        country_code: 'required',
        risk_level : 'required',
        sanctioned_flag : 'required',
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

    var sql = "insert into high_risk_countries (ZONE_ID, COUNTRY_CODE, COUNTRY_NAME, RISK_LEVEL, SANCTIONED_FLAG, MAKER_USER_ID, CHECKER_USER_ID, MAKER_USER_NM, CHECKER_USER_NM, MAKER_COMMENT, CHECKER_COMMENT, MAKER_DTTM, CHECKER_DTTM, MAKER_DATE, CHECKER_DATE, CHANGE_TYPE, UPDATE_VERSION, VALIDATION_STATUS, VALID_FROM_DTTM, VALID_TO_DTTM) values('"+ZONE_ID+"','"+COUNTRY_CODE+"','"+COUNTRY_NAME+"','"+RISK_LEVEL+"','"+SANCTIONED_FLAG+"','"+MAKER_USER_ID+"','"+CHECKER_USER_ID+"','"+MAKER_USER_NM+"','"+CHECKER_USER_NM+"','"+MAKER_COMMENT+"','"+CHECKER_COMMENT+"','"+MAKER_DTTM+"','"+CHECKER_DTTM+"','"+MAKER_DATE+"','"+CHECKER_DATE+"','"+CHANGE_TYPE+"','"+UPDATE_VERSION+"','"+VALIDATION_STATUS+"','"+VALID_FROM_DTTM+"','"+VALID_TO_DTTM+"')";

    connection.query(sql, function (err, result, fields) {
        if((result.insertId > 0) || (result.insertId != undefined)){
            res.json({
                status : 1,
                result : result.insertId,
                message : "Successfully saved details."
            });
            return true;
        } else {
            res.json({
                status : 0,
                message: "Error found."
            });
            return true;
        }
    });
}

module.exports.add_neutral_words = function(req,res){   
    var ZONE_ID = "QA";
    var NOISE_WORD = req.body.noise_word;
    var MAKER_USER_ID = req.body.maker_user_id;
    var CHECKER_USER_ID = req.body.checker_user_id;
    var MAKER_USER_NM = req.body.maker_user_nm;
    var CHECKER_USER_NM = req.body.checker_user_nm;
    var MAKER_COMMENT = req.body.maker_comment ? req.body.maker_comment : "To be used for all zones";
    var CHECKER_COMMENT = req.body.checker_comment ? req.body.checker_comment : "Approved";
    var MAKER_DTTM = req.body.maker_dttm;
    var CHECKER_DTTM = req.body.checker_dttm;
    var MAKER_DATE = req.body.maker_date;
    var CHECKER_DATE = req.body.checker_date;
    var CHANGE_TYPE = req.body.change_type ? req.body.change_type : "ADD";
    var UPDATE_VERSION = req.body.update_version ?req.body.update_version : '1';
    var VALIDATION_STATUS = req.body.validation_status ? req.body.validation_status : 'Y';
    var VALID_FROM_DTTM = req.body.valid_from_dttm;
    var VALID_TO_DTTM = req.body.valid_to_dttm;


    const v = new Validator(req.body, {
        noise_word: 'required'
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

    var sql = "select * from neutral_words where NOISE_WORD like '%"+ NOISE_WORD +"%'";
    connection.query(sql,function(err,result, fields) {
        if((result.length >= 1)){
            res.json({
                status : 0,
                message : "This noise word already exist."
            });
            return true;
        } else if(err) {
            res.json({
                status : 0,
                message: "Error found."
            });
            return true;
        } else {
            var addsql = "insert into neutral_words (ZONE_ID, NOISE_WORD, MAKER_USER_ID, CHECKER_USER_ID, MAKER_USER_NM, CHECKER_USER_NM, MAKER_COMMENT, CHECKER_COMMENT, MAKER_DTTM, CHECKER_DTTM, MAKER_DATE, CHECKER_DATE, CHANGE_TYPE, UPDATE_VERSION, VALIDATION_STATUS, VALID_FROM_DTTM, VALID_TO_DTTM) values('"+ZONE_ID+"','"+NOISE_WORD+"','"+MAKER_USER_ID+"','"+CHECKER_USER_ID+"','"+MAKER_USER_NM+"','"+CHECKER_USER_NM+"','"+MAKER_COMMENT+"','"+CHECKER_COMMENT+"','"+MAKER_DTTM+"','"+CHECKER_DTTM+"','"+MAKER_DATE+"','"+CHECKER_DATE+"','"+CHANGE_TYPE+"','"+UPDATE_VERSION+"','"+VALIDATION_STATUS+"','"+VALID_FROM_DTTM+"','"+VALID_TO_DTTM+"')";

            connection.query(addsql, function (err, result, fields) {
                if((result.insertId > 0) || (result.insertId != undefined)){
                    res.json({
                        status : 1,
                        result : result.insertId,
                        message : "Successfully saved details."
                    });
                    return true;
                } else {
                    res.json({
                        status : 0,
                        message: "Error found."
                    });
                    return true;
                }
            });
        }
    });
}

module.exports.add_sanctioned_cities = function(req,res){   
    var ZONE_ID = req.body.zone_id ? req.body.zone_id : "QA";
    var ENTRY_TYPE = req.body.entry_type ? req.body.entry_type : "Shared";
    var SANCTIONED_CITY = req.body.sanctioned_city;
    var MAKER_USER_ID = req.body.maker_user_id;
    var CHECKER_USER_ID = req.body.checker_user_id;
    var MAKER_USER_NM = req.body.maker_user_nm;
    var CHECKER_USER_NM = req.body.checker_user_nm;
    var MAKER_COMMENT = req.body.maker_comment;
    var CHECKER_COMMENT = req.body.checker_comment;
    var MAKER_DTTM = req.body.maker_dttm;
    var CHECKER_DTTM = req.body.checker_dttm;
    var MAKER_DATE = req.body.maker_date;
    var CHECKER_DATE = req.body.checker_date;
    var CHANGE_TYPE = req.body.change_type ? req.body.change_type : "Insert";
    var UPDATE_VERSION = req.body.update_version ? req.body.update_version : "New";
    var VALIDATION_STATUS = req.body.validation_status ? req.body.validation_status : "Approved";
    var VALID_FROM_DTTM = req.body.valid_from_dttm;
    var VALID_TO_DTTM = req.body.valid_to_dttm;


    const v = new Validator(req.body, {
        sanctioned_city : 'required'
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

    var sql = "select * from sanctioned_cities where SANCTIONED_CITY like '%"+ SANCTIONED_CITY +"%'";
    connection.query(sql,function(err,result, fields) {
        if((result.length >= 1)){
            res.json({
                status : 0,
                message : "This SANCTIONED CITY already exist."
            });
            return true;
        } else if(err) {
            res.json({
                status : 0,
                message: "Error found."
            });
            return true;
        } else {
            var addsql = "insert into sanctioned_cities (ZONE_ID, ENTRY_TYPE, SANCTIONED_CITY, MAKER_USER_ID, CHECKER_USER_ID, MAKER_USER_NM, CHECKER_USER_NM, MAKER_COMMENT, CHECKER_COMMENT, MAKER_DTTM, CHECKER_DTTM, MAKER_DATE, CHECKER_DATE, CHANGE_TYPE, UPDATE_VERSION, VALIDATION_STATUS, VALID_FROM_DTTM, VALID_TO_DTTM) values('"+ZONE_ID+"','"+ENTRY_TYPE+"','"+SANCTIONED_CITY+"','"+MAKER_USER_ID+"','"+CHECKER_USER_ID+"','"+MAKER_USER_NM+"','"+CHECKER_USER_NM+"','"+MAKER_COMMENT+"','"+CHECKER_COMMENT+"','"+MAKER_DTTM+"','"+CHECKER_DTTM+"','"+MAKER_DATE+"','"+CHECKER_DATE+"','"+CHANGE_TYPE+"','"+UPDATE_VERSION+"','"+VALIDATION_STATUS+"','"+VALID_FROM_DTTM+"','"+VALID_TO_DTTM+"')";

            connection.query(addsql, function (err, result, fields) {
                if((result.insertId > 0) || (result.insertId != undefined)){
                    res.json({
                        status : 1,
                        result : result.insertId,
                        message : "Successfully saved details."
                    });
                    return true;
                } else {
                    res.json({
                        status : 0,
                        message: "Error found."
                    });
                    return true;
                }
            });
        }
    });
}

module.exports.add_zone_global_keywords = function(req,res){   
    var ZONE_ID = req.body.zone_id ? req.body.zone_id : "YE";
    var PROGRAM_KEYWORD = req.body.program_keyword;
    var PROGRAM_KEYWORD_DESC = req.body.program_keyword_desc;
    var MAKER_USER_ID = req.body.maker_user_id;
    var CHECKER_USER_ID = req.body.checker_user_id;
    var MAKER_USER_NM = req.body.maker_user_nm;
    var CHECKER_USER_NM = req.body.checker_user_nm;
    var MAKER_COMMENT = req.body.maker_comment;
    var CHECKER_COMMENT = req.body.checker_comment;
    var MAKER_DTTM = req.body.maker_dttm;
    var CHECKER_DTTM = req.body.checker_dttm;
    var MAKER_DATE = req.body.maker_date;
    var CHECKER_DATE = req.body.checker_date;
    var CHANGE_TYPE = req.body.change_type;
    var UPDATE_VERSION = req.body.update_version;
    var VALIDATION_STATUS = req.body.validation_status;
    var VALID_FROM_DTTM = req.body.valid_from_dttm;
    var VALID_TO_DTTM = req.body.valid_to_dttm;
    

    const v = new Validator(req.body, {
        program_keyword : 'required',
        program_keyword_desc : 'required'
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

    // var sql = "select * from zone_x_global_wl_keywords where SANCTIONED_CITY like '%"+ SANCTIONED_CITY +"%'";
    // connection.query(sql,function(err,result, fields) {
    //     if((result.length >= 1)){
    //         res.json({
    //             status : 0,
    //             message : "This SANCTIONED CITY already exist."
    //         });
    //         return true;
    //     } else if(err) {
    //         res.json({
    //             status : 0,
    //             message: "Error found."
    //         });
    //         return true;
    //     } else {
            var addsql = "insert into zone_x_global_wl_keywords (ZONE_ID, PROGRAM_KEYWORD, PROGRAM_KEYWORD_DESC, MAKER_USER_ID, CHECKER_USER_ID, MAKER_USER_NM, CHECKER_USER_NM, MAKER_COMMENT, CHECKER_COMMENT, MAKER_DTTM, CHECKER_DTTM, MAKER_DATE, CHECKER_DATE, CHANGE_TYPE, UPDATE_VERSION, VALIDATION_STATUS, VALID_FROM_DTTM, VALID_TO_DTTM) values('"+ZONE_ID+"','"+PROGRAM_KEYWORD+"','"+PROGRAM_KEYWORD_DESC+"','"+MAKER_USER_ID+"','"+CHECKER_USER_ID+"','"+MAKER_USER_NM+"','"+CHECKER_USER_NM+"','"+MAKER_COMMENT+"','"+CHECKER_COMMENT+"','"+MAKER_DTTM+"','"+CHECKER_DTTM+"','"+MAKER_DATE+"','"+CHECKER_DATE+"','"+CHANGE_TYPE+"','"+UPDATE_VERSION+"','"+VALIDATION_STATUS+"','"+VALID_FROM_DTTM+"','"+VALID_TO_DTTM+"')";

            connection.query(addsql, function (err, result, fields) {
                if((result.insertId > 0) || (result.insertId != undefined)){
                    res.json({
                        status : 1,
                        result : result.insertId,
                        message : "Successfully saved details."
                    });
                    return true;
                } else {
                    res.json({
                        status : 0,
                        message: "Error found."
                    });
                    return true;
                }
            });
    //     }
    // });
}

module.exports.add_blacklisted_bic = function(req,res){   
    var ZONE_ID = req.body.zone_id ? req.body.zone_id : "QA";
    var BIC = req.body.bic;
    var MAKER_USER_ID = req.body.maker_user_id;
    var CHECKER_USER_ID = req.body.checker_user_id;
    var MAKER_USER_NM = req.body.maker_user_nm;
    var CHECKER_USER_NM = req.body.checker_user_nm;
    var MAKER_COMMENT = req.body.maker_comment;
    var CHECKER_COMMENT = req.body.checker_comment;
    var MAKER_DTTM = req.body.maker_dttm;
    var CHECKER_DTTM = req.body.checker_dttm;
    var MAKER_DATE = req.body.maker_date;
    var CHECKER_DATE = req.body.checker_date;
    var CHANGE_TYPE = req.body.change_type ? req.body.change_type : "Insert";
    var UPDATE_VERSION = req.body.update_version ? req.body.update_version : "New";
    var VALIDATION_STATUS = req.body.validation_status ? req.body.validation_status : "Approved";
    var VALID_FROM_DTTM = req.body.valid_from_dttm;
    var VALID_TO_DTTM = req.body.valid_to_dttm;
    var INSTITUTION_NAME = req.body.institution_name;
    var CITY = req.body.city;
    var COUNTRY = req.body.country;
    var BIC8 = req.body.bic8;
    var WATCHLIST_NAME = req.body.watchlist_name;
    var UID_NO = req.body.uid_no;
    var WATCHLIST_TYPE = req.body.watchlist_type;


    const v = new Validator(req.body, {
        bic : 'required',
        bic8 : 'required'
        // WATCHLIST_NAME : 'required',
        // WATCHLIST_TYPE : 'required',
        // UID_NO : 'required|integer'
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

    // var sql = "select * from blacklisted_bic where SANCTIONED_CITY like '%"+ SANCTIONED_CITY +"%'";
    // connection.query(sql,function(err,result, fields) {
    //     if((result.length >= 1)){
    //         res.json({
    //             status : 0,
    //             message : "This SANCTIONED CITY already exist."
    //         });
    //         return true;
    //     } else if(err) {
    //         res.json({
    //             status : 0,
    //             message: "Error found."
    //         });
    //         return true;
    //     } else {
            var addsql = "insert into blacklisted_bic (ZONE_ID, BIC, BIC8, MAKER_USER_ID, CHECKER_USER_ID, MAKER_USER_NM, CHECKER_USER_NM, MAKER_COMMENT, CHECKER_COMMENT, MAKER_DTTM, CHECKER_DTTM, MAKER_DATE, CHECKER_DATE, CHANGE_TYPE, UPDATE_VERSION, VALIDATION_STATUS, VALID_FROM_DTTM, VALID_TO_DTTM, INSTITUTION_NAME, CITY, COUNTRY, WATCHLIST_NAME, UID_NO, WATCHLIST_TYPE) values('"+ZONE_ID+"','"+BIC+"','"+BIC8+"','"+MAKER_USER_ID+"','"+CHECKER_USER_ID+"','"+MAKER_USER_NM+"','"+CHECKER_USER_NM+"','"+MAKER_COMMENT+"','"+CHECKER_COMMENT+"','"+MAKER_DTTM+"','"+CHECKER_DTTM+"','"+MAKER_DATE+"','"+CHECKER_DATE+"','"+CHANGE_TYPE+"','"+UPDATE_VERSION+"','"+VALIDATION_STATUS+"','"+VALID_FROM_DTTM+"','"+VALID_TO_DTTM+"','"+INSTITUTION_NAME+"','"+CITY+"','"+COUNTRY+"','"+WATCHLIST_NAME+"','"+UID_NO+"','"+WATCHLIST_TYPE+"')";

            connection.query(addsql, function (err, result, fields) {
                if((result.insertId > 0) || (result.insertId != undefined)){
                    res.json({
                        status : 1,
                        result : result.insertId,
                        message : "Successfully saved details."
                    });
                    return true;
                } else {
                    res.json({
                        status : 0,
                        message: "Error found."
                    });
                    return true;
                }
            });
    //     }
    // });
}

module.exports.add_internal_watchlist = function(req,res){
    var ZONE_ID = req.body.zone_id ? req.body.zone_id : "QA";
    var WATCHLIST_ID = req.body.watchlist_id;
    var WATCHLIST_NAME = req.body.watchlist_name;
    var CUSTOMER_NAME_ENGLISH = req.body.customer_name_english;
    var CUSTOMER_NAME_ARABIC = req.body.customer_name_arabic;
    var CUSTOMER_TYPE = req.body.customer_type;
    var CITY = req.body.city;
    var CUSTOMER_ACCOUNT = req.body.customer_account;
    var DOB = req.body.dob;
    var RESIDENCE_COUNTRY = req.body.residence_country;
    var RESIDENCE_COUNTRY_FLAG = req.body.residence_country_flag;
    var NATIONALITY = req.body.nationality;
    var ID_NUMBER = req.body.id_number;
    var ID_TYPE = req.body.id_type;
    var KNOWN_AS_NAME_ENGLISH = req.body.known_as_name_english;
    var KNOWN_AS_NAME_ARABIC = req.body.known_as_name_arabic;
    var MOTHER_NAME = req.body.mother_name;
    var ADDRESS = req.body.address;
    var REMARKS = req.body.remarks;
    var CIN = req.body.cin;
    var NEW_PAN = req.body.new_pan;
    var SOURCE = req.body.source;
    var CUSTOMER_STATUS = req.body.customer_status;
    var BRANCH = req.body.branch;
    var CUSTOMER_RISK_LEVEL = req.body.customer_risk_level;
    var CUSTOMER_CREATE_DATE = req.body.customer_create_date;
    var CUST_RISK_LEVEL_UPDATE_DATE = req.body.cust_risk_level_update_date;
    var POLITICALLY_EXPOSED = req.body.politically_exposed;
    var DETAILS_PROGRAMS = req.body.details_programs;
    var OTHERS_REMARKS = req.body.others_remarks;
    var OTHERS_DATA_SOURCES = req.body.others_data_sources;
    var OTHERS_RELATED_TO = req.body.others_related_to;


    const v = new Validator(req.body, {
        watchlist_name : 'required',
        customer_name_english : 'required',
        watchlist_id : 'required'
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

    var addsql = "insert into internal_watch_list (ZONE_ID, WATCHLIST_ID, WATCHLIST_NAME, CUSTOMER_NAME_ENGLISH, CUSTOMER_NAME_ARABIC, CUSTOMER_TYPE, CITY, CUSTOMER_ACCOUNT, DOB, RESIDENCE_COUNTRY, RESIDENCE_COUNTRY_FLAG, NATIONALITY, ID_NUMBER, ID_TYPE, KNOWN_AS_NAME_ENGLISH, KNOWN_AS_NAME_ARABIC, MOTHER_NAME, ADDRESS, REMARKS, CIN, NEW_PAN, SOURCE, CUSTOMER_STATUS, BRANCH, CUSTOMER_RISK_LEVEL, CUSTOMER_CREATE_DATE, CUST_RISK_LEVEL_UPDATE_DATE, POLITICALLY_EXPOSED, DETAILS_PROGRAMS, OTHERS_REMARKS, OTHERS_DATA_SOURCES, OTHERS_RELATED_TO) values('"+ZONE_ID+"','"+WATCHLIST_ID+"','"+WATCHLIST_NAME+"','"+CUSTOMER_NAME_ENGLISH+"','"+CUSTOMER_NAME_ARABIC+"','"+CUSTOMER_TYPE+"','"+CITY+"','"+CUSTOMER_ACCOUNT+"','"+DOB+"','"+RESIDENCE_COUNTRY+"','"+RESIDENCE_COUNTRY_FLAG+"','"+NATIONALITY+"','"+ID_NUMBER+"','"+ID_TYPE+"','"+KNOWN_AS_NAME_ENGLISH+"','"+KNOWN_AS_NAME_ARABIC+"','"+MOTHER_NAME+"','"+ADDRESS+"','"+REMARKS+"','"+CIN+"','"+NEW_PAN+"','"+SOURCE+"','"+CUSTOMER_STATUS+"','"+BRANCH+"','"+CUSTOMER_RISK_LEVEL+"','"+CUSTOMER_CREATE_DATE+"','"+CUST_RISK_LEVEL_UPDATE_DATE+"','"+POLITICALLY_EXPOSED+"','"+DETAILS_PROGRAMS+"','"+OTHERS_REMARKS+"','"+OTHERS_DATA_SOURCES+"','"+OTHERS_RELATED_TO+"')";

    connection.query(addsql, function (err, result, fields) {
        if((result.insertId > 0) || (result.insertId != undefined)){
            res.json({
                status : 1,
                result : result.insertId,
                message : "Successfully saved details."
            });
            return true;
        } else {
            res.json({
                status : 0,
                message: "Error found."
            });
            return true;
        }
    });
}

module.exports.add_internal_list_def = function(req,res){
    var ZONE_ID = req.body.zone_id ? req.body.zone_id : "QA";
    var LIST_TYPE = req.body.list_type;
    var WATCHLIST_NAME = req.body.watchlist_name;
    var LIST_CATEGORY = req.body.list_category;
    var WATCHLIST_ID = req.body.watchlist_id;
    var MAKER_USER_ID = req.body.maker_user_id;
    var CHECKER_USER_ID = req.body.checker_user_id;
    var MAKER_USER_NM = req.body.maker_user_nm;
    var CHECKER_USER_NM = req.body.checker_user_nm;
    var MAKER_COMMENT = req.body.maker_comment;
    var CHECKER_COMMENT = req.body.checker_comment;
    var MAKER_DTTM = req.body.maker_dttm;
    var CHECKER_DTTM = req.body.checker_dttm;
    var MAKER_DATE = req.body.maker_date;
    var CHECKER_DATE = req.body.checker_date;
    var CHANGE_TYPE = req.body.change_type;
    var UPDATE_VERSION = req.body.update_version;
    var VALIDATION_STATUS = req.body.validation_status;
    var VALID_FROM_DTTM = req.body.valid_from_dttm;
    var VALID_TO_DTTM = req.body.valid_to_dttm;
    var DELETE_FLG = 'N';


    const v = new Validator(req.body, {
        list_type : 'required',
        watchlist_name : 'required',
        watchlist_id : 'required'
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

    var addsql = "insert into internal_list_def (ZONE_ID, LIST_TYPE, LIST_CATEGORY, WATCHLIST_NAME, WATCHLIST_ID, MAKER_USER_ID, CHECKER_USER_ID, MAKER_USER_NM, CHECKER_USER_NM, MAKER_COMMENT, CHECKER_COMMENT, MAKER_DTTM, CHECKER_DTTM, MAKER_DATE, CHECKER_DATE, CHANGE_TYPE, UPDATE_VERSION, VALIDATION_STATUS, VALID_FROM_DTTM, VALID_TO_DTTM, DELETE_FLG) values('"+ZONE_ID+"','"+LIST_TYPE+"','"+LIST_CATEGORY+"','"+WATCHLIST_NAME+"','"+WATCHLIST_ID+"','"+MAKER_USER_ID+"','"+CHECKER_USER_ID+"','"+MAKER_USER_NM+"','"+CHECKER_USER_NM+"','"+MAKER_COMMENT+"','"+CHECKER_COMMENT+"','"+MAKER_DTTM+"','"+CHECKER_DTTM+"','"+MAKER_DATE+"','"+CHECKER_DATE+"','"+CHANGE_TYPE+"','"+UPDATE_VERSION+"','"+VALIDATION_STATUS+"','"+VALID_FROM_DTTM+"','"+VALID_TO_DTTM+"','"+DELETE_FLG+"')";

    connection.query(addsql, function (err, result, fields) {
        if((result.insertId > 0) || (result.insertId != undefined)){
            res.json({
                status : 1,
                result : result.insertId,
                message : "Successfully saved details."
            });
            return true;
        } else {
            res.json({
                status : 0,
                message: "Error found."
            });
            return true;
        }
    });
}