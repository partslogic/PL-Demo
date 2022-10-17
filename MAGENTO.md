
PartsLogic Magento Integration
======
To install the PL components in Magento, it will require a combination of accessing the Magento Admin Panel and uploading/editing files via SFTP for the backend files.
## Table of Contents

* [Prerequisites](#prerequisites)
* [Setup account to use REST API](#rest-api)
* [Install PL javascript library](#install-pl-javascript-library)
* [Install PL CSS](#install-pl-css)
* [Usage](#usage)
   - [Search Bar](#search-bar)
   - [Search Result Page](#search-result-page)
   - [Fitment Selector](#fitment-selector)


## Prerequisites

-  To use the PL Search Engine you will need an active PL account. If you don’t have an account you can sign up [here](https://partslogic.com/pricing/](https://partslogic.com/request-demo/)). See plans and pricing [here](https://partslogic.com/pricing/).
- Create the required API key for the PartsLogic ETL process in the Admin Panel, this step is typically executed by our developers once the API is ready.

## REST API

For Magento, PartsLogic needs the following RESTful API to provide you with optimized search experience:

- Get products endpoint 
- Get Categories enpoint 
- For fitments PL needs CSV file that includes (PRODUCT_ID, Year, Make, Model)


## Install PL Javascript Library

First thing first, we need to install the following libraries:
- [React dom](https://unpkg.com/react-dom@17.0.2/umd/react-dom.production.min.js)
- [React](https://unpkg.com/react@17/umd/react.production.min.js)
- [PartsLogic](https://unpkg.com/@partslogic/ui@0.0.17-alpha.0/build/index.umd.js)

After installing the above libraries, navigate to your Magento app `app/design/frontend/<Theme Name>/theme/web/js` and upload the above files so we can access them in the next step

<img width="350" alt="Libraries" src="https://user-images.githubusercontent.com/20854551/195536593-a08ba61f-514a-4ebe-b4e0-6807f51984c0.png">

Next we need to configure the [RequireJS](https://developer.adobe.com/commerce/frontend-core/javascript/requirejs) to allow the above Javascript libraries  load in the background

```
var config = {
    map: {
        '*': {
            'react': 'js/partslogic.react.production.min',
            'react-dom': 'js/partslogic.react-dom.production.min',
            'PartslogicUi': 'js/partslogic.ui.0.0.17-alpha.0.build.index.umd'
        }
    }

/* Additional config... */

};
```

<img width="350" alt="Screen Shot 2022-10-13 at 1 29 09 PM" src="https://user-images.githubusercontent.com/20854551/195573518-b60354a3-f45b-400a-bb99-5ba66ee09684.png">


## Install PL CSS

In this file you will find a sample of CSS to reference the different classnames and ids and adjust it according to the need of your theme, then you will need to include it in the head of the site

In `app/design/frontend/<Theme Name>/theme/web/css` add the css fine, its better to minify the css file for better site speed and accessibility. 
you can add more css files to it if your site theme needs so.

<img width="350" alt="css files" src="https://user-images.githubusercontent.com/20854551/195577710-f78a0791-69b3-4ff3-8166-3642555de273.png">

In `app/design/frontend/<Theme Name>/Magento_Theme/layout/default_head_blocks.xml` include the above added css files for it to be accessed by the frontend

<img width="350" alt="include css in the head" src="https://user-images.githubusercontent.com/20854551/195578758-d862469e-b335-4af7-b669-4c2fb8c1d08e.png">


# Usage
Once you are done with the above configuration, your site is ready to use the PL components:
  ## Search Bar
  To add the Search Bar of PL in your site, first you need to find the native search of your theme, in most of the sites and in this example the native search is located in `app/design/frontend/<Theme Name>/Magneto_Search/templates/form.mini.phtml`, replace this file with below snippet
  
  ```
  <?php
/**
 * PartsLogic Search Bar Component
 * Original file in same directory w/ original search bar code: form.mini_Org_Date.phtml
 */
?>

<div class="block-search" id="partslogic-search">
<div id="pl-searchbar-container"></div>
   <script type="text/javascript">
      require(["react","react-dom","PartslogicUi"],function(React, ReactDOM, PartslogicUi) {

         window.React = React
         window.ReactDOM = ReactDOM
         window.PartslogicUi = PartslogicUi

         window.PartslogicUi.config({
         API_KEY: <APIKEY>,
         });
         const searchBarContainer = document.querySelector('#pl-searchbar-container');
         const SearchBar = window.PartslogicUi.WsmSearchBarWithWrapperModal;
         function onSubmit(data) {
         let params = new URLSearchParams();
         params.set('q', data);
         window.location.href = `${
           window.location.origin
         }/search-pl?${params.toString()}`;
         }

         window.ReactDOM.render(
         window.React.createElement(SearchBar, {
           onSubmit: onSubmit
         }),
         searchBarContainer
         );

      });
   </script>
</div>
  ```
  <img width="350" alt="Screen Shot 2022-10-13 at 2 09 46 PM" src="https://user-images.githubusercontent.com/20854551/195581434-d0831bf0-3b62-49ac-addf-4dc9c64b5954.png">  <img width="350" alt="Screen Shot 2022-10-13 at 2 13 18 PM" src="https://user-images.githubusercontent.com/20854551/195582128-b5d5c05b-ab1e-42e0-9a4d-16df22e5ac60.png">


  
  ## Search Result Page
  To add the search result page, you need to create a new template then call that template in the content page: 
  - Navigate to `app/design/frontend/<Theme Name>/Magento_Theme/layout/templates`
  - Create a new folder `partslogic-search`
  - In the folder, create a PHTML file and add the below snippet

```
<script type="text/javascript">
   require(["react","react-dom","PartslogicUi"],function(React, ReactDOM, PartslogicUi) {
   /******************************
   ** PartsLogic Component: Search Result Page
   *******************************/

      window.React = React
      window.ReactDOM = ReactDOM
      window.PartslogicUi = PartslogicUi

      window.PartslogicUi.config({
      API_KEY: '<API_KEY>',
      });
      /* The element ID to render the PL Search Page  componenet */
      const searchPageContainer = document.querySelector(
      '#pl-search-page-container'
      );               

      const SearchPage = window.PartslogicUi.WsmSearchPage;

      window.ReactDOM.render(
      window.React.createElement(SearchPage,{groupId: <GROUP_ID> }),
      searchPageContainer
      );

   });
</script>
<style>
 <!-- Optional CSS to make adjustments on the specific page. The example below is hiding some UI elements on the page -->
</style>
```
Once you are done with the above steps, you are read to add it in the content page 
- Login to the Magento Admin panel
- Navigate to `Content/Elements/Pages` 
 <img width="200" alt="Screen Shot 2022-10-13 at 2 28 09 PM" src="https://user-images.githubusercontent.com/20854551/195584643-fdc27ab9-225d-43dc-a34d-ab8154a1c3d1.png">
 
- Add new page and the below snippet to the conent of the page 


```
<div id="partslogic-searchresults-content">
<div class="container">
<div id="pl-wrap-search-page" class="row">
<div class="col-xs-12">
<div id="pl-search-page-container">&nbsp;</div>
{{block class="Magento\Framework\View\Element\Template" template="Magento_Theme::partslogic-search/partslogic-component-searchpage.phtml"}}</div>
</div>
</div>
</div>
```
<img width="350" alt="Screen Shot 2022-10-13 at 2 31 44 PM" src="https://user-images.githubusercontent.com/20854551/195585282-a11e25ee-26db-4467-b960-b50d09d888ac.png">

Save the change and you should be able to see the search result in the new page created

<img width="350" alt="Screen Shot 2022-10-13 at 2 37 41 PM" src="https://user-images.githubusercontent.com/20854551/195586593-9f7efe61-497c-45fd-973a-95f82a3d72c7.png">


  ## Fitment Selector
Each website will be different and the placement of this component in the file system will be relative to your theme and need, for this example, we will use the directory that we created for the search result page, navigate to that directory and the below snippet:

```

<script type="text/javascript">
   require(["react","react-dom","PartslogicUi"],function(React, ReactDOM, PartslogicUi) {
   /******************************
   ** PartsLogic Component: Search Bar
   *******************************/

      window.React = React
      window.ReactDOM = ReactDOM
      window.PartslogicUi = PartslogicUi

      window.PartslogicUi.config({
      API_KEY: 'API_KEY',
      });
      const fitmentContainer = document.querySelector("#pl-fitment-selector-container");

      window.ReactDOM.render(
      window.React.createElement(PartslogicUi.WsmFitmentSelectorWrapper, {
      styled: true,
      groupId: 75196,
      orientation: "horizontal", 
      onSubmit: function (data) {
      window.location.href = `/search-pl?fitment=${encodeURIComponent(data)}`
      },
      }),
      fitmentContainer
      );	

   });
</script>
<style>
<!-- Optional CSS to make adjustments on the specific page. The example below is hiding some UI elements on the page -->
</style>

```
Next, you can add it to a specific page using the same method of the search result by including the below snippet to the content of the page:

```
   <div class="ymm-product-search-view" id="partslogic-fitment-selector">
       <div class="container">
           <div class="finderProducts">
            <div id="pl-fitment-selector-container"></div>
   {{block class="Magento\Framework\View\Element\Template" template="Magento_Theme::partslogic-search/partslogic-component-fitmentselector.phtml"}}</div>
         </div>
      </div>
   </div>
```

Another approach is to create a new block and add it to the widget:
- Navigate to `Content/Elements/Blocks` 

<img width="350" alt="blocks" src="https://user-images.githubusercontent.com/20854551/195609123-c38fbf62-ac47-4fb1-9820-5c038a70da2d.png">

- Add new block 
- Add the above snippet to the new block 

<img width="350" alt="Screen Shot 2022-10-13 at 4 27 43 PM" src="https://user-images.githubusercontent.com/20854551/195609723-b4fad27d-ef57-421f-a10a-bef7f3d9eeb8.png">

Once the block is created now we can add it to the widgets so we can display it in a specific page

- Navigate to `Content/Elements/Widgets` 

<img width="350" alt="Screen Shot 2022-10-13 at 4 29 56 PM" src="https://user-images.githubusercontent.com/20854551/195610343-6f4020ee-5fd8-48bf-b0dd-dcdab12b088b.png">

- Add a new widget 
- Click on the widget option 
- Select the block that you just created above

<img width="350" alt="Screen Shot 2022-10-13 at 4 32 27 PM" src="https://user-images.githubusercontent.com/20854551/195610940-5ef8c12c-d58f-48c4-a291-b28a7eea2736.png">

Now, lets add it to the layout

- Click on frontend properties in the widget page 
- Scroll down to the layout update 
- Add a new layout updates
- Select Specific page to dispay on 
- Save and clear cache 

<img width="350" alt="Screen Shot 2022-10-13 at 4 36 01 PM" src="https://user-images.githubusercontent.com/20854551/195611994-f2bf4720-55cf-4f6b-aeb8-80a540abf22e.png">






