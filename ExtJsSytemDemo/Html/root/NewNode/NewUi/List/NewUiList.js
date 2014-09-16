var currentRowindex = 0;
function OnReady(id){
AF.func('Build', '../xml/root/NewNode/NewUi/List/Layout.xml');
GenerateFunctionAndProperty(AF, '');
if (onBeforeLoadUi){
onLoadUi();
onAfterLoadUi();
}
if (onBeforeLoadData){
onLoadData();
onAfterLoadData();
}

}
function onBeforeLoadUi(){

}
function onLoadUi(){

}
function onAfterLoadUi(){

}
function onBeforeLoadData(){

}
function onLoadData(){
AF.mainBody.Load(getRootPath()+'/Metadata/Runtime/InvokeService?id=ba34856f-78cc-4d5a-b7f9-55227d688d95');
AF.mainBody.SelectRow(currentRowindex);

}
function onAfterLoadData(){

}
function onSaved(p2, p3, p4){

}
function onDownload(p2, p3, p4){

}
function onEventListRefreshed(p2, p3, p4){

}
function onButtonClicked(p2, p3, p4){

}
function onEditChanged(p2, p3, p4){

}
function onUserEvent(p2, p3, p4){

}
function onSaved_mainLayout(p2, p3, p4){

}
function onDownload_mainLayout(p2, p3, p4){

}
function onEventListRefreshed_mainLayout(p2, p3, p4){

}
function onButtonClicked_mainLayout(p2, p3, p4){

}
function onEditChanged_mainLayout(p2, p3, p4){

}
function onUserEvent_mainLayout(p2, p3, p4){

}
function onmainToolbar_Saved_mainToolbarLayout(p2, p3, p4){

}
function onmainToolbar_Download_mainToolbarLayout(p2, p3, p4){

}
function onmainToolbar_EventListRefreshed_mainToolbarLayout(p2, p3, p4){

}
function onmainToolbar_ButtonClicked_mainToolbarLayout(p2, p3, p4){

}
function onmainToolbar_EditChanged_mainToolbarLayout(p2, p3, p4){

}
function onmainToolbar_UserEvent_mainToolbarLayout(p2, p3, p4){

}
function onmainToolbar_Saved_btnAdd(p2, p3, p4){

}
function onmainToolbar_Download_btnAdd(p2, p3, p4){

}
function onmainToolbar_EventListRefreshed_btnAdd(p2, p3, p4){

}
function onmainToolbar_ButtonClicked_btnAdd(p2, p3, p4){
window.open('MasterEntityEdit.html?otype=add');

}
function onmainToolbar_EditChanged_btnAdd(p2, p3, p4){

}
function onmainToolbar_UserEvent_btnAdd(p2, p3, p4){

}
function onmainToolbar_Saved_btnEdit(p2, p3, p4){

}
function onmainToolbar_Download_btnEdit(p2, p3, p4){

}
function onmainToolbar_EventListRefreshed_btnEdit(p2, p3, p4){

}
function onmainToolbar_ButtonClicked_btnEdit(p2, p3, p4){
var rowIndex = AF.mainBody.GetCurrentRow();
currentRowindex = rowIndex;
var idValue = AF.mainBody.GetCellData(rowIndex, 'id');
window.open('MasterEntityEdit.htmlhtml?otype=edit&id=' + idValue);

}
function onmainToolbar_EditChanged_btnEdit(p2, p3, p4){

}
function onmainToolbar_UserEvent_btnEdit(p2, p3, p4){

}
function onmainToolbar_Saved_btnDelete(p2, p3, p4){

}
function onmainToolbar_Download_btnDelete(p2, p3, p4){

}
function onmainToolbar_EventListRefreshed_btnDelete(p2, p3, p4){

}
function onmainToolbar_ButtonClicked_btnDelete(p2, p3, p4){
AF.mainBody.DeleteCurrentRow(-1, 1, true, 'raiseEvent=true;SelectRow=false;isOpenEdit=true');

}
function onmainToolbar_EditChanged_btnDelete(p2, p3, p4){

}
function onmainToolbar_UserEvent_btnDelete(p2, p3, p4){

}
function onmainToolbar_Saved_btnView(p2, p3, p4){

}
function onmainToolbar_Download_btnView(p2, p3, p4){

}
function onmainToolbar_EventListRefreshed_btnView(p2, p3, p4){

}
function onmainToolbar_ButtonClicked_btnView(p2, p3, p4){
var rowIndex = AF.mainBody.GetCurrentRow();
currentRowindex = rowIndex;
var idValue = AF.mainBody.GetCellData(rowIndex, 'id');
window.open('MasterEntityEdit.htmlhtml?otype=view&id=' + idValue);

}
function onmainToolbar_EditChanged_btnView(p2, p3, p4){

}
function onmainToolbar_UserEvent_btnView(p2, p3, p4){

}
function onmainToolbar_Saved_btnSave(p2, p3, p4){

}
function onmainToolbar_Download_btnSave(p2, p3, p4){

}
function onmainToolbar_EventListRefreshed_btnSave(p2, p3, p4){

}
function onmainToolbar_ButtonClicked_btnSave(p2, p3, p4){
if (!onBeforeSave())
return;
var ret = AF.mainBody.GetChangedXML('level=1; CompKeySep=;isValidateKey=true');
var ret = AF.mainBody.ToJson(ret);
$.post(getRootPath()+'/Metadata/Runtime/InvokeService?id='+8ba26f08-1ca6-46a6-98f9-068b0e5f2e46,
{
data: ret
}
function (data, status) {
AF.mainBody.ResetChanged('');
});
}
function onmainToolbar_EditChanged_btnSave(p2, p3, p4){

}
function onmainToolbar_UserEvent_btnSave(p2, p3, p4){

}
function onmainToolbar_Saved_btnExpand(p2, p3, p4){

}
function onmainToolbar_Download_btnExpand(p2, p3, p4){

}
function onmainToolbar_EventListRefreshed_btnExpand(p2, p3, p4){

}
function onmainToolbar_ButtonClicked_btnExpand(p2, p3, p4){

}
function onmainToolbar_EditChanged_btnExpand(p2, p3, p4){

}
function onmainToolbar_UserEvent_btnExpand(p2, p3, p4){

}
function onmainToolbar_Saved_btnPrint(p2, p3, p4){

}
function onmainToolbar_Download_btnPrint(p2, p3, p4){

}
function onmainToolbar_EventListRefreshed_btnPrint(p2, p3, p4){

}
function onmainToolbar_ButtonClicked_btnPrint(p2, p3, p4){

}
function onmainToolbar_EditChanged_btnPrint(p2, p3, p4){

}
function onmainToolbar_UserEvent_btnPrint(p2, p3, p4){

}
function onmainToolbar_Saved_btnHelp(p2, p3, p4){

}
function onmainToolbar_Download_btnHelp(p2, p3, p4){

}
function onmainToolbar_EventListRefreshed_btnHelp(p2, p3, p4){

}
function onmainToolbar_ButtonClicked_btnHelp(p2, p3, p4){

}
function onmainToolbar_EditChanged_btnHelp(p2, p3, p4){

}
function onmainToolbar_UserEvent_btnHelp(p2, p3, p4){

}
function onmainToolbar_Saved_btnExit(p2, p3, p4){

}
function onmainToolbar_Download_btnExit(p2, p3, p4){

}
function onmainToolbar_EventListRefreshed_btnExit(p2, p3, p4){

}
function onmainToolbar_ButtonClicked_btnExit(p2, p3, p4){

}
function onmainToolbar_EditChanged_btnExit(p2, p3, p4){

}
function onmainToolbar_UserEvent_btnExit(p2, p3, p4){

}
function onmainToolbar_Saved_mainToolbarBottom(p2, p3, p4){

}
function onmainToolbar_Download_mainToolbarBottom(p2, p3, p4){

}
function onmainToolbar_EventListRefreshed_mainToolbarBottom(p2, p3, p4){

}
function onmainToolbar_ButtonClicked_mainToolbarBottom(p2, p3, p4){

}
function onmainToolbar_EditChanged_mainToolbarBottom(p2, p3, p4){

}
function onmainToolbar_UserEvent_mainToolbarBottom(p2, p3, p4){

}
function onSaved_mainToolbar(p2, p3, p4){

}
function onDownload_mainToolbar(p2, p3, p4){

}
function onEventListRefreshed_mainToolbar(p2, p3, p4){

}
function onButtonClicked_mainToolbar(p2, p3, p4){

}
function onEditChanged_mainToolbar(p2, p3, p4){

}
function onUserEvent_mainToolbar(p2, p3, p4){

}
function onmainQuery_Saved_mainQueryFormLayout(p2, p3, p4){

}
function onmainQuery_Download_mainQueryFormLayout(p2, p3, p4){

}
function onmainQuery_EventListRefreshed_mainQueryFormLayout(p2, p3, p4){

}
function onmainQuery_ButtonClicked_mainQueryFormLayout(p2, p3, p4){

}
function onmainQuery_EditChanged_mainQueryFormLayout(p2, p3, p4){

}
function onmainQuery_UserEvent_mainQueryFormLayout(p2, p3, p4){

}
function onmainQuery_Saved_Birth(p2, p3, p4){

}
function onmainQuery_Download_Birth(p2, p3, p4){

}
function onmainQuery_EventListRefreshed_Birth(p2, p3, p4){

}
function onmainQuery_ButtonClicked_Birth(p2, p3, p4){

}
function onmainQuery_EditChanged_Birth(p2, p3, p4){

}
function onmainQuery_UserEvent_Birth(p2, p3, p4){

}
function onmainQuery_Saved_Sex(p2, p3, p4){

}
function onmainQuery_Download_Sex(p2, p3, p4){

}
function onmainQuery_EventListRefreshed_Sex(p2, p3, p4){

}
function onmainQuery_ButtonClicked_Sex(p2, p3, p4){

}
function onmainQuery_EditChanged_Sex(p2, p3, p4){

}
function onmainQuery_UserEvent_Sex(p2, p3, p4){

}
function onmainQuery_Saved_Name(p2, p3, p4){

}
function onmainQuery_Download_Name(p2, p3, p4){

}
function onmainQuery_EventListRefreshed_Name(p2, p3, p4){

}
function onmainQuery_ButtonClicked_Name(p2, p3, p4){

}
function onmainQuery_EditChanged_Name(p2, p3, p4){

}
function onmainQuery_UserEvent_Name(p2, p3, p4){

}
function onSaved_mainQuery(p2, p3, p4){

}
function onDownload_mainQuery(p2, p3, p4){

}
function onEventListRefreshed_mainQuery(p2, p3, p4){

}
function onButtonClicked_mainQuery(p2, p3, p4){

}
function onEditChanged_mainQuery(p2, p3, p4){

}
function onUserEvent_mainQuery(p2, p3, p4){

}
function onSaved_mainBody(p2, p3, p4){

}
function onDownload_mainBody(p2, p3, p4){

}
function onEventListRefreshed_mainBody(p2, p3, p4){

}
function onButtonClicked_mainBody(p2, p3, p4){

}
function onEditChanged_mainBody(p2, p3, p4){

}
function onUserEvent_mainBody(p2, p3, p4){

}
function OnEvent(id, Event, p1, p2, p3, p4){
if(1 != 1)
{
}
if(Event == 'Saved' && p1 == '')
{
onSaved();
}
if(Event == 'Download' && p1 == '')
{
onDownload();
}
if(Event == 'EventListRefreshed' && p1 == '')
{
onEventListRefreshed();
}
if(Event == 'ButtonClicked' && p1 == '')
{
onButtonClicked();
}
if(Event == 'EditChanged' && p1 == '')
{
onEditChanged();
}
if(Event == 'UserEvent' && p1 == '')
{
onUserEvent();
}
if(Event == 'Saved' && p1 == 'mainLayout')
{
onSaved_mainLayout();
}
if(Event == 'Download' && p1 == 'mainLayout')
{
onDownload_mainLayout();
}
if(Event == 'EventListRefreshed' && p1 == 'mainLayout')
{
onEventListRefreshed_mainLayout();
}
if(Event == 'ButtonClicked' && p1 == 'mainLayout')
{
onButtonClicked_mainLayout();
}
if(Event == 'EditChanged' && p1 == 'mainLayout')
{
onEditChanged_mainLayout();
}
if(Event == 'UserEvent' && p1 == 'mainLayout')
{
onUserEvent_mainLayout();
}
if(Event == 'mainToolbar.Saved' && p1 == 'mainToolbarLayout')
{
onmainToolbar_Saved_mainToolbarLayout();
}
if(Event == 'mainToolbar.Download' && p1 == 'mainToolbarLayout')
{
onmainToolbar_Download_mainToolbarLayout();
}
if(Event == 'mainToolbar.EventListRefreshed' && p1 == 'mainToolbarLayout')
{
onmainToolbar_EventListRefreshed_mainToolbarLayout();
}
if(Event == 'mainToolbar.ButtonClicked' && p1 == 'mainToolbarLayout')
{
onmainToolbar_ButtonClicked_mainToolbarLayout();
}
if(Event == 'mainToolbar.EditChanged' && p1 == 'mainToolbarLayout')
{
onmainToolbar_EditChanged_mainToolbarLayout();
}
if(Event == 'mainToolbar.UserEvent' && p1 == 'mainToolbarLayout')
{
onmainToolbar_UserEvent_mainToolbarLayout();
}
if(Event == 'mainToolbar.Saved' && p1 == 'btnAdd')
{
onmainToolbar_Saved_btnAdd();
}
if(Event == 'mainToolbar.Download' && p1 == 'btnAdd')
{
onmainToolbar_Download_btnAdd();
}
if(Event == 'mainToolbar.EventListRefreshed' && p1 == 'btnAdd')
{
onmainToolbar_EventListRefreshed_btnAdd();
}
if(Event == 'mainToolbar.ButtonClicked' && p1 == 'btnAdd')
{
onmainToolbar_ButtonClicked_btnAdd();
}
if(Event == 'mainToolbar.EditChanged' && p1 == 'btnAdd')
{
onmainToolbar_EditChanged_btnAdd();
}
if(Event == 'mainToolbar.UserEvent' && p1 == 'btnAdd')
{
onmainToolbar_UserEvent_btnAdd();
}
if(Event == 'mainToolbar.Saved' && p1 == 'btnEdit')
{
onmainToolbar_Saved_btnEdit();
}
if(Event == 'mainToolbar.Download' && p1 == 'btnEdit')
{
onmainToolbar_Download_btnEdit();
}
if(Event == 'mainToolbar.EventListRefreshed' && p1 == 'btnEdit')
{
onmainToolbar_EventListRefreshed_btnEdit();
}
if(Event == 'mainToolbar.ButtonClicked' && p1 == 'btnEdit')
{
onmainToolbar_ButtonClicked_btnEdit();
}
if(Event == 'mainToolbar.EditChanged' && p1 == 'btnEdit')
{
onmainToolbar_EditChanged_btnEdit();
}
if(Event == 'mainToolbar.UserEvent' && p1 == 'btnEdit')
{
onmainToolbar_UserEvent_btnEdit();
}
if(Event == 'mainToolbar.Saved' && p1 == 'btnDelete')
{
onmainToolbar_Saved_btnDelete();
}
if(Event == 'mainToolbar.Download' && p1 == 'btnDelete')
{
onmainToolbar_Download_btnDelete();
}
if(Event == 'mainToolbar.EventListRefreshed' && p1 == 'btnDelete')
{
onmainToolbar_EventListRefreshed_btnDelete();
}
if(Event == 'mainToolbar.ButtonClicked' && p1 == 'btnDelete')
{
onmainToolbar_ButtonClicked_btnDelete();
}
if(Event == 'mainToolbar.EditChanged' && p1 == 'btnDelete')
{
onmainToolbar_EditChanged_btnDelete();
}
if(Event == 'mainToolbar.UserEvent' && p1 == 'btnDelete')
{
onmainToolbar_UserEvent_btnDelete();
}
if(Event == 'mainToolbar.Saved' && p1 == 'btnView')
{
onmainToolbar_Saved_btnView();
}
if(Event == 'mainToolbar.Download' && p1 == 'btnView')
{
onmainToolbar_Download_btnView();
}
if(Event == 'mainToolbar.EventListRefreshed' && p1 == 'btnView')
{
onmainToolbar_EventListRefreshed_btnView();
}
if(Event == 'mainToolbar.ButtonClicked' && p1 == 'btnView')
{
onmainToolbar_ButtonClicked_btnView();
}
if(Event == 'mainToolbar.EditChanged' && p1 == 'btnView')
{
onmainToolbar_EditChanged_btnView();
}
if(Event == 'mainToolbar.UserEvent' && p1 == 'btnView')
{
onmainToolbar_UserEvent_btnView();
}
if(Event == 'mainToolbar.Saved' && p1 == 'btnSave')
{
onmainToolbar_Saved_btnSave();
}
if(Event == 'mainToolbar.Download' && p1 == 'btnSave')
{
onmainToolbar_Download_btnSave();
}
if(Event == 'mainToolbar.EventListRefreshed' && p1 == 'btnSave')
{
onmainToolbar_EventListRefreshed_btnSave();
}
if(Event == 'mainToolbar.ButtonClicked' && p1 == 'btnSave')
{
onmainToolbar_ButtonClicked_btnSave();
}
if(Event == 'mainToolbar.EditChanged' && p1 == 'btnSave')
{
onmainToolbar_EditChanged_btnSave();
}
if(Event == 'mainToolbar.UserEvent' && p1 == 'btnSave')
{
onmainToolbar_UserEvent_btnSave();
}
if(Event == 'mainToolbar.Saved' && p1 == 'btnExpand')
{
onmainToolbar_Saved_btnExpand();
}
if(Event == 'mainToolbar.Download' && p1 == 'btnExpand')
{
onmainToolbar_Download_btnExpand();
}
if(Event == 'mainToolbar.EventListRefreshed' && p1 == 'btnExpand')
{
onmainToolbar_EventListRefreshed_btnExpand();
}
if(Event == 'mainToolbar.ButtonClicked' && p1 == 'btnExpand')
{
onmainToolbar_ButtonClicked_btnExpand();
}
if(Event == 'mainToolbar.EditChanged' && p1 == 'btnExpand')
{
onmainToolbar_EditChanged_btnExpand();
}
if(Event == 'mainToolbar.UserEvent' && p1 == 'btnExpand')
{
onmainToolbar_UserEvent_btnExpand();
}
if(Event == 'mainToolbar.Saved' && p1 == 'btnPrint')
{
onmainToolbar_Saved_btnPrint();
}
if(Event == 'mainToolbar.Download' && p1 == 'btnPrint')
{
onmainToolbar_Download_btnPrint();
}
if(Event == 'mainToolbar.EventListRefreshed' && p1 == 'btnPrint')
{
onmainToolbar_EventListRefreshed_btnPrint();
}
if(Event == 'mainToolbar.ButtonClicked' && p1 == 'btnPrint')
{
onmainToolbar_ButtonClicked_btnPrint();
}
if(Event == 'mainToolbar.EditChanged' && p1 == 'btnPrint')
{
onmainToolbar_EditChanged_btnPrint();
}
if(Event == 'mainToolbar.UserEvent' && p1 == 'btnPrint')
{
onmainToolbar_UserEvent_btnPrint();
}
if(Event == 'mainToolbar.Saved' && p1 == 'btnHelp')
{
onmainToolbar_Saved_btnHelp();
}
if(Event == 'mainToolbar.Download' && p1 == 'btnHelp')
{
onmainToolbar_Download_btnHelp();
}
if(Event == 'mainToolbar.EventListRefreshed' && p1 == 'btnHelp')
{
onmainToolbar_EventListRefreshed_btnHelp();
}
if(Event == 'mainToolbar.ButtonClicked' && p1 == 'btnHelp')
{
onmainToolbar_ButtonClicked_btnHelp();
}
if(Event == 'mainToolbar.EditChanged' && p1 == 'btnHelp')
{
onmainToolbar_EditChanged_btnHelp();
}
if(Event == 'mainToolbar.UserEvent' && p1 == 'btnHelp')
{
onmainToolbar_UserEvent_btnHelp();
}
if(Event == 'mainToolbar.Saved' && p1 == 'btnExit')
{
onmainToolbar_Saved_btnExit();
}
if(Event == 'mainToolbar.Download' && p1 == 'btnExit')
{
onmainToolbar_Download_btnExit();
}
if(Event == 'mainToolbar.EventListRefreshed' && p1 == 'btnExit')
{
onmainToolbar_EventListRefreshed_btnExit();
}
if(Event == 'mainToolbar.ButtonClicked' && p1 == 'btnExit')
{
onmainToolbar_ButtonClicked_btnExit();
}
if(Event == 'mainToolbar.EditChanged' && p1 == 'btnExit')
{
onmainToolbar_EditChanged_btnExit();
}
if(Event == 'mainToolbar.UserEvent' && p1 == 'btnExit')
{
onmainToolbar_UserEvent_btnExit();
}
if(Event == 'mainToolbar.Saved' && p1 == 'mainToolbarBottom')
{
onmainToolbar_Saved_mainToolbarBottom();
}
if(Event == 'mainToolbar.Download' && p1 == 'mainToolbarBottom')
{
onmainToolbar_Download_mainToolbarBottom();
}
if(Event == 'mainToolbar.EventListRefreshed' && p1 == 'mainToolbarBottom')
{
onmainToolbar_EventListRefreshed_mainToolbarBottom();
}
if(Event == 'mainToolbar.ButtonClicked' && p1 == 'mainToolbarBottom')
{
onmainToolbar_ButtonClicked_mainToolbarBottom();
}
if(Event == 'mainToolbar.EditChanged' && p1 == 'mainToolbarBottom')
{
onmainToolbar_EditChanged_mainToolbarBottom();
}
if(Event == 'mainToolbar.UserEvent' && p1 == 'mainToolbarBottom')
{
onmainToolbar_UserEvent_mainToolbarBottom();
}
if(Event == 'Saved' && p1 == 'mainToolbar')
{
onSaved_mainToolbar();
}
if(Event == 'Download' && p1 == 'mainToolbar')
{
onDownload_mainToolbar();
}
if(Event == 'EventListRefreshed' && p1 == 'mainToolbar')
{
onEventListRefreshed_mainToolbar();
}
if(Event == 'ButtonClicked' && p1 == 'mainToolbar')
{
onButtonClicked_mainToolbar();
}
if(Event == 'EditChanged' && p1 == 'mainToolbar')
{
onEditChanged_mainToolbar();
}
if(Event == 'UserEvent' && p1 == 'mainToolbar')
{
onUserEvent_mainToolbar();
}
if(Event == 'mainQuery.Saved' && p1 == 'mainQueryFormLayout')
{
onmainQuery_Saved_mainQueryFormLayout();
}
if(Event == 'mainQuery.Download' && p1 == 'mainQueryFormLayout')
{
onmainQuery_Download_mainQueryFormLayout();
}
if(Event == 'mainQuery.EventListRefreshed' && p1 == 'mainQueryFormLayout')
{
onmainQuery_EventListRefreshed_mainQueryFormLayout();
}
if(Event == 'mainQuery.ButtonClicked' && p1 == 'mainQueryFormLayout')
{
onmainQuery_ButtonClicked_mainQueryFormLayout();
}
if(Event == 'mainQuery.EditChanged' && p1 == 'mainQueryFormLayout')
{
onmainQuery_EditChanged_mainQueryFormLayout();
}
if(Event == 'mainQuery.UserEvent' && p1 == 'mainQueryFormLayout')
{
onmainQuery_UserEvent_mainQueryFormLayout();
}
if(Event == 'mainQuery.Saved' && p1 == 'Birth')
{
onmainQuery_Saved_Birth();
}
if(Event == 'mainQuery.Download' && p1 == 'Birth')
{
onmainQuery_Download_Birth();
}
if(Event == 'mainQuery.EventListRefreshed' && p1 == 'Birth')
{
onmainQuery_EventListRefreshed_Birth();
}
if(Event == 'mainQuery.ButtonClicked' && p1 == 'Birth')
{
onmainQuery_ButtonClicked_Birth();
}
if(Event == 'mainQuery.EditChanged' && p1 == 'Birth')
{
onmainQuery_EditChanged_Birth();
}
if(Event == 'mainQuery.UserEvent' && p1 == 'Birth')
{
onmainQuery_UserEvent_Birth();
}
if(Event == 'mainQuery.Saved' && p1 == 'Sex')
{
onmainQuery_Saved_Sex();
}
if(Event == 'mainQuery.Download' && p1 == 'Sex')
{
onmainQuery_Download_Sex();
}
if(Event == 'mainQuery.EventListRefreshed' && p1 == 'Sex')
{
onmainQuery_EventListRefreshed_Sex();
}
if(Event == 'mainQuery.ButtonClicked' && p1 == 'Sex')
{
onmainQuery_ButtonClicked_Sex();
}
if(Event == 'mainQuery.EditChanged' && p1 == 'Sex')
{
onmainQuery_EditChanged_Sex();
}
if(Event == 'mainQuery.UserEvent' && p1 == 'Sex')
{
onmainQuery_UserEvent_Sex();
}
if(Event == 'mainQuery.Saved' && p1 == 'Name')
{
onmainQuery_Saved_Name();
}
if(Event == 'mainQuery.Download' && p1 == 'Name')
{
onmainQuery_Download_Name();
}
if(Event == 'mainQuery.EventListRefreshed' && p1 == 'Name')
{
onmainQuery_EventListRefreshed_Name();
}
if(Event == 'mainQuery.ButtonClicked' && p1 == 'Name')
{
onmainQuery_ButtonClicked_Name();
}
if(Event == 'mainQuery.EditChanged' && p1 == 'Name')
{
onmainQuery_EditChanged_Name();
}
if(Event == 'mainQuery.UserEvent' && p1 == 'Name')
{
onmainQuery_UserEvent_Name();
}
if(Event == 'Saved' && p1 == 'mainQuery')
{
onSaved_mainQuery();
}
if(Event == 'Download' && p1 == 'mainQuery')
{
onDownload_mainQuery();
}
if(Event == 'EventListRefreshed' && p1 == 'mainQuery')
{
onEventListRefreshed_mainQuery();
}
if(Event == 'ButtonClicked' && p1 == 'mainQuery')
{
onButtonClicked_mainQuery();
}
if(Event == 'EditChanged' && p1 == 'mainQuery')
{
onEditChanged_mainQuery();
}
if(Event == 'UserEvent' && p1 == 'mainQuery')
{
onUserEvent_mainQuery();
}
if(Event == 'Saved' && p1 == 'mainBody')
{
onSaved_mainBody();
}
if(Event == 'Download' && p1 == 'mainBody')
{
onDownload_mainBody();
}
if(Event == 'EventListRefreshed' && p1 == 'mainBody')
{
onEventListRefreshed_mainBody();
}
if(Event == 'ButtonClicked' && p1 == 'mainBody')
{
onButtonClicked_mainBody();
}
if(Event == 'EditChanged' && p1 == 'mainBody')
{
onEditChanged_mainBody();
}
if(Event == 'UserEvent' && p1 == 'mainBody')
{
onUserEvent_mainBody();
}

}
function onBeforeSave(){
AF.mainBody.Validate('') == 0)
'return false;
'return true;

}
function onBeforeClose(){
return true;

}
