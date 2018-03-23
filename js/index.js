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
	var initTreePanel = function(config) {
		this.tree = Ext.create('Ext.tree.Panel', {
            rootVisible: true,
            width: 280,
            height: 500,
            border: false,
            margin: 10
        });

		this.panel = Ext.create('Ext.panel.Panel', {
			region: 'west',
		    width: 300,
		    title: 'Tree Panel',	
		    items: [this.tree]
		});
	};

	var initUserGridPanel = function(config) {
		this.date = [{
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
				    }];

		this.store = Ext.create('Ext.data.Store', {
		    data: this.date
		});

		this.panel = Ext.create('Ext.grid.Panel', {
		    title: 'Employee Directory',
		    iconCls: 'x-fa fa-users',
		    layout: 'fit',
	    	fullscreen: true,
	        store: this.store,
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
		});
	};

	var initTabInfoPanel = function(config) {		
		this.panel = Ext.create('Ext.panel.Panel', {
			title: 'About Sencha',
	        iconCls: 'x-fa fa-info-circle',
	        html: 'Sencha Info Page'
		});
	};

	var initContentTopPanel = function(config) {
		this.panel = Ext.create('Ext.panel.Panel', {
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
		});
	};

	var initContentCenterPanel = function(config) {
		this.userGridPanel = new initUserGridPanel(config);
		this.tabInfoPanel = new initTabInfoPanel(config);

		this.panel = Ext.create('Ext.tab.Panel', {
			region: 'center',
	        xtype: 'tabpanel',
			items: [this.userGridPanel.panel, this.tabInfoPanel.panel]
		});
	};

	var initContentPanel = function(config) {
		this.contentTopPanel = new initContentTopPanel(config);
		this.contentCenterPanel = new initContentCenterPanel(config);

		this.panel = Ext.create('Ext.panel.Panel', {
			region: 'center',
	        layout: 'border',
	        items: [this.contentTopPanel.panel, this.contentCenterPanel.panel]
		});

	};

	var initContainer = function(config) {
		this.treePanel = new initTreePanel(config);
		this.contentPanel = new initContentPanel(config);

		this.container = Ext.create('Ext.container.Viewport', {
			layout: 'border',
	        title: 'Ext Layout Browser',        
			items: [this.treePanel.panel, this.contentPanel.panel]
		});
	};

	new initContainer();
}