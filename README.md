# FOR INTERNAL USE ONLY

## refarch-ocapi
A Heroku-based node.js application demonstrates an SFRA-style storefront experience provided by OCAPI.

> For access to or additional information on this application and how it's leveraged, please contact Abraham Lloyd (abraham.lloyd@salesforce.com).

### Installation Instructions
###### This section provides an overview of how to install, setup, and deploy the demo application via Heroku.

## 1. Create a New Heroku Application

Log into your Heroku account, and from the dashboard:

- Click on the __New__ button
- Select the __create new app__ option from the menu

This will bring you to the new application wizard.

## 2. Specify Your Application Details

From the new application wizard, please specify a unique app-name.  Validate the owner is you, and select a region from which the application is served.  For now, don't worry about adding the application to a pipeline.

One the form is complete, click on the __create app__ button to continue.

## 3. Select Your Resources

Click on the __Resources__ tab view the application resources (being new, it should not have any).  From the add-ons section, use the search bar and search for:

> Redis

From the search results, select __Heroku Redis__ from the collection of displayed options.  In the modal dialog displayed next, please select the plan name that you'd like to use (__Hobby Dev -- Free__ is fine).

Once you've selected the plan, click on the __provision__ button to provision your Redis instance.

## 4. Configure Your Environment Settings

Next, click on the __Settings_ tab.  Find the heading named __Config Vars__ and click on the button titled __Reveal Config Vars__.  Clicking on the button will expose the configuration variables -- which should only include the __REDIS_URL__.

Please add and configure the following config-vars via the Settings tab.

| Variable Name | Value |
| --------------|------------------------------|
| CONTAINER_CLASS | container-fluid |
| OCAPI_HOST | https://__insert your sandbox environment here__|
| OCAPI_PATH | /s/__insert your siteId here__/dw/shop/v17_3 |
| OCAPI_CLIENT_ID | __insert your client_id here__ |
|  | __insert session secret here__ |

Here's an example of what a configured environment may look like.

| Variable Name | Value |
| --------------|------------------------------|
| CONTAINER_CLASS | container-fluid |
| OCAPI_HOST | https://randomsandbox-web-sbx001-dw.demandware.net|
| OCAPI_PATH | /s/RefArch/dw/shop/v17_3 |
| OCAPI_CLIENT_ID | aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa |
| SESSION_SECRET | kkdhdkdhf8443md29f8 |

In this configuration, the sandbox "randomsandbox" is used as an OCAPI source.  The siteID RefArch (representing B2C Commerce's Storefront Reference Architecture) will be used by the OCAPI service calls, and version 17.3 of the API is being leveraged.

## 5.  Retrieve and Build the Repository

With the Heroku environment now setup, please download the respository locally, set it up, and build it.

- The application requires Node.js v6.0.0 or greater
- Use NVM to setup multiple versions of Node.js
- With Node.js setup, run

> npm install

- Confirm that the installation runs without issues or errors.

## 6.  Configure the application to deploy to heroku.

Click on the __Deploy__ tab, and scroll down to the section titled "Deploy Using Heroku Git".

- Ensure that you've installed the Heroku CLI.
- Authenticate against Heroku using:

> heroku login

- Add the heroku remote:

> heroku git:remote -a __insert your application name here__

- Deploy your application:

> git push heroku master

After the application deployed, verify that the build process completes.  At the end of the build logging, you should see a line similar to this:

<pre>
remote: -----> Launching...
remote:
remote:        Released v10
remote:        https://[your-application-name-here].herokuapp.com/ deployed to Heroku
remote:
remote: Verifying deploy... done.
</pre>

You can then click on the url displayed above to launch the storefront.

## refarch-ocapi Headless POC with External Service
### Refarch Ocapi
1.	Go to https://github.com/SalesforceCommerceCloud/refarch-ocapi
2.	Follow the instructions in the Readme to get the code up and running on Heroku (alternatively, you can run it on localhost).

### Hooks
1.	Refarch Ocapi to work with an External Service requires the use of hook: dw.ocapi.shop.basket.items.afterPOST
2.	This hook relies on a couple of other hooks to make sure the external product price is included in cart calculations.
3.	Go into the folder “external_service_resources > setuphooks” and upload the contents in a cartridge on your sandbox. Make sure the paths pointing to the scripts are correct for your environment. For example, in hooks.json, we register the hook: dw.ocapi.shop.basket.items.afterPOST with the script "./cartridge/scripts/hooks/ocapi/addProduct.js" like in SFRA or Sitegenesis.
4.	If you already have hooks.json in your sandbox and you have hooks registered, you can re-use the same hooks.json but you have to modify calculate.js with the version uploaded in the folder “external_service_resources > setuphooks.”

### External Service
1.	The folder “external_service_resources” in the above-mentioned repo has a folder called “externalservice” which is just a simple ExpressJs web service which has an endpoint “externalProduct” to return an external product. In app.js of this service, you can modify and specify details for a product for demo purposes.
2.	You should deploy this external service to Heroku and make sure URLs in the POC are pointing to your deployment.
3.	You cannot point to this external service through localhost because during my implementation I found out that somehow our HTTPClient class does not support making GET requests to localhost.
4.	Alternatively, for demo purposes, you can define an endpoint within the Refarch OCAPI POC to return you an external product.
5.	Once you have deployed the External Service to Heroku, you will have to update the URLs in the following places:
-	addProduct.js in folder “external-service”
-	MixedProduct.js model in Refarch OCAPI POC
-	Product.js model in Refarch OCAPI POC
-	ProductImages.js model in Refarch OCAPI POC

### Demo Happy Path
There are many limitations in this POC. So, the happy path is:
1.	On homepage, click on the banner “50% off Summer Styles” which will take you to a page that currently shows 3 products.
2.	Clicking on any of these products will take you the product’s PDP page. Make sure the products you are doing a demo with only has “color” as its variation attribute. Anything with another attribute like “size” may break the demo.
3.	Choose the color of the product, the page will refresh. Then add that product to cart (currently the display image of the product does not change based on the color you chose, something that can be implemented later on).
4.	Go to cart and you will see the product with correct pricing, quantity and cart totals (shipment, tax, total).
5.	Do the same for the external product on the page “50% off Summer Styles” and check the cart.
6.	You can add another external product or an internal product which will either update the quantity of the corresponding product in cart OR add a new line item.






