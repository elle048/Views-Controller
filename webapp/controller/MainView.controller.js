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

        onAddItem: function (){
            // Comment this code for now
            // var oTextBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
            // var sMsg = oTextBundle.getText("addButtonMsg");
            // this.fnDisplayMsg(sMsg);

            // Instantiate the fragment

            // create dialog lazily
            if (!this.oDialog) {
                // By using loadFragment, we are adding the fragment as a dependent to the View
                // By doing so, we can use the functions inside the view's controller
                this.oDialog = this.loadFragment({
                    name: "com.training.day3exer1baranco.fragment.ProductDialog"
                });
            } 
            this.oDialog.then(function(oDialog) {
                oDialog.open();
            });
        },

        onCloseDialog: function (){
            this.getView().byId("idProductDialog").close();
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

         
     onPressCheckout: function (){
        var oInputFName = this.getView().byId("idInptFName");
        var oInputLName = this.getView().byId("idInptLName");
        var oInputFNameValue = oInputFName.getValue();
        var oInputLNameValue = oInputLName.getValue();
        var oRouter = this.getOwnerComponent().getRouter();

        // Check if first name and last name is blank
        if (oInputFNameValue === "" || oInputLNameValue === ""){
           
// set value state to Error
            oInputFName.setValueState("Error");
            oInputLName.setValueState("Error");
        } else {
            oInputFName.setValueState("None");
            oInputLName.setValueState("None");

            //Navigate to review page passing first
            oRouter.navTo("RouteReviewPage", {
                firstName: oInputFNameValue
            });

        }
    },


        

        fnDisplayMsg: function (sMsg) {
            MessageToast.show(sMsg);
        }
    });
});
