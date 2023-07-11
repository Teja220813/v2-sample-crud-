sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,Fragment) {
        "use strict";

        return Controller.extend("zadminportalapp.controller.Root", {
           
            onInit: function() {
              debugger;
                this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                this.oRouter.attachRouteMatched(this.handleRouteMatched, this);
                var ownerComponentObj = this.getOwnerComponent();
                var oJsonData = {
                  "ownerComponent" :ownerComponentObj,
                  "objRoot":this
                }

               
                sap.ui.getCore().setModel(oJsonData,"OwnerModel");
              },
              handleRouteMatched: function(oEvent) {
              
              },
          
          
              navigateToPage: function(oEvent) {
                var sKey = oEvent.getSource().getProperty("key");
               this.loadView(sKey);
            //   this.oRouter.navTo("plant");
              },
              loadView: function(sViewName) {
                debugger;
                var oNavContainer = this.getView().byId("navContainer");
                var oView = oNavContainer.getPage(sViewName);
          
                if (!oView) {
                  oView = sap.ui.xmlview({
                   // id: this.getView().createId(sViewName),
                    viewName: "zadminportalapp.view." + sViewName
                  });
          
                  oNavContainer.addPage(oView);
                }
          
                oNavContainer.to(oView);
              }
          
          
        });
    });
