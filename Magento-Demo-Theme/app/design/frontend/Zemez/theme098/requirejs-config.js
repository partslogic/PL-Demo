/**
 * Copyright © 2015 Magento. All rights reserved.
 * See COPYING.txt for license details.
 */

var config = {
    map: {
        '*': {
            "react": "js/partslogic.react.production.min",
            "react-dom": "js/partslogic.react-dom.production.min",
            "PartslogicUi": "js/partslogic.ui.0.0.16-alpha.0.build.index.umd",
            "theme": 'js/theme',
            "selectize":    "js/selectize",
            "googleMapOptions": "js/googleMapOptions",
          
        }
    },
    paths: {
        "carouselInit":     'js/carouselInit',
        "blockCollapse":    'js/sidebarCollapse',
        "animateNumber":    'Magento_Theme/js/jquery.animateNumber.min',
        "owlcarousel":      'Magento_Theme/js/owl.carousel.min',
        "customSelect":     "Magento_Theme/js/select2",
        "doubleTap":        "Magento_Theme/js/doubletaptogo",
        "stickUpNav":        "Magento_Theme/js/stickUp",
        "googleMapOptions": "js/googleMapOptions"
    },
    shim: {
        "owlcarousel":      ["jquery"],
        "animateNumber":    ["jquery"],
        "doubleTap":        ["jquery", "jquery/ui"],
        "stickUpNav":        ["jquery"]
    },
    deps: [
        "jquery",
        "jquery/jquery.mobile.custom",
        "mage/common",
        "mage/dataPost",
        "mage/bootstrap",
        "Magento_Theme/js/responsive"
    ]
};