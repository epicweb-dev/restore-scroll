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

This depends on Remix's `useBeforeUnload`, `useNavigation`, and `useLocation`
hooks. There's probably an easy way we could make this support React Router in
general. PRs welcome!

## Usage

```tsx
import { ElementScrollRestoration } from '@epic-web/restore-scroll'

// ... Stick this in your root component somewhere:
return (
	<html>
		<body>
			{/* ... */}
			<ElementScrollRestoration elementQuery="[data-restore-scroll='true']" />
			{/* ... */}
		</body>
	</html>
)
```

Then, for any element for which you wish to restore scroll position, simply add
the `data-restore-scroll="true"` attribute:

```tsx
<ul data-restore-scroll="true">
	<li>...</li>
	<li>...</li>
	<li>...</li>
</ul>
```

And that's it! Now when the user navigates away from the page and then back to
it, the list will be scrolled to the position it was at when the user left the
page.

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
