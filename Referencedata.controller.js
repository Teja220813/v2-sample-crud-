sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/m/Dialog",
    "sap/m/Button"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,MessageBox,Dialog,Button) {
        "use strict";

        return Controller.extend("zadminportalapp.controller.Referencedata", {
          onInit: function () {
            debugger;
            var oWnerComponentModel = sap.ui.getCore().getModel("OwnerModel");
            this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
             //   this.oModel = this.getOwnerComponent().getModel();
             //   this.oRouter.getRoute("Referencedata").attachPatternMatched(this._onRouteMatched, this);
           // this.oModel = this.getOwnerComponent().getModel("referenceModel");
           this.oModel = oWnerComponentModel.ownerComponent.getModel("referenceModel");
            

           },
           _onRouteMatched : function(oEvent){

           },
           onNavBack : function(oEvent){
              this.oRouter.navTo("Routeplant");
           },

           onRowSelectionChangeType: function(oEvent) {
                debugger;
                // Show the edit button
                this.byId("editButton").setEnabled(true);
                this.byId("deleteButton").setEnabled(true);
                // Get the selected row
                var oSelectedItem = oEvent.getParameter("listItem");
                // Save the selected item's binding context
                this._selectedItemContext = oSelectedItem.getBindingContext("referenceModel");
              },
         
              onEditPressType: function() {
                debugger;
                this.byId("confirmCreate").setVisible(false);
                this.byId("confirmSave").setVisible(true);
                this.getView().byId("OpenDialog").open();
                this.byId("idname").setValue(this._selectedItemContext.getProperty("Name"));
                this.byId("idActive").setState(this._selectedItemContext.getProperty("Active"));
                this.byId("iddescription").setValue(this._selectedItemContext.getProperty("Description"));
                this.byId("idcategory").setValue(this._selectedItemContext.getProperty("Category"));
              },
            
            
              onOpenAddDialogType: function () {
              this.byId("confirmCreate").setVisible(true);
              this.byId("confirmSave").setVisible(false);
              
                this.getView().byId("OpenDialog").open();
                this.byId("idname").setValue("");
                this.byId("idActive").setState(false);
                this.byId("iddescription").setValue("");
                this.byId("idcategory").setValue("");
             },
             onCancelDialogType: function (oEvent) {
                oEvent.getSource().getParent().close();
             },


             onDeleteType : function(oEvent){
              var id=this._selectedItemContext.getProperty("lovTypeID");
              this.oModel.remove("/lovType(guid'"+id+"')", {
                success: function(data, response){
                    debugger;
                    MessageBox.success("Data deleted successfully");
                    
                },
                error: function(error){
                    debugger;
                    MessageBox.error("Error while deleting the data");
                }
            });
             },
             onSaveType : function(oEvent){
              debugger;
              var id=this._selectedItemContext.getProperty("lovTypeID");
                var Name = this.getView().byId("idname").getValue();
                var Active = this.byId("idActive").getState();
                var Description = this.byId("iddescription").getValue();
                var Category = this.byId("idcategory").getValue();
                var dialog_edit =  oEvent.getSource().getParent();
                var data ={
                  "lovTypeID":id,
                    "Name" : Name,
                    "Active" : Active,
                    "Description" :Description,
                    "Category" : Category
                };
                
               
               
               this.oModel.update("/lovType(guid'"+id+"')", data, {
                    success: function(data, response){
                        debugger;
                        MessageBox.success("Data updated successfully");
                        dialog_edit.close();
                    },
                    error: function(error){
                        debugger;
                        MessageBox.error("Error while updating the data");
                    }
                });

             },
             onCreateType : function(oEvent){
                
                var Name = this.getView().byId("idname").getValue();
                var Active = this.byId("idActive").getState();
                var Description = this.byId("iddescription").getValue();
                var Category = this.byId("idcategory").getValue();
                var dialogtype_edit =  oEvent.getSource().getParent();
                var data ={
                    "Name" : Name,
                    "Active" : Active,
                    "Description" :Description,
                    "Category" : Category
                };
                debugger;
                var odataModel = this.getView().getModel();
               
               this.oModel.create("/lovType", data, {
                    success: function(data, response){
                        debugger;
                        MessageBox.success("Data successfully created");
                        dialogtype_edit.close();
                    },
                    error: function(error){
                        debugger;
                        MessageBox.error("Error while creating the data");
                    }
                });

            },
            onCreateValue:function(oEvent){
                debugger;
                var IsoCode = this.byId("id_ISoCode").getValue();
                var ltypeKey = this.getView().byId("id_Cb_name").getSelectedItem().getKey();
                var ltypeName = this.getView().byId("id_Cb_name").getSelectedItem().getText();
                var Active = this.byId("id_Active").getState();
                var Description = this.byId("id_description").getValue();
                var SystemId = this.byId("id_Sysid").getValue();
                var Datatype = this.getView().byId("id_Cb_datatype").getValue();
                var dialog_edit =  oEvent.getSource().getParent();
                var data ={
                    "Isocode" : IsoCode,
                    "lovType" : {lovTypeID:ltypeKey},
                    "ltypeName": ltypeName,
                    "Active" : Active,
                    "Description" :Description,
                    "SystemId" : SystemId,
                    "Datatype" : Datatype

                };
                debugger;
                var odataModel = this.getView().getModel();
               
               this.oModel.create("/lovValue", data, {
                    success: function(data, response){
                        debugger;
                        MessageBox.success("Data successfully created");
                        dialog_edit.close();
                    },
                    error: function(error){
                        debugger;
                        MessageBox.error("Error while creating the data");
                    }
                });

            },
            onOpenAddDialogValue: function () {
                this.byId("id_confirmCreate").setVisible(true);
                this.byId("id_confirmSave").setVisible(false);
                
                  this.getView().byId("id_OpenDialog").open();
                  this.byId("id_ISoCode").setValue("");
                  this.byId("id_Cb_name").setValue("");
                  this.byId("id_Sysid").setValue("");
                  this.byId("id_Active").setState(false);
                  this.byId("id_description").setValue("");
                  this.byId("id_Cb_datatype").setValue("");
               },
               onCancelDialogValue: function (oEvent) {
                  oEvent.getSource().getParent().close();
               },
               onSaveValue:function(oEvent){
                debugger;
                var id=this._selectedItemContext.getProperty("lovValueID");
                var Isocode = this.byId("id_ISoCode").getValue();
                  var ltype = this.getView().byId("id_Cb_name").getValue();
                  var Active = this.byId("id_Active").getState();
                  var Description = this.byId("id_description").getValue();
                  var SystemId = this.byId("id_Sysid").getValue();
                  var Datatype = this.getView().byId("id_Cb_datatype").getValue();
                  var dialog_edit =  oEvent.getSource().getParent();
                  var data ={
                    "lovValueID":id,
                      "Isocode" : Isocode,
                      "ltypeName" : ltype,
                      "Active" : Active,
                      "Description" :Description,
                      "SystemId" : SystemId,
                      "Datatype" : Datatype
                   
                  };
                  
                 
                 
                 this.oModel.update("/lovValue(guid'"+id+"')", data, {
                      success: function(data, response){
                          debugger;
                          MessageBox.success("Data updated successfully");
                          dialog_edit.close();
                      },
                      error: function(error){
                          debugger;
                          MessageBox.error("Error while updating the data");
                      }
                  });
  
               },
               onDeleteValue : function(oEvent){
                var id=this._selectedItemContext.getProperty("lovValueID");
                this.oModel.remove("/lovValue(guid'"+id+"')", {
                  success: function(data, response){
                      debugger;
                      MessageBox.success("Data deleted successfully");
                      
                  },
                  error: function(error){
                      debugger;
                      MessageBox.error("Error while deleting the data");
                  }
              });
               },
               onRowSelectionChangeValue : function(oEvent) {
                debugger;
                // Show the edit button
                this.byId("id_edit").setEnabled(true);
                this.byId("id_delete").setEnabled(true);
                // Get the selected row
                var oSelectedItem = oEvent.getParameter("listItem");
                // Save the selected item's binding context
                this._selectedItemContext = oSelectedItem.getBindingContext("referenceModel");
              },
              onEditPressValue :function() {
                debugger;
                this.byId("id_confirmCreate").setVisible(false);
                this.byId("id_confirmSave").setVisible(true);
                this.getView().byId("id_OpenDialog").open();
                this.byId("id_ISoCode").setValue(this._selectedItemContext.getProperty("Isocode"));
                this.byId("id_Cb_name").setValue(this._selectedItemContext.getProperty("ltypeName"));
                this.byId("id_Sysid").setValue(this._selectedItemContext.getProperty("SystemId"));
                this.byId("id_Active").setState(this._selectedItemContext.getProperty("Active"));
                this.byId("id_description").setValue(this._selectedItemContext.getProperty("Description"));
                this.byId("id_Cb_datatype").setValue(this._selectedItemContext.getProperty("Datatype"));
              },
        });
        
    });
