Ext.define('Ext.app.ChartPortlet', {

    extend: 'Ext.panel.Panel',
    alias: 'widget.chartportlet',

	/**
	@author: kousikraj
	This mixin block is used to interface Message and Listener classes.
	This way, it is possible for us to have implementation of NotificationLsnr and PublishedMessage.
	Also, check (last section of)initComponenet(), getSubscriptionTopics(), notified() methods to get complete implementation
	*/
	mixins: {
		notifiedMsg:'Ext.ux.messaging.IPublishedMessage',
		notifiable	: 'Ext.ux.messaging.INotificationLsnr'
	},

    requires: [
        'Ext.data.JsonStore',
        'Ext.chart.theme.Base',
        'Ext.chart.series.Series',
        'Ext.chart.series.Line',
        'Ext.chart.axis.Numeric'
    ],

    generateData: function(){
        var data = [{
                name: 0,
                djia: 10000,
                sp500: 1100
            }],
            i;
        for (i = 1; i < 50; i++) {
            data.push({
                name: i,
                sp500: data[i - 1].sp500 + ((Math.floor(Math.random() * 2) % 2) ? -1 : 1) * Math.floor(Math.random() * 7),
                djia: data[i - 1].djia + ((Math.floor(Math.random() * 2) % 2) ? -1 : 1) * Math.floor(Math.random() * 7)
            });
        }
        return data;
    },

	/**
	This method is used to initialize the topics that this class is interested to listen.
	For eg., this class needs to be reloaded based on click of refresh button in portal header bar.
	So, we are subscribing this class to RELOAD topic.
	*/
	getSubscriptionTopics : function() {
		return [Ext.ux.messaging.Constants.topics.RELOAD];
	},

	
	/**
	This method is overridden implementation of notified method available in NotificationLsnr.
	Here we need to implement what needs to be done once we receive the topic and message from notifiers.
	*/
	notified : function(notifierId, topicId, message) {
    	if (topicId == Ext.ux.messaging.Constants.topics.RELOAD) {
				this.store.loadData(this.generateData());
		}
    },

    initComponent: function(){
		var store = Ext.create('Ext.data.JsonStore', {
			fields: ['name', 'sp500', 'djia'],
			data: this.generateData()
		});
		this.store = store;
        Ext.apply(this, {
            layout: 'fit',
            height: 300,
            items: {
                xtype: 'chart',
                animate: false,
                shadow: false,
                store: store,
                legend: {
                    position: 'bottom'
                },
                axes: [{
                    type: 'Numeric',
                    position: 'left',
                    fields: ['djia'],
                    title: 'Dow Jones Average',
                    label: {
                        font: '11px Arial'
                    }
                }, {
                    type: 'Numeric',
                    position: 'right',
                    grid: false,
                    fields: ['sp500'],
                    title: 'S&P 500',
                    label: {
                            font: '11px Arial'
                        }
                }],
                series: [{
                    type: 'line',
                    lineWidth: 1,
                    showMarkers: false,
                    fill: true,
                    axis: 'left',
                    xField: 'name',
                    yField: 'djia',
                    style: {
                        'stroke-width': 1,
                        stroke: 'rgb(148, 174, 10)'

                    }
                }, {
                    type: 'line',
                    lineWidth: 1,
                    showMarkers: false,
                    axis: 'right',
                    xField: 'name',
                    yField: 'sp500',
                    style: {
                        'stroke-width': 1,
                         stroke: 'rgb(17, 95, 166)'

                    }
                }]
            }
        });

		//Here we are initializing the notificationlsnr mixin
		var me = this;
        me.initNotificationLsnr(me);
        this.callParent(arguments);
    }
});
