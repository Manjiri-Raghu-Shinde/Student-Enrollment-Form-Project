/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

var jpdbBaseURL='http://api.login2explore.com:5577';
var jpdbIRL='/api/irl';
var jpdbIML='/api/iml';
var empDBName='SCHOOL-DB';
var empRelationName='STUDENT-TABLE';
var connToken='90932665|-31949276312615670|90954511';

$('#rollno').focus();

function saveRecNo2LS(jsonObj){
    var lvData=JSON.parse(jsonObj.data);
    localStorage.setItem('recno',lvData.rec_no);
}

function getEmpIdAsJsonObj()
{
    var rollno=$('#rollno').val();
    var jsonStr={
        id:rollno
    };
    return JSON.stringify(jsonStr);
}

function fillData(jsonObj)
{
    saveRecNo2LS(jsonObj);
    var record=JSON.parse(jsonObj.data).record;
    $('#fullname').val(record.name);
    $('#class').val(record.class);
    $('#bdate').val(record.birthdate);
    $('#addr').val(record.address);
    $('#enroll').val(record.enrollmentdate);
}

function resetForm()
{
    $('#rollno').val('');
    $('#fullname').val('');
    $('#class').val('');
    $('#bdate').val('');
    $('#addr').val('');
    $('#enroll').val('');
    $('#rollno').prop('disabled',false);
    $('#save').prop('disabled',true);
    $('#change').prop('disabled',true);
    $('#reset').prop('disabled',true);
    $('#rollno').focus();
}

function validateData()
{
    var rollno,fullname,classx,bdate,addr,enroll;
    rollno=$('#rollno').val();
    fullname=$('#fullname').val();
    classx=$('#class').val();
    bdate=$('#bdate').val();
    addr=$('#addr').val();
    enroll=$('#enroll').val();
    
    if(rollno===''){
        alert("Roll NO is missing.");
        $('#rollno').focus();
        return '';
    }
    
    if(fullname===''){
        alert("Student name is missing.");
        $('#fullname').focus();
        return '';
    }
    
    if(classx===''){
        alert("Class is missing.");
        $('#class').focus();
        return '';
    }
    
    if(bdate===''){
        alert("Birth date is missing.");
        $('#bdate').focus();
        return '';
    }
    
    if(addr===''){
        alert("Address is missing.");
        $('#addr').focus();
        return '';
    }
    
    if(enroll===''){
        alert("enrollment date is missing.");
        $('#enroll').focus();
        return '';
    }
    
    var jsonStrObj={
        rollno: rollno,
        fullname: fullname,
        class: classx,
        birthdate: bdate,
        address: addr,
        enrollmentdate: enroll
    };
    return JSON.stringify(jsonStrObj);
}

function getEmp()
{
    var empIdJsonObj=getEmpIdAsJsonObj();
    var getRequest=createGET_BY_KEYRequest(connToken,empDBName,empRelationName,empIdJsonObj);
    jQuery.ajaxSetup({async:false});
    var resJsonObj=executeCommandAtGivenBaseUrl(getRequest,jpdbBaseURL,jpdbIRL);
    jQuery.ajaxSetup({async:true});
    if((resJsonObj.status)===400)
    {
        $('#save').prop('disabled',false);
        $('#reset').prop('disabled',false);
        $('#fullname').focus();
    }
    else if((resJsonObj.status)===200)
    {
        $('#rollno').prop('disabled',true);
        fillData(resJsonObj);
        $('#change').prop('disabled',false);
        $('#reset').prop('disabled',false);
        $('#fullname').focus();
    }
}

function SaveData()
{
    var jsonStrObj=validateData();
    if(jsonStrObj === '')
    {
        return '';
    }
    var putRequest=createPUTRequest(connToken,jsonStrObj,empDBName,empRelationName);
    jQuery.ajaxSetup({async:false});
    var resJsonObj=executeCommandAtGivenBaseUrl(putRequest,jpdbBaseURL,jpdbIML);
    jQuery.ajaxSetup({async:true});
    resetForm();
    $('#rollno').focus();
    
}
function ChangeData()
{
    $('#change').prop('disabled',true);
    jsonChg=validateData();
    var updateRequest=createUPDATERecordRequest(connToken,jsonChg,empDBName,empRelationName,localStorage.getItem("jsonChg"));
    jQuery.ajaxSetup({async:false});
    var resJsonObj=executeCommandAtGivenBaseUrl(updateRequest,jpdbBaseURL,jpdbIML);
    jQuery.ajaxSetup({async:true});
    console.log(resJsonObj);
    resetForm();
    $('#rollno').focus();
}
