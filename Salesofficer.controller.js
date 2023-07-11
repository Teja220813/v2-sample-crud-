sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/m/Dialog",
    "sap/m/Button"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageBox, Dialog, Button) {
        "use strict";

        return Controller.extend("zadminportalapp.controller.Salesofficer", {
            onInit: function () {
                debugger;
               // this.oModel = this.getOwnerComponent().getModel("salesofficerModel");
               var oWnerComponentModel = sap.ui.getCore().getModel("OwnerModel");
               //oWnerComponentModel.ownerComponent.getModel("salesofficerModel")
               this.oModel = oWnerComponentModel.ownerComponent.getModel("salesofficerModel");

            },
            onRowSelectionChangeType: function (oEvent) {
                debugger;
                // Show the edit button
                this.byId("editButton").setEnabled(true);
                this.byId("deleteButton").setEnabled(true);
                // Get the selected row
                var oSelectedItem = oEvent.getParameter("listItem");
                // Save the selected item's binding context
                this._selectedItemContext = oSelectedItem.getBindingContext("salesOfficerModel");
            },

            onEditPressType: function () {
                debugger;
                this.byId("confirmCreate").setVisible(false);
                this.byId("confirmSave").setVisible(true);
                this.getView().byId("OpenDialog").open();
                this.byId("idsaleofficer").setValue(this._selectedItemContext.getProperty("SalesOfficerID"));
                this.byId("idname").setValue(this._selectedItemContext.getProperty("Name"));
            },


            onOpenAddDialogType: function () {
                this.byId("confirmCreate").setVisible(true);
                this.byId("confirmSave").setVisible(false);

                this.getView().byId("OpenDialog").open();
                this.byId("idsalesofficer").setValue("");
                this.byId("idname").setValue("");
            },
            onCancelDialogType: function (oEvent) {
                oEvent.getSource().getParent().close();
            },


            onDeleteType: function (oEvent) {
                var id = this._selectedItemContext.getProperty("SalesOfficerID");
                this.oModel.remove("/SalesOfficer(guid'" + id + "')", {
                    success: function (data, response) {
                        debugger;
                        MessageBox.success("Data deleted successfully");

                    },
                    error: function (error) {
                        debugger;
                        MessageBox.error("Error while deleting the data");
                    }
                });
            },
            onSaveType: function (oEvent) {
                debugger;
                var id = this._selectedItemContext.getProperty("SalesOfficerID");
                var Name = this.getView().byId("idname").getValue();
                var dialog_edit = oEvent.getSource().getParent();
                var data = {
                    "SalesOfficerID": id,
                    "SalesofficerName": Name,
                };

                this.oModel.update("/SalesOfficer(guid'" + id + "')", data, {
                    success: function (data, response) {
                        debugger;
                        MessageBox.success("Data updated successfully");
                        dialog_edit.close();
                    },
                    error: function (error) {
                        debugger;
                        MessageBox.error("Error while updating the data");
                    }
                });

            },
            onCreateType: function () {

                var Name = this.getView().byId("idname").getValue();
                var id = this.byId("idsalesofficer").getValue();

                var data = {
                    SalesofficerName: Name,
                    SalesOfficerID: id,

                };
                debugger;
                var odataModel = this.getView().getModel();

                this.oModel.create("/SalesOfficer", data, {
                    success: function (data, response) {
                        debugger;
                        MessageBox.success("Data successfully created");
                    },
                    error: function (error) {
                        debugger;
                        MessageBox.error("Error while creating the data");
                    }
                });

            },
        });

    });
