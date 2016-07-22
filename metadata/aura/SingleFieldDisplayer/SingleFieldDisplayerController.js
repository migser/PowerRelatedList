({
    doInit : function(component) {
        var record = component.get("v.record");
        var fieldDescribe = component.get("v.fieldDescribe");
        console.log(record);
        console.log(fieldDescribe);
        var output;
        var parts = fieldDescribe.original.split(".");
        console.log(parts);
        if(fieldDescribe.related){
            output = record[parts[0]][parts[1]];
        } else {
	        output = record[fieldDescribe.describe.name];            
        }
        
        console.log(fieldDescribe.original + ":" + output);
        
        component.set("v.simpleOutput", output);
    },
    
    changePicklist: function(component, event){
    	console.log(event.target);
        //answer[answer.selectedIndex].value
        var newValue=event.target[event.target.selectedIndex].value
        console.log(newValue);
        
        var action=component.get("c.updateField");
        var record=component.get("v.record");
        var fieldDescribe=component.get("v.fieldDescribe");
        
        action.setParams({
            "recordId" : record.Id,
            "Field" : fieldDescribe.describe.name,
            "newValue" : newValue
        });
        
        action.setCallback(this, function(a){
            var state = a.getState();
            if (state === "SUCCESS") {
                //update local picklist value?
                component.set("v.simpleOutput", newValue)
            }  else if (state === "ERROR") {
                console.log(a);        	
            }            
        });
        $A.enqueueAction(action);
    },
    
    flipCheckbox: function(component){
        console.log("checkbox flipped");          
        //flip value locally
        
        //update Salesforce
        var action=component.get("c.updateField");
        var record=component.get("v.record");
        var fieldDescribe=component.get("v.fieldDescribe");
        
        action.setParams({
            "recordId" : record.Id,
            "Field" : fieldDescribe.describe.name,
            "newValue" : !component.get("v.simpleOutput")
        });
        
        action.setCallback(this, function(a){
            var state = a.getState();
            if (state === "SUCCESS") {                
                component.set("v.simpleOutput", !component.get("v.simpleOutput"));
            }  else if (state === "ERROR") {
                console.log(a);        	
            }
        });
        $A.enqueueAction(action);
    },
    
    updateRecord: function(component, event){
        
        console.log(event.target.value);
        //    public static void updateField(id recordId, string Field, string newValue){
        
        var action = component.get("c.updateField");
        var record=component.get("v.record");
        var fieldDescribe=component.get("v.fieldDescribe");
        
        console.log("recordId : " + record.Id);
        console.log("fieldName : " + fieldDescribe.describe.name);
        
        action.setParams({
            "recordId" : record.Id,
            "Field" : fieldDescribe.describe.name,
            "newValue" : event.target.value
        });
        
        action.setCallback(this, function(a){
            var state = a.getState();
            if (state === "SUCCESS") {
                console.log(a);
            }  else if (state === "ERROR") {
                console.log(a);        	
            }            
        });
        $A.enqueueAction(action);
    }
})