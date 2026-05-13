<div>
  <h1 align="center"><a href="https://npm.im/@epic-web/restore-scroll">🌀 @epic-web/restore-scroll</a></h1>
  <strong>
    在页面导航时恢复元素的滚动位置
  </strong>
  <p>
    <code>&lt;body&gt;</code> 不是唯一会滚动的元素。当用户滚动列表后进行页面导航时，你可能希望保持他们的滚动位置不变。这个库让这一切变得简单。
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

## 问题描述

当用户导航到新页面时，浏览器会将页面滚动到用户离开时的位置。这是一个很好的功能，但并不完美。浏览器只会滚动 `<body>` 元素。如果用户滚动了列表，然后进行页面导航，浏览器会将页面滚动到顶部，但列表仍然会保持在用户离开时的滚动位置。

## 解决方案

这个库提供了一种方法来恢复页面上任何你选择的元素的滚动位置。它通过将元素的滚动位置存储在会话存储中，然后在用户导航回页面时恢复它（与 Remix 处理 `<body>` 滚动恢复的方式非常相似）。

这依赖于 React Router 的 `useNavigation` 和 `useLocation` 钩子。它可能可以被泛化以与其他路由器一起工作。欢迎提交 PR。

## 演示

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/remix-run-remix-fczany?file=app%2Froutes%2F_index.tsx)

注意：这个演示基于 Remix，但也可以与 React Router 一起使用。

## 使用方法

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

就是这样！现在当用户离开页面然后再返回时，列表将保持在用户离开时的滚动位置。

你也可以为轮播图等元素指定水平滚动：

```tsx
<ElementScrollRestoration
	elementQuery="#christmas-gifts"
	direction="horizontal"
/>
```

## 提示：

1. 这需要一个内联脚本，所以如果你使用的内容安全策略要求 nonce，你需要传递一个 `nonce` 参数。
2. 确保将 `ElementScrollRestoration` 组件放在你想要恢复滚动位置的元素_之后_。这是因为该组件会在元素之后立即渲染一个 `<script>` 标签，并且该脚本会立即运行，所以元素需要在脚本运行之前就在 DOM 中。
3. 如果你计算了 `id` 并且该值可能在导航之间发生变化，你可能需要在 `ElementScrollRestoration` 上指定一个 `key` 来触发内联脚本重新评估并正确设置滚动位置。
4. 你需要为每个想要恢复滚动位置的可滚动元素都添加一个这样的组件。

## 许可证

MIT

<!-- prettier-ignore-start -->
[build-badge]: https://img.shields.io/github/actions/workflow/status/epicweb-dev/restore-scroll/release.yml?branch=main&logo=github&style=flat-square
[build]: https://github.com/epicweb-dev/restore-scroll/actions?query=workflow%3Arelease
[license-badge]: https://img.shields.io/badge/license-MIT%20License-blue.svg?style=flat-square
[license]: https://github.com/epicweb-dev/restore-scroll/blob/main/LICENSE
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://kentcdodds.com/conduct
<!-- prettier-ignore-end -->