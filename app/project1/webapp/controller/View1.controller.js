sap.ui.define([
    "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "sap/m/MessageToast",
  "sap/m/MessageBox"
], function (Controller, JSONModel, MessageToast) {
    "use strict";

    return Controller.extend("project1.controller.View1", {
        onInit() {
            this.oModel = this.getOwnerComponent().getModel();
        },

        onSubmit: function () {
            if (this.byId("titleInput").getValue() === '' && this.byId("authorInput").getValue() === '') {
                sap.m.MessageBox.show("Please fill all the details ..!", {
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
                    sap.m.MessageToast.show("Book created successfully!");
                }).catch(function (oError) {

                    sap.m.MessageToast.show("Error creating book.");
                    console.error(oError);
                });
            }

        }
    });
});