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
    function (Controller, MessageBox, Dialog, Button, JSONModel) {
        "use strict";

        return Controller.extend("zadminportalapp.controller.Plant", {
            onInit: function () {
                debugger;

                var oWnerComponentModel = sap.ui.getCore().getModel("OwnerModel");
                this.oModel = oWnerComponentModel.ownerComponent.getModel("masterDataModel");
              
                this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                //   this.oRouter.getRoute("Plant").attachPatternMatched(this._onRouteMatched, this);
                //  this.oModel = this.getOwnerComponent().getModel("masterDataModel");
               
            },
            _onRouteMatched: function (oEvent) {

            },
            onNavBack: function (oEvent) {
                // this.oRouter.navTo("Routeplant");
            },

            onRowSelectionChangePlant: function (oEvent) {
                debugger;
                // Show the edit button
                this.byId("id_plant_editButton").setEnabled(true);
                this.byId("id_plant_deleteButton").setEnabled(true);
                // Get the selected row
                var oSelectedItem = oEvent.getParameter("listItem");
                // Save the selected item's binding context
                this._selectedItemContext = oSelectedItem.getBindingContext("masterDataModel");
            },

            onEditPressPlant: function () {
                debugger;
                this.byId("id_plant_confirmCreate").setVisible(false);
                this.byId("id_plant_confirmSave").setVisible(true);
                this.getView().byId("id_plant_OpenDialog").open();
                this.byId("id_PlantCode").setValue(this._selectedItemContext.getProperty("Code"));
                this.byId("id_Plantdescription").setValue(this._selectedItemContext.getProperty("Description"));
                this.byId("id_PlantShippingPoint").setValue(this._selectedItemContext.getProperty("ShippingPoint"));
                this.byId("id_PlantDisplay").setValue(this._selectedItemContext.getProperty("Display"));
            },

            onOpenAddDialogPlant: function () {
                this.byId("id_plant_confirmCreate").setVisible(true);
                this.byId("id_plant_confirmSave").setVisible(false);

                this.getView().byId("id_plant_OpenDialog").open();
                this.byId("id_PlantCode").setValue("");

                this.byId("id_Plantdescription").setValue("");
                this.byId("id_PlantShippingPoint").setValue("");
                this.byId("id_PlantDisplay").setValue("");
            },
            onCancelDialogPlant: function (oEvent) {
                oEvent.getSource().getParent().close();
            },

            onCreatePlant: function (oEvent) {

                var Code = this.byId("id_PlantCode").getValue();

                var Description = this.byId("id_Plantdescription").getValue();
                var ShippingPoint = this.byId("id_PlantShippingPoint").getValue();
                var Display = this.byId("id_PlantDisplay").getValue();
                var dialog_plantedit = oEvent.getSource().getParent();


                var data = {
                    Code: Code,

                    Description: Description,
                    ShippingPoint: ShippingPoint,
                    Display: Display
                };
                debugger;
               
                
                this.oModel.create("/PlantMasterData", data,  {
                    success: function (data, response) {
                        debugger;
                        MessageBox.success("Data created successfully");
                        dialog_plantedit.close();
                    },
                    error: function (error) {
                        debugger;
                        MessageBox.error("Error while creating the data");
                    }
                });
                 
/*

                // Create a new promise
                var createPromise = new Promise(function (resolve, reject) {
                    // Create a new entity using the OData model
                    oModel.create("/PlantMasterData", data, {
                        success: function (data, response) {
                            // Resolve the promise with the created data
                            resolve({ data: data, response: response });
                        },
                        error: function (error) {
                            // Reject the promise with the error object
                            reject(error);
                        }
                    });
                }.bind(this));

                // Usage of the promise
                createPromise.then(function (result) {
                    // Success callback
                    debugger;
                    MessageBox.success("Data successfully created");
                    dialog_plantedit.close();
                }).catch(function (error) {
                    // Error callback
                    debugger;
                    MessageBox.error("Error while creating the data");
                });
                */
            },

            onSavePlant: function (oEvent) {
                debugger;
                var Code = this._selectedItemContext.getProperty("Code");

                var Description = this.byId("id_Plantdescription").getValue();
                var ShippingPoint = this.byId("id_PlantShippingPoint").getValue();
                var Display = this.byId("id_PlantDisplay").getValue()

                var dialog_plantedit = oEvent.getSource().getParent();
                var data = {
                    "Code": Code,
                    "Description": Description,
                    "ShippingPoint": ShippingPoint,
                    "Display": Display
                };



                this.oModel.update("/PlantMasterData('"+Code+ "')", data, {
                    success: function (data, response) {
                        debugger;
                        MessageBox.success("Data updated successfully");
                        dialog_plantedit.close();
                    },
                    error: function (error) {
                        debugger;
                        MessageBox.error("Error while updating the data");
                    }
                });

            },
            onDeletePlant: function (oEvent) {
                var Code = this._selectedItemContext.getProperty("Code");
                this.oModel.remove("/PlantMasterData('" + Code + "')", {
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
        });
    });
