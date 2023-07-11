sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,MessageBox,Dialog,Button,JSONModel) {
        "use strict";

        return Controller.extend("zadminportalapp.controller.Material", {
            onInit: function () {
                debugger;
                var oWnerComponentModel = sap.ui.getCore().getModel("OwnerModel");
                oWnerComponentModel.ownerComponent.getModel("masterDataModel")
                this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
               // this.oModel = this.getOwnerComponent().getModel();
               // this.oRouter.getRoute("Material").attachPatternMatched(this._onRouteMatched, this);
               // this.oModel = this.getOwnerComponent().getModel("masterDataModel");
                this.oModel = oWnerComponentModel.ownerComponent.getModel("masterDataModel");

         
                

            },
            _onRouteMatched : function(oEvent){

            },
            onNavBack : function(oEvent){
                this.oRouter.navTo("Routeplant");
            },
          
            onRowSelectionChangeMaterial: function(oEvent) {
                debugger;
                // Show the edit button
                this.byId("id_mat_editButton").setEnabled(true);
                this.byId("id_mat_deleteButton").setEnabled(true);
                // Get the selected row
                var oSelectedItem = oEvent.getParameter("listItem");
                // Save the selected item's binding context
                this._selectedItemContext = oSelectedItem.getBindingContext("masterDataModel");
              },
              
              onEditPressMaterial: function() {
                debugger;
                this.byId("id_mat_confirmCreate").setVisible(false);
                this.byId("id_mat_confirmSave").setVisible(true);
                this.getView().byId("id_mat_OpenDialog").open();
                this.byId("id_matID").setValue(this._selectedItemContext.getProperty("MaterialID"));
                 this.byId("id_matdescription").setValue(this._selectedItemContext.getProperty("MaterialDescription"));
                this.byId("id_matDisplayValue").setValue(this._selectedItemContext.getProperty("DisplayValue"));
                this.byId("id_matuom").setValue(this._selectedItemContext.getProperty("UnitOfMeasure"));
                this.byId("id_matunit").setValue(this._selectedItemContext.getProperty("UnitOfMeasure"));
                this.byId("id_mattype").setValue(this._selectedItemContext.getProperty("MaterialType"));
                this.byId("id_matType").setValue(this._selectedItemContext.getProperty("MaterialType"));
               this.byId("id_matGroup").setValue(this._selectedItemContext.getProperty("MaterialGroup"));
               this.byId("id_matgroup").setValue(this._selectedItemContext.getProperty("MaterialGroup"));
                this.byId("id_matActive").setState(this._selectedItemContext.getProperty("Active"));
              },

              onOpenAddDialogMaterial: function () {
                this.byId("id_mat_confirmCreate").setVisible(true);
                this.byId("id_mat_confirmSave").setVisible(false);
                
                  this.getView().byId("id_mat_OpenDialog").open();
                  this.byId("id_matID").setValue("");
                         
                 this.byId("id_matdescription").setValue("");
                  this.byId("id_matDisplayValue").setValue("");
                  this.byId("id_matuom").setValue("");
                  this.byId("id_matunit").setValue("");
                  this.byId("id_matType").setValue("");  
                  this.byId("id_mattype").setValue("");
                   this.byId("id_matGroup").setValue("");
                   this.byId("id_matgroup").setValue(""); 
                   this.byId("id_matActive").setState(false);

               },
               onCancelDialogMaterial: function (oEvent) {
                  oEvent.getSource().getParent().close();
               },
               
               onCreateMaterial : function(oEvent){
                
                var MaterialID = this.byId("id_matID").getValue();
                
                var MaterialDescription = this.byId("id_matdescription").getValue();
                var DisplayValue = this.byId("id_matDisplayValue").getValue();
                var UnitOfMeasure = this.getView().byId("id_matuom").getValue();
                var UnitOfMeasure = this.byId("id_matunit").getValue();
                var MaterialType = this.getView().byId("id_mattype").getValue();
                var MaterialType = this.byId("id_matType").getValue();
                var MaterialGroup = this.getView().byId("id_matGroup").getValue();
                var MaterialGroup = this.byId("id_matgroup").getValue();
                var Active = this.byId("id_matActive").getState();

                var dialog_matedit =  oEvent.getSource().getParent();
                
                
                var data ={
                    "MaterialID" : MaterialID,
                    "MaterialDescription" :MaterialDescription,
                    "DisplayValue" : DisplayValue,
                    "UnitOfMeasure" : UnitOfMeasure,
                    "MaterialType" : MaterialType,
                    "MaterialGroup" : MaterialGroup,
                    "Active" : Active

                };
                debugger;
                var odataModel = this.getView().getModel();
               
               this.oModel.create("/Material", data, {
                    success: function(data, response){
                        debugger;
                        MessageBox.success("Data successfully created");
                        dialog_matedit.close();

                    },
                    error: function(error){
                        debugger;
                        MessageBox.error("Error while creating the data");
                    }
                });

            },
            onSaveMaterial : function(oEvent){
                debugger;
                var MaterialID = this._selectedItemContext.getProperty("MaterialID");
                 
                var MaterialDescription = this.byId("id_matdescription").getValue();
                var DisplayValue = this.byId("id_matDisplayValue").getValue();
                var UnitOfMeasure = this.getView().byId("id_matuom").getValue();
                var UnitOfMeasure = this.byId("id_matunit").getValue();
                var MaterialType = this.getView().byId("id_mattype").getValue();
                var MaterialType = this.byId("id_matType").getValue();
                var MaterialGroup = this.getView().byId("id_matGroup").getValue();
                var MaterialGroup = this.byId("id_matgroup").getValue();
                var Active = this.byId("id_matActive").getState();


                  var dialog_matedit =  oEvent.getSource().getParent();
                  var data ={
                   "MaterialID" : MaterialID,
                    "MaterialDescription" :MaterialDescription,
                   "DisplayValue" : DisplayValue,
                    "UnitOfMeasure" : UnitOfMeasure,
                 "MaterialType" : MaterialType,
                    "MaterialGroup" :MaterialGroup,
                    "Active": Active
                  };

                  
                 
                 
                 this.oModel.update("/Material('"+MaterialID+"')", data, {
                      success: function(data, response){
                          debugger;
                          MessageBox.success("Data updated successfully");
                          dialog_matedit.close();
                      },
                      error: function(error){
                          debugger;
                          MessageBox.error("Error while updating the data");
                      }
                  });
  
               },
               onDeleteMaterial : function(oEvent){
                var MaterialID =this._selectedItemContext.getProperty("MaterialID");
                this.oModel.remove("/Material('"+MaterialID+"')", {
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
        });
    });
