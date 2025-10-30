/**
 * SPDX-FileCopyrightText: (c) 2000 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import jquery from 'jquery';

/**
 * Counter function — animates number increase on target elements.
 */
export function counter(selector, { delay = 10, time = 1000 } = {}) {
	const elements = jquery(selector);

	elements.each(function () {
		const element = jquery(this);
		const target = parseInt(element.text().replace(/,/g, ''), 10) || 0;
		const steps = Math.ceil(time / delay);
		let current = 0;

		const stepValue = target / steps;

		const interval = setInterval(() => {
			current += stepValue;
			if (current >= target) {
				current = target;
				clearInterval(interval);
			}

			element.text(Math.floor(current).toLocaleString());
		}, delay);
	});
}

export default jquery;
