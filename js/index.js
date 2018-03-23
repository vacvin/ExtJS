Ext.onReady(function() {
	Ext.application({
		name: 'AM',
		appFolder: 'app',
		launch: function() {
			appInit();
		}
	});
})

appInit = function(){
	Ext.define('Employees', {
	    extend: 'Ext.data.Store',
	    alias: 'store.employees',

	    data: [{
	        "firstName": "Jean",
	        "lastName": "Grey",
	        "officeLocation": "Lawrence, KS",
	        "phoneNumber": "(372) 792-6728"
	    }, {
	        "firstName": "Phillip",
	        "lastName": "Fry",
	        "officeLocation": "Lawrence, KS",
	        "phoneNumber": "(318) 224-8644"
	    }, {
	        "firstName": "Peter",
	        "lastName": "Quill",
	        "officeLocation": "Redwood City, CA",
	        "phoneNumber": "(718) 480-8560"
	    }]
	});

	var tabPage1 = {
	    xtype: 'grid',
	    title: 'Employee Directory',
	    iconCls: 'x-fa fa-users',
	    layout: 'fit',
    	fullscreen: true,
        store: {
            type: 'employees'
        },
        columns: [{
            text: 'First Name',
            dataIndex: 'firstName',
            flex: 1
        }, {
            text: 'Last Name',
            dataIndex: 'lastName',
            flex: 1
        }, {
            text: 'Phone Number',
            dataIndex: 'phoneNumber',
            flex: 1
        }]
    };

    var tabPage2 = {
	    title: 'About Sencha',
        iconCls: 'x-fa fa-info-circle',
        html: 'Sencha Info Page'
    };

	var contentPage_top= {
        region: 'north',        
        layout: 'form',
        title: "Employee Input Area",    	
    	height: 300,
    	defaultType: 'textfield',
	    items: [{
	       fieldLabel: 'First Name',
	        name: 'first',
	        allowBlank:false
	    },{
	        fieldLabel: 'Last Name',
	        name: 'last'
	    },{
	        fieldLabel: 'Phone Number',
	        name: 'phoneNumber'
	    }]
    };

    var contentPage_center= {
        region: 'center',
        xtype: 'tabpanel',
		items: [tabPage1, tabPage2]
    };

	var mainPage_west = {
        region: 'west',        
        layout: 'form',
        title: 'Tree panel',
        width: 300
    };

    var mainPage_center = {
        region: 'center',
        layout: 'border',
		items: [contentPage_top, contentPage_center]
    };

	Ext.create('Ext.container.Viewport', {
		layout: 'border',
        title: 'Ext Layout Browser',
		items: [mainPage_west, mainPage_center]
	});
}