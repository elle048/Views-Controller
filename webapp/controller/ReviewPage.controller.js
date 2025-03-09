sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/routing/History",
    "sap/m/MessageBox"
],
function (Controller, MessageToast, History, MessageBox) {
    "use strict";

    return Controller.extend("com.training.day3exer1baranco.controller.ReviewPage", {
        onInit: function () {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("RouteReviewPage").attachPatternMatched(this._onObjectMatched, this);
        },

        _onObjectMatched: function (oEvent) {
            var aArgs = oEvent.getParameter("arguments");
            
            if (aArgs && aArgs.firstName) {
                MessageToast.show(aArgs.firstName);
            } else {
                console.warn("No firstName parameter received in routing.");
            }
        },

        onPressPromo: function () {
            var oResourceBundle = this.getView().getModel("i18n")?.getResourceBundle();
            if (!oResourceBundle) {
                console.error("i18n Resource Bundle not found");
                return;
            }

            MessageBox.information(oResourceBundle.getText("promodescription"), {
                title: oResourceBundle.getText("promoDialogTitle"),
                actions: [MessageBox.Action.CLOSE]
            });
        },

        onPressBack: function () {
            var oHistory = History.getInstance();
            var sPreviousHash = oHistory.getPreviousHash();
            var oRouter = this.getOwnerComponent().getRouter();
            var oResourceBundle = this.getView().getModel("i18n")?.getResourceBundle();

            if (!oResourceBundle) {
                console.error("i18n Resource Bundle not found");
                return;
            }

            MessageBox.confirm(oResourceBundle.getText("backdescription"), {
                title: oResourceBundle.getText("backDialogTitle"),
                actions: [MessageBox.Action.YES, MessageBox.Action.NO],
                emphasizedAction: MessageBox.Action.YES,
                onClose: function (oAction) {
                    if (oAction === MessageBox.Action.YES) {
                        if (sPreviousHash !== undefined) {
                            window.history.go(-1);
                        } else {
                            oRouter.navTo("RouteMainView", {}, true);
                        }
                    }
                }
            });
        }
    });
});
