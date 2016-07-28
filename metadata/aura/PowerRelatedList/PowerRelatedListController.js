({
	doInit : function(component, event, helper) {
		//TODO: do a cleanup on displayFields parameter to make sure it's not invalid (commas, spaces, etc)
		
		//build the query
        //MODIFICACION MIGUEL: PARENT ID distinto a record ID
		
     /*   if (component.get("v.parentId")) {
            helper.getParent(component,component.get("v.parentId"), component.get("v.sObjectName"),component.get("v.recordId") )
           
        } else {
            component.set("v.parentId_val", component.get("v.recordId"))
        
        
        // MODIFICACION MIGUEL: Filtro Custom!
		
        if (component.get("v.filter")) {
        	var filtro = " and "+component.get("v.filter")    
            } else {
            var filtro = ""    
            }
        
        
		var soql = "select Id, " + component.get("v.displayFields") + " from " + component.get("v.objectName") + " where " + component.get("v.lookupField") + " = '" + component.get("v.parentId_val") + "'" + filtro;		
		*/
        var soql = "select Id, " + component.get("v.displayFields") + " from " + component.get("v.objectName") + " where " + component.get("v.lookupField") + " = '";		
        console.log(soql);
		//get the describe
		helper.query(component, soql,component.get("v.parentId"), component.get("v.sObjectName"),component.get("v.recordId"),component.get("v.filter")); 
       // }
		helper.describe(component, component.get("v.objectName")); 
	},
    

	navToRecord : function(component, event){
    	console.log("nav invoked, get id first");

    	console.log(event.target);
    	console.log("EL ID ES:");
    	var recordId = event.target.id;
    	console.log(recordId);
    	console.log("Invocando acción...");
    	var navEvt = $A.get("e.force:navigateToSObject");
	    navEvt.setParams({
	      "recordId": recordId
	    });
	    navEvt.fire();
    },

    createRecord : function (component) {
	    var createRecordEvent = $A.get("e.force:createRecord");
	    createRecordEvent.setParams({
	        "entityApiName": component.get("v.objectName")
	    });
	    createRecordEvent.fire();
	}
})