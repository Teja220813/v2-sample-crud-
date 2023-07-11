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

        return Controller.extend("zadminportalapp.controller.SalesTarget", {
            onInit: function () {
                debugger;
               // this.oModel = this.getOwnerComponent().getModel("salesTargetDataModel");
               var oWnerComponentModel = sap.ui.getCore().getModel("OwnerModel");
               //oWnerComponentModel.ownerComponent.getModel("salesTargetDataModel")
               this.oModel = oWnerComponentModel.ownerComponent.getModel("salesTargetDataModel");

            },
            onRowSelectionChangeSalesTarget: function (oEvent) {
                debugger;
                // Show the edit button
                this.byId("id_std_editButton").setEnabled(true);
                this.byId("id_std_deleteButton").setEnabled(true);
                // Get the selected row
                var oSelectedItem = oEvent.getParameter("listItem");
                // Save the selected item's binding context
                this._selectedItemContext = oSelectedItem.getBindingContext("salesTargetDataModel");
            },

            onEditPressSalesTarget: function () {
                debugger;
                this.byId("id_std_confirmCreate").setVisible(false);
                this.byId("id_std_confirmSave").setVisible(true);
                this.getView().byId("id_std_OpenDialog").open();
				this.byId("id_std_customer").setValue(this._selectedItemContext.getProperty("CustomerID"));
				this.byId("id_std_Uom").setValue(this._selectedItemContext.getProperty("UoM"));
			   this.byId("id_std_Fy").setValue(this._selectedItemContext.getProperty("FY"));
			   this.byId("id_std_April").setValue(this._selectedItemContext.getProperty("April"));
			   this.byId("id_std_May").setValue(this._selectedItemContext.getProperty(" May"));
				this.byId("id_std_June").setValue(this._selectedItemContext.getProperty("June"));
			   this.byId("id_std_JUly").setValue(this._selectedItemContext.getProperty("July"));
			   this.byId("id_std_August").setValue(this._selectedItemContext.getProperty("August"));
           this.byId("id_std_Sept").setValue(this._selectedItemContext.getProperty("September"));
			this.byId("id_std_Oct").setValue(this._selectedItemContext.getProperty("October"));
			this.byId("id_std_Nov").setValue(this._selectedItemContext.getProperty("November"));
			this.byId("id_std_Dec").setValue(this._selectedItemContext.getProperty("December"));
			 this.byId("id_std_JAn").setValue(this._selectedItemContext.getProperty("January"));
			this.byId("id_std_Feb").setValue(this._selectedItemContext.getProperty("February"));
			this.byId("id_std_Mar").setValue(this._selectedItemContext.getProperty("March"));
		},

		onOpenAddDialogSalesTarget: function () {
                this.byId("id_std_confirmCreate").setVisible(true);
                this.byId("id_std_confirmSave").setVisible(false);

                this.getView().byId("id_std_OpenDialog").open();
                this.byId("id_std_customer").setValue("");
                this.byId("id_std_Uom").setValue("");
				this.byId("id_std_Fy").setValue("");
                this.byId("id_std_April").setValue("");
				this.byId("id_std_May").setValue("");
                this.byId("id_std_June").setValue("");
				this.byId("id_std_JUly").setValue("");
                this.byId("id_std_August").setValue("");
				this.byId("id_std_Sept").setValue("");
                this.byId("id_std_Oct").setValue("");
				this.byId("id_std_Nov").setValue("");
                this.byId("id_std_Dec").setValue("");
			    this.byId("id_std_JAn").setValue("");
				this.byId("id_std_Feb").setValue("");
                this.byId("id_std_Mar").setValue("");
            },
            onCancelDialogSalesTarget: function (oEvent) {
                oEvent.getSource().getParent().close();
            },


            onDeleteSalesTarget: function (oEvent) {
                var id = this._selectedItemContext.getProperty("CustomerID");
                this.oModel.remove("/SalesTargetForCustomers('" + id + "')", {
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
            onSaveSalesTarget: function (oEvent) {
                debugger;
               // var CustomerID = this._selectedItemContext.getProperty("CustomerID");
               var CustomerName = this.getById("id_std_customer").getSelectedItem().getValue(); 
               var UoM = this.getView().byId("id_std_Uom").getValue();
				var FY = this.byId("id_std_Fy").getValue();
                var April = this.byId("id_std_April").getValue();
                var May = this.byId("id_std_May").getValue();
				var June = this.byId("id_std_June").getValue();
				var July = this.byId("id_std_JUly").getValue();
                var August = this.byId("id_std_August").getValue();
                var September = this.byId("id_std_Sept").getValue();
				var October = this.byId("id_std_Oct").getValue();
				var November = this.byId("id_std_Nov").getValue();
                var December = this.byId("id_std_Dec").getValue();
                var January = this.byId("id_std_JAn").getValue();
				var February = this.byId("id_std_Feb").getValue();
                var March = this.byId("id_std_Mar").getValue();
                
		     var dialog_stdedit = oEvent.getSource().getParent();
                var data = {
                    "CustomerID": CustomerName,
                    "UoM": UoM,
					"FY":FY,
					"April":April,
					"May":May,
					"June":June,
					"July":July,
					"August":August,
					"September":September,
					"October":October,
					"November":November,
					"December":December,
					"January":January,
					"February":February,
					"March":March
					
					


                };

                this.oModel.update("/SalesTargetForCustomers('" + id + "')", data, {
                    success: function (data, response) {
                        debugger;
                        MessageBox.success("Data updated successfully");
                        dialog_stdedit.close();
                    },
                    error: function (error) {
                        debugger;
                        MessageBox.error("Error while updating the data");
                    }
                });

            },
            onCreateSalesTarget: function () {

                var CustomerID = this.getView().byId("id_std_customer").getValue();
                var UoM = this.byId("id_std_Uom").getValue();
				var FY = this.byId("id_std_Fy").getValue();
				var April= this.byId("id_std_April").getValue();
				var May = this.byId("id_std_May").getValue();
				var June = this.byId("id_std_June").getValue();
				var July = this.byId("id_std_JUly").getValue();
				var August = this.byId("id_std_August").getValue();
				var September = this.byId("id_std_Sept").getValue();
				var October = this.byId("id_std_Oct").getValue();
				var November = this.byId("id_std_Nov").getValue();
				var December = this.byId("id_std_Dec").getValue();
				var January = this.byId("id_std_JAn").getValue();
		        var February = this.byId("id_std_Feb").getValue();
				var March = this.byId("id_std_Mar").getValue();

debugger;

                var data = {
                    "CustomerID": CustomerID,
                    "UoM": UoM,
					"FY":FY,
					"April":April,
					"May":May,
					"June":June,
					"July":July,
					"August":August,
					"September":September,
					"October":October,
					"November":November,
					"December":December,
					"January":January,
					"February":February,
					"March":March

                };
                debugger;
                var odataModel = this.getView().getModel();

                this.oModel.create("/SalesTargetForCustomers", data, {
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
