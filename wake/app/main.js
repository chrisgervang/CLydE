require.config({
 
    baseUrl: 'app/scripts',
 
    paths: {
        'text' : 'plugins/text',
        'less' : 'plugins/less/less',

        'models' : '../models',
        'collections' : '../collections',
        'views' : '../views',
        'router' : '../routers/router',

        'css' : '../public/css',
        'images' : '../public/',

        'baseline' : '../public/css/baseline'
    },
 
    shim: {
        'jquery' : {
            exports: '$'
        },
        'jquery-ui' : {
            deps: ['jquery'],
            exports: '$'
            
        },
        'underscore' : {
            exports: '_'
        },
        'backbone' : {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'handlebars' : {
            exports: 'Handlebars'
        },
        'spinningwheel' : {
            exports: 'SpinningWheel'
        },
        'touchwipe' : {
            exports: 'touchwipe'
        }
    }
});

require(['views/dashboard'], function(Dashboard){       
    
    Dashboard.render();

});