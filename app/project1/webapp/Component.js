sap.ui.define([
    "sap/ui/core/UIComponent",
    "project1/model/models",
    "sap/ui/model/odata/v2/ODataModel"
], (UIComponent, models, ODataModel) => {
    "use strict";

    return UIComponent.extend("project1.Component", {
        metadata: {
            manifest: "json",
            interfaces: [
                "sap.ui.core.IAsyncContentCreation"
            ]
        },

        init() {
            // call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);

            // set the device model
            this.setModel(models.createDeviceModel(), "device");
            
            var oModel = new ODataModel("/v2/odata/v4/catalog/");
            this.setModel(oModel);
            // enable routing
            this.getRouter().initialize();
        }
    });
});