import * as React from 'react'
import { useCallback, useEffect } from 'react'
import { useBeforeUnload, useLocation, useNavigation } from 'react-router-dom'

type Direction = "vertical" | "horizontal";
type ScrollAttribute = "scrollTop" | "scrollLeft";
const DIRECTION: { [direction in Direction]: ScrollAttribute } = {
	vertical: 'scrollTop',
	horizontal:  'scrollLeft',
};

export function ElementScrollRestoration({
	elementQuery,
	direction = "vertical",
	...props
}: { elementQuery: string; direction?: Direction } & React.HTMLProps<HTMLScriptElement>) {
	const STORAGE_KEY = `position:${elementQuery}`
	const navigation = useNavigation()
	const location = useLocation()
	const scrollAttribute = DIRECTION[direction]

	const updatePositions = useCallback(() => {
		const element = document.querySelector(elementQuery)
		if (!element) return
		let positions = {}
		try {
			const rawPositions = JSON.parse(
				sessionStorage.getItem(STORAGE_KEY) || '{}',
			)
			if (typeof rawPositions === 'object' && rawPositions !== null) {
				positions = rawPositions
			}
		} catch (error) {
			console.warn(`Error parsing scroll positions from sessionStorage:`, error)
		}
		const newPositions = {
			...positions,
			[location.key]: element[scrollAttribute],
		}
		sessionStorage.setItem(STORAGE_KEY, JSON.stringify(newPositions))
	}, [STORAGE_KEY, elementQuery, location.key])

	useEffect(() => {
		if (navigation.state === 'idle') {
			const element = document.querySelector(elementQuery)
			if (!element) return
			try {
				const positions = JSON.parse(
					sessionStorage.getItem(STORAGE_KEY) || '{}',
				) as any
				const stored = positions[window.history.state.key]
				if (typeof stored === 'number') {
					element[scrollAttribute] = stored
				}
			} catch (error: unknown) {
				console.error(error)
				sessionStorage.removeItem(STORAGE_KEY)
			}
		} else {
			updatePositions()
		}
	}, [STORAGE_KEY, elementQuery, navigation.state, updatePositions])

	useBeforeUnload(() => {
		updatePositions()
	})

	function restoreScroll(storageKey: string, elementQuery: string, scrollAttribute: ScrollAttribute) {
		const element = document.querySelector(elementQuery)
		if (!element) {
			console.warn(`Element not found: ${elementQuery}. Cannot restore scroll.`)
			return
		}
		if (!window.history.state || !window.history.state.key) {
			const key = Math.random().toString(32).slice(2)
			window.history.replaceState({ key }, '')
		}
		try {
			const positions = JSON.parse(
				sessionStorage.getItem(storageKey) || '{}',
			) as any
			const stored = positions[window.history.state.key]
			if (typeof stored === 'number') {
				element[scrollAttribute] = stored
			}
		} catch (error: unknown) {
			console.error(error)
			sessionStorage.removeItem(storageKey)
		}
	}
	return (
		<script
			{...props}
			suppressHydrationWarning
			dangerouslySetInnerHTML={{
				__html: `(${restoreScroll})(${JSON.stringify(
					STORAGE_KEY,
				)}, ${JSON.stringify(elementQuery)}, ${JSON.stringify(scrollAttribute)})`,
			}}
		/>
	)
}
