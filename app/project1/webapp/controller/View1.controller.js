sap.ui.define([
    "sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel", "sap/m/MessageToast", "sap/m/MessageBox"
], function (Controller, JSONModel, MessageToast, MessageBox) {
    "use strict";

    return Controller.extend("project1.controller.View1", {
        onInit() {
            this.oModel = this.getOwnerComponent().getModel();
        },

        onSubmit: function () {
            if (this.byId("titleInput").getValue() === '' && this.byId("authorInput").getValue() === '') {
                MessageBox.show("Please fill all the details ..!", {
                    title: "Warning",
                    icon: sap.m.MessageBox.Icon.WARNING
                })
            } else {
                var oModel = this.getView().getModel();
                var newBook = {
                    ID: Date.now(),
                    title: this.byId("titleInput").getValue(),
                    author: this.byId("authorInput").getValue(),
                    stock: this.byId("stockInput").getValue()
                };
                var oListBinding = oModel.bindList("/Books");
                var oContext = oListBinding.create(newBook);
                oContext.created().then(function () {
                    MessageToast.show("Book created successfully!");
                    this.clearfields();
                }.bind(this)).catch(function (oError) {
                    sap.m.MessageToast.show("Error creating book.");
                    console.error(oError);
                });
            }
        },
        clearfields: function () {
            this.byId("titleInput").setValue("");
            this.byId("authorInput").setValue("");
            this.byId("stockInput").setValue("");
        },
        // onGetData: function () {
        //     // Bind to the "/Books" entity set
        //     const oModel = this.getView().getModel();
        //     const oListBinding = oModel.bindList("/Books");

        //     // Request data from the binding
        //     oListBinding.requestContexts().then((aContexts) => {
        //         // Transform contexts into data
        //         const aBooks = aContexts.map((oContext) => oContext.getObject());

        //         // Set the data to a local JSON model
        //         const oJSONModel = new JSONModel({ results: aBooks });
        //         this.getView().setModel(oJSONModel, "books");

        //         MessageToast.show("Data fetched successfully!");
        //     }).catch((oError) => {
        //         MessageBox.error("Failed to fetch data.");
        //         console.error(oError);
        //     });
        // }
        onGetData:function(){
            var oModel = this.getView().getModel();
            oModel.read("/Books",{
                    success:function(){
                        sap.m.MessageBox.show("Data fetched successfully");
                    },
                    error:function(){
                        sap.m.MessageBox.show("Error Data fetching ");
                    }
                })
          
            }
    });
});
