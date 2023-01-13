The live demo for this hiring challenge is available at [`https://simple-cart-beta.vercel.com`](https://simple-cart-beta.vercel.com).

## How to run this project

First, clone the repository. After that install the dependencies and devDependencies by running this commmand at the root of the directory:

```bash
npm install
```

Once all the dependencies and devDependencies have been installed, start the development server by running:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Deployment

This project has been hosted using [Vercel](https://vercel.com) and you can check out the [demo](https://simple-cart-beta.vercel.com).

To generate an optiimised version of the application for production, run this command in the project root directory:

```bash
npm run build
```

## Additional features added

### End-to-End tests

E2E tests have been added with cypress. The tests can be found in `cypress/e2e/simple_cart.cy.js`.

To run the tests, run this command from the project root:

```bash
npm run cypress:open
```

Four basic tests were written to test the core functionalities of the application:

- add item to cart
- remove item from cart
- increase item quantity
- decrease item quantity

### Project pages

The project has three pages:

1. `/` - home page which shows all available products
2. `/product/[id]` - single product page e.g. `/product/1`
3. `/cart` - the cart page

### API for fetching products

For this project, products are fetched using [FakeStoreAPI](https://github.com/keikaavousi/fake-store-api) - a free online REST API that provides you fake e-commerce JSON data.

I decided not to use the [Chimoney API](https://chimoney.readme.io/reference/get_v0-2-info-assets) because it has no support for fetching single product (Gift card) using the `id` (or a slug) as a parameter, hence it would be a hassle to generate product detail pages with [dynamic routes](https://nextjs.org/docs/routing/dynamic-routes) in NextJS.

## Approach to the project

This project uses React, written with JavaScript and is built with NextJS.

### State management

The cart keeps only the ID and quantity of items and it is saved in `localStorage`. To manage the state of the cart, this project uses Reducer and exposes the cart `state` and `action` dispatch functions to all components in the app using Context.

The project seemed a little too much for `useState` without running into messy state management situations and prop drilling issues; and too little for Redux which might be an overkill, but `useReducer` and `useContext` hit the sweet spot of centralising the state management with ease of retrieval and update.

The reducer function in `reducers/cartReducer.js` contains the logic for how the different action types are handled, namely:

- `initialise_cart`
- `add_item`
- `remove_item`
- `change_quantity`

The `/cart` page is populated by retrieving the items ID and quantity from state and using these to fetch the order details like title, price and image for the products. While the data is being fetched, skeleton loaders are displayed to improve the user experience.

### Styling

The majority of the styling for the project was done using CSS Modules with a sparing use of MUI for few components like Alert and Skeleton loaders.

### Dynamic routes

The use of the [dynamic routes](https://nextjs.org/docs/routing/dynamic-routes) feature of NextJS has been leveraged in this project to generate individual product details page.

In the `getStaticPaths` function in `pages/product/[id].js`, all the `paths` are returned and their pages pre-rendered. In production when there are lots of single product pages, pre-rendering all the pages might not be ideal. Instead, a few popular paths, for example, can be returned. Only the pages for these most visited products will be pre-rendered. The `fallback` return value can then be set to `true` so that the other product pages are generated on the fly when requested. It could also be set to `"blocking"` so that there is no flash of content while attempting to generate the page.

## Performance improvement

The following sugestions can be used to improve the app:

- [Incremental Static Regeneration](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration) can be used to keep the products available for sale up-to-date. The `revalidate` return prop of the `getStaticProps` function in the home page (`index.js`) can be set to a particular interval (e.g. 10 seconds) at which to re-generate the page.
- If the [Chimoney API](https://chimoney.readme.io/reference/get_v0-2-info-assets) is to be used for this project, then the gift cards should be retrievable via an endpoint which will make it easier to create dynamic routes for them.
- Since this project stores only the item ID and quantity in state, when populating the `/cart` page it calls the products API to fetch item details like image, price and title. This results in a brief loading state. To improve this, the products can be fetched ahead of time and stored in state using [SWR](https://swr.vercel.app/) which handles caching, revalidating data etc. so we always have realtime data to use (e.g in price calculation) and do not have to worry about having a loading state or outdated data being used.
