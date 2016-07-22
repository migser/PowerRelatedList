@isTest
private class PowerRelatedListCtrlTest {
	
	@isTest static void testQuery() {
		PowerRelatedListCtrl.query('select id from case');
	}
	
	@isTest static void testDescribe() {
		PowerRelatedListCtrl.describe('Case');
	}
	
    @isTest static void testBadDescribe() {
		PowerRelatedListCtrl.describe('YourMom');
	}
    
	@isTest static void testUpdate() {
		list<case> cases = [select id from Case];
		PowerRelatedListCtrl.updateField(cases[0].Id, 'Subject', 'your software REALLY sucks');
	}
    
    /* Fails in SDOs because of callout trigger / IFTTT app
    @isTest static void testOpptyUpdates() {
		list<opportunity> opptys = [select id from opportunity];
		PowerRelatedListCtrl.updateField(opptys[0].Id, 'Amount', '6.25');
		PowerRelatedListCtrl.updateField(opptys[0].Id, 'Probability', '0.75');        
	}*/
     
    @isTest static void testUpdateCurrency() {
		list<Lead> leads = [select id from Lead];
		PowerRelatedListCtrl.updateField(leads[0].Id, 'AnnualRevenue', '87');
	} 
    
    @isTest static void testUpdateInteger() {
		list<Lead> leads = [select id from Lead];
		PowerRelatedListCtrl.updateField(leads[0].Id, 'NumberOfEmployees', '13');
	}
    
    //public static Schema.DisplayType getFieldType(string objectName, string fieldname){
    @isTest static void testFieldDescribe(){
        PowerRelatedListCtrl.getFieldType('Case', 'Status');
    }
       
	@testSetup static void testSetupCoreObjects() {
        case c = new case();
        c.status = 'New';
        c.Subject = 'your software sucks';
        insert c;
        
        lead l = new lead();
        l.lastname = 'McLaughlin';
        insert l;
        
        account a = new account();
        a.name = 'Pizza King';
        insert a;
        
        /*opportunity o = new opportunity();
        o.name = 'Pizza King Oppty';
        o.AccountId = a.Id;
        o.CloseDate = system.today();
        o.StageName = 'New';
        insert o;*/
    }
}