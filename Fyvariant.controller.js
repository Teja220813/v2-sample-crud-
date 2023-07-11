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

        return Controller.extend("zadminportalapp.controller.Fyvariant", {
          onInit: function () {
            debugger;
            var oWnerComponentModel = sap.ui.getCore().getModel("OwnerModel");
            oWnerComponentModel.ownerComponent.getModel("fyvariantModel")
            this.oModel = oWnerComponentModel.ownerComponent.getModel("fyvariantModel");
           // this.oModel = this.getOwnerComponent().getModel("fyvariantModel");
           },
           onRowSelectionChangeType: function(oEvent) {
                debugger;
                // Show the edit button
                this.byId("editButton").setEnabled(true);
                this.byId("deleteButton").setEnabled(true);
                // Get the selected row
                var oSelectedItem = oEvent.getParameter("listItem");
                // Save the selected item's binding context
                this._selectedItemContext = oSelectedItem.getBindingContext("fyvariantModel");
              },
         
              onEditPressType: function() {
                debugger;
                this.byId("confirmCreate").setVisible(false);
                this.byId("confirmSave").setVisible(true);
                this.getView().byId("OpenDialog").open();
                this.byId("iddescription").setValue(this._selectedItemContext.getProperty("Description"));
                this.byId("idActive").setState(this._selectedItemContext.getProperty("Active"));
              },
            
            
              onOpenAddDialogType: function () {
              this.byId("confirmCreate").setVisible(true);
              this.byId("confirmSave").setVisible(false);
              
                this.getView().byId("OpenDialog").open();
                this.byId("iddescription").setValue("");
                this.byId("idActive").setState(false);
             },
             onCancelDialogType: function (oEvent) {
                oEvent.getSource().getParent().close();
             },


             onDeleteType : function(oEvent){
              var id=this._selectedItemContext.getProperty("ID");
              this.oModel.remove("/FYVariant(guid'"+id+"')", {
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
                var id=this._selectedItemContext.getProperty("ID");
                var Active = this.byId("idActive").getState();
                var Description = this.byId("iddescription").getValue();
                var data ={
                    "ID":id,
                    "IsActive" : Active,
                    "Description" :Description
                };
                
               this.oModel.update("/FYVariant(guid'"+id+"')", data, {
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
             onCreateType : function(){
                
               
                var Active = this.byId("idActive").getState();
                var Description = this.byId("iddescription").getValue();
               
                var data ={
                    
                    IsActive : Active,
                    Description :Description
                    
                };
                debugger;
                var odataModel = this.getView().getModel();
               
               this.oModel.create("/FYVariant", data, {
                    success: function(data, response){
                        debugger;
                        MessageBox.success("Data successfully created");
                    },
                    error: function(error){
                        debugger;
                        MessageBox.error("Error while creating the data");
                    }
                });

            },
            onCreateValue:function(oEvent){
                debugger;
                var Month = this.byId("id_month").getValue();
                var FYVariant = this.getView().byId("id_fy_variant").getSelectedItem().getKey();
                // var  = this.getView().byId("id_fy_variant").getSelectedItem().getText();
                var CalendarMonthNumber = this.byId("id_calendarmonth").getValue();
                var CalendarQuarterNumber = this.byId("id_quartermonth").getValue();
                var FYMonthNumber = this.byId("id_fycalendarmonth").getValue();
                var FYQuarterNumber = this.byId("id_fyquartermonth").getValue();
                
                var dialog_edit =  oEvent.getSource().getParent();
                var data ={

                    Month : IsoCode,
                    FYVariant : FYVariant,
                    ltypeName: ltypeName,
                    CalendarMonthNumber : CalendarMonthNumber,
                    CalendarQuarterNumber :CalendarQuarterNumber,
                    FYMonthNumber : FYMonthNumber,
                    FYQuarterNumber : FYQuarterNumber

                };
                debugger;
                var odataModel = this.getView().getModel();
               
               this.oModel.create("/Month", data, {
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
                  this.byId("id_month").setValue("");
                  this.byId("id_fy_variant").setValue("");
                  this.byId("id_calendarmonth").setValue("");
                  this.byId("id_quartermonth").setState(false);
                  this.byId("id_fycalendarmonth").setValue("");
                  this.byId("id_fyquartermonth").setValue("");
               },
               onCancelDialogValue: function (oEvent) {
                  oEvent.getSource().getParent().close();
               },
               onSaveValue:function(oEvent){
                debugger;
                var id=this._selectedItemContext.getProperty("ID");
                var MonthName = this.byId("id_month").getValue();
                var FYVariant = this.getView().byId("id_fy_variant").getSelectedItem().getKey();
                var CalendarMonthNumber = this.byId("id_calendarmonth").getValue();
                var CalendarQuarterNumber = this.byId("id_quartermonth").getValue();
                var FYMonthNumber = this.byId("id_fycalendarmonth").getValue();
                var FYQuarterNumber = this.byId("id_fyquartermonth").getValue();
                var dialog_edit =  oEvent.getSource().getParent();
                var data ={
                      "ID":id,
                      "MonthName" : MonthName,
                      "CalendarMonthNumber" : CalendarMonthNumber,
                      "FYMonthNumber" : FYMonthNumber,
                      "CalendarQuarterNumber" :CalendarQuarterNumber,
                      "FYQuarterNumber" : FYQuarterNumber,
                  };
                  
                 
                 
                 this.oModel.update("/Month(guid'"+id+"')", data, {
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
                var id=this._selectedItemContext.getProperty("ID");
                this.oModel.remove("/Month(guid'"+id+"')", {
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
                this._selectedItemContext = oSelectedItem.getBindingContext("monthModel");
              },
              onEditPressValue :function() {
                debugger;
                this.byId("id_confirmCreate").setVisible(false);
                this.byId("id_confirmSave").setVisible(true);
                this.getView().byId("id_OpenDialog").open();
                this.byId("id_month").setValue(this._selectedItemContext.getProperty("Month"));
                this.byId("id_calendarmonth").setValue(this._selectedItemContext.getProperty("CalendarMonthNumber"));
                this.byId("id_quartermonth").setValue(this._selectedItemContext.getProperty("CalendarQuarterNumber"));
                this.byId("id_fycalendarmonth").setValue(this._selectedItemContext.getProperty("FYMonthNumber"));
                this.byId("id_fyquartermonth").setValue(this._selectedItemContext.getProperty("FYQuarterNumber"));
              },
        });
        
    });
