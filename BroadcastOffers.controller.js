sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/ui/model/json/JSONModel",

  ],
  function (Controller, MessageBox, Dialog, Button, JSONModel) {
    "use strict";

    return Controller.extend("zadminportalapp.controller.BroadcastOffers", {
      onInit() {
        var oWnerComponentModel = sap.ui.getCore().getModel("OwnerModel");
        oWnerComponentModel.ownerComponent.getModel("broadcastoffersModel")
        this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        this.oModel = oWnerComponentModel.ownerComponent.getModel("broadcastoffersModel");
      },
      _onRouteMatched: function (oEvent) {

      },
      onNavBack: function (oEvent) {
        this.oRouter.navTo("Routeplant");
      },

      onRowSelectionChangeType: function (oEvent) {
        this.byId("editButton").setEnabled(true);
        this.byId("deleteButton").setEnabled(true);
        // Get the selected row
        var oSelectedItem = oEvent.getParameter("listItem");
        // Save the selected item's binding context
        this._selectedItemContext = oSelectedItem.getBindingContext("broadcastoffersModel");
      },
      onEditPressType: function () {
        debugger;
        this.byId("confirmCreate").setVisible(false);
        this.byId("confirmSave").setVisible(true);
        this.getView().byId("OpenDialog").open();
        this.byId("id_typeofferandschemes").setValue(this._selectedItemContext).getProperty("typeofofferandscheme");
        this.byId("idregion").setValue(this._selectedItemContext.getProperty("region"));
        this.byId("idzone").setValue(this._selectedItemContext.getProperty("zone"));
        this.byId("iddistrict").setValue(this._selectedItemContext.getProperty("district"));
        this.byId("idbranch").setValue(this._selectedItemContext.getProperty("branch"));
        this.byId("idsubject").setValue(this._selectedItemContext.getProperty("subject"));
        this.byId("iddescription").setValue(this._selectedItemContext.getProperty("Offersschemedescription"));

      },
      onOpenAddDialogType: function () {
        this.byId("confirmCreate").setVisible(true);
        this.byId("confirmSave").setVisible(false);

        this.getView().byId("id_typeofferandschemes").setValue("");
        this.getView().byId("OpenDialog").open();
        this.byId("idregion").setValue("");
        this.byId("idzone").setValue("");
        this.byId("idbranch").setValue("");
        this.byId("idsubject").setValue("");
        this.byId("iddescription").setValue("");

      },
      onCancelDialogType: function (oEvent) {
        oEvent.getSource().getParent().close();
      },
      onCreateType: function (oEvent) {

        var typeofofferandscheme = this.getView().byId("id_typeofferandschemes").getSelectedItem().getKey();
        var Offersschemedescription = this.byId("iddescription").getValue();
        var subject = this.byId("idsubject").getValue();
        var branch = this.byId("idbranch").getValue();
        var zone = this.byId("idzone").getValue();
        var district = this.byId("iddistrict").getValue();
        var region = this.byId("idregion").getValue();
        var dialog_create = oEvent.getSource().getParent();

        var data = {
          "typeofofferandscheme": typeofofferandscheme,
          "Offersschemedescription": Offersschemedescription,
          "subject": subject,
          "branch": branch,
          "zone": zone,
          "district": district,
          "region": region
        };

       
        var odataModel = this.getView().getModel();

        this.oModel.create("/BroadcastOffersAndSchemes", data, {
          success: function (data, response) {
            debugger;
            MessageBox.success("Data successfully created");
            dialog_create.close();

          },
          error: function (error) {
            debugger;
            MessageBox.error("Error while creating the data");
          }
        });

      },
      onSaveType: function (oEvent) {
        debugger;
        var _ID = this._selectedItemContext.getProperty("ID");
        var typeofofferandscheme = this.getView().byId("id_typeofferandschemes").getSelectedItem().getKey();
        var Offersschemedescription = this.byId("iddescription").getValue();
        var subject = this.byId("idsubject").getValue();
        var branch = this.byId("idbranch").getValue();
        var zone = this.byId("idzone").getValue();
        var district = this.byId("id_CustomerDistrict").getValue();
        var region = this.byId("idregion").getValue();
        var dialog_edit = oEvent.getSource().getParent();

        var data = {
          "ID":_ID,
          "typeofofferandscheme": typeofofferandscheme,
          "Offersschemedescription": Offersschemedescription,
          "subject": subject,
          "branch": branch,
          "zone": zone,
          "district": district,
          "region": region
        };

        this.oModel.update("/BroadcastOffersAndSchemes('" + _ID + "')", data, {
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
      onDeleteType: function (oEvent) {
        var _ID = this._selectedItemContext.getProperty("ID");
        var dialog_remove = oEvent.getSource().getParent();
        this.oModel.remove("/BroadcastOffersAndSchemes('" + ID + "')", {
          success: function (data, response) {
            debugger;
            MessageBox.success("Data deleted successfully");
            dialog_remove.close();

          },
          error: function (error) {
            debugger;
            MessageBox.error("Error while deleting the data");
          }
        });
      },
    });
  });
