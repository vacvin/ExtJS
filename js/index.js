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
		this.store = Ext.create('Ext.data.TreeStore', {
		    root: {
		        expanded: true,
		        children: [
		            { text: 'Jean Grey', leaf: true },
		            { text: 'Phillip Fry', leaf: true},
		            { text: 'Peter Quill', leaf: true }
		        ]
		    }
		});

		this.tree = Ext.create('Ext.tree.Panel', {
            rootVisible: true,
            width: 280,
            height: 500,
            store: this.store,
            border: false,
            margin: 10
        });

		this.panel = Ext.create('Ext.panel.Panel', {
			region: 'west',
		    width: 300,
		    title: 'Tree Panel',	
		    items: [this.tree]
		});

		this.reload = function(userData) {
			var rootNode = this.store.getRootNode();
			rootNode.removeAll();

			userData.forEach(function(e) {
				rootNode.appendChild({
			        text: e.firstName + ' ' + e.lastName,
			        leaf: true
				});
			});
		};
	};

	var initUserGridPanel = function(config) {
		this.data = [{
				        "firstName": "Jean",
				        "lastName": "Grey",
				        "phoneNumber": "(372) 792-6728"
				    }, {
				        "firstName": "Phillip",
				        "lastName": "Fry",
				        "phoneNumber": "(318) 224-8644"
				    }, {
				        "firstName": "Peter",
				        "lastName": "Quill",
				        "phoneNumber": "(718) 480-8560"
				    }];

		this.store = Ext.create('Ext.data.Store', {
		    data: this.data
		});

		this.panel = Ext.create('Ext.grid.Panel', {
		    title: 'Employee Directory',
		    iconCls: 'x-fa fa-users',
		    layout: 'fit',
	    	fullscreen: true,
	        store: this.store,
	        columns: [{
            	xtype:'actioncolumn',
	            width:50,
	            items: [{
	                iconCls: 'x-fa fa-trash',
	                tooltip: 'Delete',
	                handler: function(grid, rowIndex, colIndex) {
	                    var rec = grid.getStore().getAt(rowIndex);
	                    this.fireEvent('deleteUser', rec);
	                }
	            }],
	            listeners: {
	                scope: this,
	                deleteUser: function(rec) {
	                    this.DeleteUser(rec);
	                }
	            }
        	},{
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

		this.AddUser = function(userInfo) {
			this.data.push(userInfo);
			this.store.reload();
		};

		this.DeleteUser = function(rec) {
			var idx = this.data.indexOf(rec.data);
			if (idx !== -1) this.data.splice(idx, 1);
			this.store.reload();
			this.panel.fireEvent('userTreeReload', rec);
		};
	};

	var initTabInfoPanel = function(config) {		
		this.panel = Ext.create('Ext.panel.Panel', {
			title: 'About Sencha',
	        iconCls: 'x-fa fa-info-circle',
	        html: 'Sencha Info Page'
		});
	};

	var initContentTopPanel = function(config) {
		this.btnAdd = Ext.create('Ext.Button', {
		    text: 'Add'
		});

		this.panel = Ext.create('Ext.panel.Panel', {
			region: 'north',        
	        layout: 'form',
	        title: "Employee Input Area",    	
	    	height: 300,	    	
	    	defaultType: 'textfield',
	    	tbar: [this.btnAdd],
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

		this.getInputUserData = function() {
			var first = this.panel.items.items[0].getValue();
			var last = this.panel.items.items[1].getValue();
			var phoneNumber = this.panel.items.items[2].getValue();
			var userData = {
		        "firstName": first,
		        "lastName": last,
		        "phoneNumber": phoneNumber
		    };

		    return userData;
		};
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

		this.contentPanel.contentCenterPanel.userGridPanel.panel.addListener("userTreeReload", function(){
	        this.treePanel.reload(this.contentPanel.contentCenterPanel.userGridPanel.data);
		}, this);

		this.contentPanel.contentTopPanel.btnAdd.on('click', function() {
			var userData = this.contentPanel.contentTopPanel.getInputUserData();
			this.contentPanel.contentCenterPanel.userGridPanel.AddUser(userData);
	        this.treePanel.reload(this.contentPanel.contentCenterPanel.userGridPanel.data);
	    }, this);
	};

	new initContainer();
}