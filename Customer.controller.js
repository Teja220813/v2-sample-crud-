sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/m/MessageBox",
        "sap/m/Dialog",
        "sap/m/Button",
        "sap/ui/model/json/JSONModel"
    ],
    function(Controller,MessageBox,Dialog,Button,JSONModel) {
      "use strict";
  
      return Controller.extend("zadminportalapp.controller.Customer", {
        onInit() {
          var oWnerComponentModel = sap.ui.getCore().getModel("OwnerModel");
                oWnerComponentModel.ownerComponent.getModel("masterDataModel")
          this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
              //  this.oModel = this.getOwnerComponent().getModel();
               //this.oRouter.getRoute("Customer").attachPatternMatched(this._onRouteMatched, this);
                //this.oModel = this.getOwnerComponent().getModel("masterDataModel");
              this.oModel = oWnerComponentModel.ownerComponent.getModel("masterDataModel");

         /*
         // Branch filter code
          var oBranchFilters = [];
          var branchFilter = new sap.ui.model.Filter({
              path: "LovType",
              operator: sap.ui.model.FilterOperator.EQ,
              value1: "Branch"
            });
            oBranchFilters.push(branchFilter);
          this.getModelData(this.oModel, "/LovValue",oBranchFilters,"BranchModel");
         
          //Region Filter
          var oRegionFilters = [];
          var regionFilter = new sap.ui.model.Filter({
              path: "LovType",
              operator: sap.ui.model.FilterOperator.EQ,
              value1: "Region"
            });
            oRegionFilters.push(regionFilter);
          this.getModelData(this.oModel, "/LovValue",oRegionFilters,"RegionModel");

        //path:{"BranchModel>/"}

       //Zone Filter
       var oZoneFilters = [];
          var zoneFilter = new sap.ui.model.Filter({
              path: "LovType",
              operator: sap.ui.model.FilterOperator.EQ,
              value1: "Zone"
            });
            oZoneFilters.push(zoneFilter);
          this.getModelData(this.oModel, "/LovValue",oZoneFilters,"ZoneModel");


          //District Filter
          var oDistrictFilters = [];
          var districtFilter = new sap.ui.model.Filter({
              path: "LovType",
              operator: sap.ui.model.FilterOperator.EQ,
              value1: "District"
            });
            oDistrictFilters.push(districtFilter);
          this.getModelData(this.oModel, "/LovValue",oDistrictFilters,"DistrictModel");

          
*/

       


        },
        _onRouteMatched : function(oEvent){

        },
        onNavBack : function(oEvent){
            this.oRouter.navTo("Routeplant");
        },
       /* getModelData : function(oModel,oPath,oFilters,targetModelName){
          var t = this;
          oModel.read(oPath,{
            filters : oFilters,
            success : function(data,response){
              var localModel = new JSON(data.results);
              t.getView().getModel(localModel,targetModelName);
            },
            error : function(oError){} 
          });

          

        },*/
        onRowSelectionChangecustomer:  function(oEvent) {
            debugger;
            // Show the edit button
            this.byId("id_cust_editButton").setEnabled(true);
            this.byId("id_cust_deleteButton").setEnabled(true);
            // Get the selected row
            var oSelectedItem = oEvent.getParameter("listItem");
            // Save the selected item's binding context
            this._selectedItemContext = oSelectedItem.getBindingContext("masterDataModel");
          },
          onEditPressCustomer: function() {
            debugger;
            this.byId("id_cust_confirmCreate").setVisible(false);
            this.byId("id_cust_confirmSave").setVisible(true);
            this.getView().byId("id_cust_OpenDialog").open();
            this.byId("id_CustomerCode").setValue(this._selectedItemContext.getProperty("Customer"));
             this.byId("id_CustomerName").setValue(this._selectedItemContext.getProperty("Name"));
            this.byId("id_CustomerSalesOfficer").setValue(this._selectedItemContext.getProperty("SalesOfficer"));
            this.byId("id_CustomerAddress").setValue(this._selectedItemContext.getProperty("Address"));
            this.byId("id_CustomerBranch").setValue(this._selectedItemContext.getProperty("Branch"));
             this.byId("id_CustomerZone").setValue(this._selectedItemContext.getProperty("Zone"));
            this.byId("id_CustomerDistrict").setValue(this._selectedItemContext.getProperty("District"));
            this.byId("id_CustomerRegion").setValue(this._selectedItemContext.getProperty("Region"));
          },
          onOpenAddDialogCustomer: function () {
            this.byId("id_cust_confirmCreate").setVisible(true);
            this.byId("id_cust_confirmSave").setVisible(false);
            
              this.getView().byId("id_cust_OpenDialog").open();
              this.byId("id_CustomerCode").setValue("");
                     
             this.byId("id_CustomerName").setValue("");
              this.getView().byId("id_CustomerSalesOfficer").setValue("");
              this.byId("id_CustomerAddress").setValue("");
              this.getView().byId("id_CustomerBranch").setValue("");
                     
             this.getView().byId("id_CustomerZone").setValue("");
              this.getView().byId("id_CustomerDistrict").setValue("");
              this.getView().byId("id_CustomerRegion").setValue("");
           },
           onCancelDialogCustomer: function (oEvent) {
              oEvent.getSource().getParent().close();
           },
           onCreateCustomer : function(oEvent){
                
            var Customer = this.byId("id_CustomerCode").getValue();
            
            var Name = this.byId("id_CustomerName").getValue();
           // var SalesOfficer = this.getView().byId("id_CustomerSalesOfficer").getValue();
            var StypeKey = this.getView().byId("id_CustomerSalesOfficer").getSelectedItem().getKey();
            var Stypename  = this.getView().byId("id_CustomerSalesOfficer").getValue();
            var Branch = this.getView().byId("id_CustomerBranch").getValue();
            var Zone = this.getView().byId("id_CustomerZone").getValue();
            var District = this.getView().byId("id_CustomerDistrict").getValue();
            var Region = this.getView().byId("id_CustomerRegion").getValue();

            var Address = this.getView().byId("id_CustomerAddress").getValue();
            var dialog_customeredit =  oEvent.getSource().getParent();
            
            
            var data ={
              "Customer" : Customer,
              "Name":Name,
              "SalesOfficer" :{"SalesOfficerID":StypeKey},
              "Stypename" : Stypename,
              "Branch" : Branch,
              "Zone" : Zone,
              "District":District,
              "Region":Region,
              "Address":Address
            };
            debugger;
            var odataModel = this.getView().getModel();
           
           this.oModel.create("/CustomerMasterData", data, {
                success: function(data, response){
                    debugger;
                    MessageBox.success("Data successfully created");
                    dialog_customeredit.close();

                },
                error: function(error){
                    debugger;
                    MessageBox.error("Error while creating the data");
                }
            });

        },
        onSaveCustomer : function(oEvent){
          debugger;
          var Customer = this._selectedItemContext.getProperty("Customer");
           
            var Name = this.byId("id_CustomerName").getValue();
            var StypeKey = this.getView().byId("id_CustomerSalesOfficer").getSelectedItem().getKey();
            var Stypename  = this.getView().byId("id_CustomerSalesOfficer").getValue();
            var Branch = this.getView().byId("id_CustomerBranch").getValue();
            var Zone = this.getView().byId("id_CustomerZone").getValue();
            var District = this.getView().byId("id_CustomerDistrict").getValue();
            var Region = this.getView().byId("id_CustomerRegion").getValue();
            var Address = this.getView().byId("id_CustomerAddress").getValue()

            var dialog_customeredit =  oEvent.getSource().getParent();
            var data ={
              "Customer":Customer,
             "Name" :Name,
             "SalesOfficer" : {"SalesOfficerID":StypeKey},
             "Stypename" : Stypename,
                "Branch" : Branch,
                "Zone" : Zone,
                "District" : District,
                "Region" : Region,
                "Address" : Address


            };
            
           
           
           this.oModel.update("/CustomerMasterData('"+Customer+"')", data, {
                success: function(data, response){
                    debugger;
                    MessageBox.success("Data updated successfully");
                    dialog_customeredit.close();
                },
                error: function(error){
                    debugger;
                    MessageBox.error("Error while updating the data");
                }
            });

         },
         onDeleteCustomer : function(oEvent){
          var Customer =this._selectedItemContext.getProperty("Customer");
          this.oModel.remove("/CustomerMasterData('"+Customer+"')", {
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
  