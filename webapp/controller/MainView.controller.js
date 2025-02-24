sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], 
/**
 * @param {typeof sap.ui.core.mvc.Controller} Controller
 */
function (Controller, MessageToast) {
    return Controller.extend("com.training.day3exer1baranco.controller.MainView", {
        onInit() {
            // Initialization code
        },

        onAddItem: function () {
            var oTextBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
            var sMsg = oTextBundle.getText("addButtonMsg");
            this.fnDisplayMsg(sMsg);
        },

        onChangeMOP: function (oEvent) {
            var sSelectedKey = oEvent.getParameter("selectedItem").getProperty("key");
            var oMobileLabel = this.getView().byId("idLblPhone");
            var oMobileInput = this.getView().byId("idInputPhone");
            var oCardLabel = this.getView().byId("idLblCard");
            var oCardInput = this.getView().byId("idInptCard");

            // Show MessageToast with selected mode of payment
            var oTextBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
            var sModeOfPayment = oTextBundle.getText(sSelectedKey.toLowerCase() + "Itm");
            MessageToast.show(sModeOfPayment);

            if (sSelectedKey === "GCASH") {
                // Show the mobile field
                oMobileLabel.setVisible(true);
                oMobileInput.setVisible(true);
                oCardLabel.setVisible(false);
                oCardInput.setVisible(false);
            } else if (sSelectedKey === "CC") {
                // Show credit card field
                oCardLabel.setVisible(true);
                oCardInput.setVisible(true);
                oMobileLabel.setVisible(false);
                oMobileInput.setVisible(false);
            } else {
                // Hide both
                oMobileLabel.setVisible(false);
                oMobileInput.setVisible(false);
                oCardLabel.setVisible(false);
                oCardInput.setVisible(false);
            }
        },

        onPressCheckout: function () {
            var oInputFNameValue = this.getView().byId("idInptFName").getValue();
            var oInputLNameValue = this.getView().byId("idInptLName").getValue();

            // Check if first name or last name is blank
            if (oInputFNameValue === "" || oInputLNameValue === "") {
                sap.m.MessageToast.show("Personal details are required.");
            }
        },

        fnDisplayMsg: function (sMsg) {
            MessageToast.show(sMsg);
        }
    });
});
