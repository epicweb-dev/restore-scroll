<div>
  <h1 align="center"><a href="https://npm.im/@epic-web/restore-scroll">🌀 @epic-web/restore-scroll</a></h1>
  <strong>
    Restore scroll position of elements on page navigation
  </strong>
  <p>
    The <code>&lt;body&gt;</code> isn't the only thing that scrolls. When the user scrolls a list, then navigates back and forth, you may want to keep their scroll position where it was when they left. This library makes that easy.
  </p>
</div>

```
npm install @epic-web/restore-scroll
```

<div align="center">
  <a
    alt="Epic Web logo"
    href="https://www.epicweb.dev"
  >
    <img
      width="300px"
      src="https://github-production-user-asset-6210df.s3.amazonaws.com/1500684/257881576-fd66040b-679f-4f25-b0d0-ab886a14909a.png"
    />
  </a>
</div>

<hr />

<!-- prettier-ignore-start -->
[![Build Status][build-badge]][build]
[![MIT License][license-badge]][license]
[![Code of Conduct][coc-badge]][coc]
<!-- prettier-ignore-end -->

## The Problem

When a user navigates to a new page, the browser will scroll the page to the
position it was at when the user left the page. This is a great feature, but
it's not perfect. The browser only scrolls the `<body>` element. If the user
scrolls a list, then navigates back and forth, the browser will scroll the page
to the top, but the list will still be scrolled to the position it was at when
the user left the page.

## The Solution

This library provides a way to restore the scroll position of any element on the
page you choose. It does this by storing the scroll position of the element in
session storage and then restoring it when the user navigates back to the page
(very similar to how Remix handles scroll restoration for the `<body>`).

This depends on React Router's `useNavigation` and `useLocation` hooks. It could
probably be generalized to work with other routers. PRs welcome.

## Usage

```tsx
import { ElementScrollRestoration } from '@epic-web/restore-scroll'

return (
	<div>
		<ul id="christmas-gifts">
			<li>🎁</li>
			<li>🎂</li>
			<li>🎉</li>
			{/* ... */}
		</ul>
		<ElementScrollRestoration elementQuery="#christmas-gifts" />
	</div>
)
```

And that's it! Now when the user navigates away from the page and then back to
it, the list will be scrolled to the position it was at when the user left the
page.

You can also specify horizontal scroll for elements like carousels:

```tsx
<ElementScrollRestoration elementQuery="#christmas-gifts" direction="horizontal" />
```
## Tips:

1. This requires an inline script, so you'll need to pass a `nonce` if you're
   using a Content Security Policy that requires this.
2. Make certain to place the `ElementScrollRestoration` component _after_ the
   element you want to restore the scroll position of. This is because the
   component will render a `<script>` tag immediately after the element, and
   that script will run immediately, so the element needs to be in the DOM
   before the script runs.
3. If you're computing the `id` and that value can change between navigations,
   you may need to specify a `key` on `ElementScrollRestoration` to trigger the
   inline script to be evaluated again and set the scroll position correctly.
4. You'll want one of these components for each scrollable element you want to
   restore the scroll position for.

## License

MIT

<!-- prettier-ignore-start -->
[build-badge]: https://img.shields.io/github/actions/workflow/status/epicweb-dev/restore-scroll/release.yml?branch=main&logo=github&style=flat-square
[build]: https://github.com/epicweb-dev/restore-scroll/actions?query=workflow%3Arelease
[license-badge]: https://img.shields.io/badge/license-MIT%20License-blue.svg?style=flat-square
[license]: https://github.com/epicweb-dev/restore-scroll/blob/main/LICENSE
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://kentcdodds.com/conduct
<!-- prettier-ignore-end -->
