/**
 * @class Ext.app.Portal
 * @extends Object
 * A sample portal layout application class.
 */
Ext.Loader.setPath({'Ext.app' : '/works/extjs/mda/portal/classes', 'Ext.ux.messaging' : '/works/extjs/mda/ux/messaging'});
Ext.define('Ext.app.Portal', {

    extend: 'Ext.container.Viewport',
    //requires: [ 'Ext.diag.layout.ContextItem', 'Ext.diag.layout.Context' ],
	
	uses: ['Ext.app.PortalPanel', 'Ext.app.PortalColumn', 'Ext.app.GridPortlet', 'Ext.app.ChartPortlet'],

	mixins: {
		notifier: 'Ext.ux.messaging.INotifier',
		notificationLsnr :'Ext.ux.messaging.INotificationLsnr'
	},

    getTools: function(){
        return [{
            xtype: 'tool',
            type: 'gear',
            handler: function(e, target, panelHeader, tool){
                var portlet = panelHeader.ownerCt;
                portlet.setLoading('Loading...');
                Ext.defer(function() {
                    portlet.setLoading(false);
                }, 2000);
            }
        }];
    },

    initComponent: function(){
		var me = this;
        var content = '<div class="portlet-content">'+Ext.example.shortBogusMarkup+'</div>';
        Ext.apply(this, {
            id: 'app-viewport',
            layout: {
                type: 'border',
                padding: '0 5 5 5' // pad the layout from the window edges
            },
            items: [{
				id: 'app-header',
				xtype: 'box',
                region: 'north',
                height: 40,
				border: false,
				html: '<a href="http://wp.me/pRLMG-2E">Message Driven Architecture Sample</a>'
            },{
                xtype: 'container',
                region: 'center',
                layout: 'border',
                items: [{
                    id: 'app-portal',
                    xtype: 'portalpanel',
                    region: 'center',
                    items: [{
                        id: 'col-1',
                        items: [{
                            id: 'portlet-1',
                            title: 'Grid Portlet',
							height: 330,
                            tools: this.getTools(),
                            items: [{
								xtype: 'button',
								text: '<span style="font-size: 24px;"><u>CLICK ME</u> to publish RELOAD message<br/>and see what happens!!</span>',
								handler: function(){
									me.notify('ID123', Ext.ux.messaging.Constants.topics.RELOAD, 'reload');
								}
							}],
                            listeners: {
                                'close': Ext.bind(this.onPortletClose, this)
                            }
                        }]
                    }, {
                        id: 'col-2',
                        items: [{
                            id: 'portlet-2',
                            title: 'Grid Portlet',
                            tools: this.getTools(),
                            items: Ext.create('Ext.app.GridPortlet'),
                            listeners: {
                                'close': Ext.bind(this.onPortletClose, this)
                            }
                        }]
                    }, {
                        id: 'col-3',
                        items: [{
                            id: 'portlet-3',
                            title: 'Stock Portlet',
                            tools: this.getTools(),
                            items: Ext.create('Ext.app.ChartPortlet'),
                            listeners: {
                                'close': Ext.bind(this.onPortletClose, this)
                            }
                        }]
                    }]
                }]
            }]
        });
        this.callParent(arguments);
    },

    onPortletClose: function(portlet) {
        this.showMsg('"' + portlet.title + '" was removed');
    },

    showMsg: function(msg) {
        var el = Ext.get('app-msg'),
            msgId = Ext.id();

        this.msgId = msgId;
        el.update(msg).show();

        Ext.defer(this.clearMsg, 3000, this, [msgId]);
    },

    clearMsg: function(msgId) {
        if (msgId === this.msgId) {
            Ext.get('app-msg').hide();
        }
    }
});
