
# custom-jquery-client-extension

Define and export code in the client extension with a specifier that the import map in Liferay provides to anything that imports it. For example, you can bundle a library like jQuery into the client extension, and then import it into a fragment’s code to use it.

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Run Liferay Server](#run-liferay-server)
- [Deployment](#deployment)
- [Add a Fragment Importing the Code](#add-fragment)
- [Refrences](#refrences)

---

## Prerequisites

- **Java 17+**
- **Liferay dxp-2025.q1.18-ltsS** (or compatible)
- **Blade CLI** v7.0.3+
- **Git**

---

# Installation

```bash
# 1. Clone the repo
git clone https://github.com/HazemKhader/custom-jquery-client-extension.git

# 2. Enter the workspace
cd custom-jquery-extension-workspace
```

# Run Liferay Server

- Start your Liferay instance

Or use blade to initialize the server

```bash
# From the workspace root
blade server init
blade server start
```

## Deployment

Build and deploy the Public Registration Element client-extension:

```bash
# From the workspace root
blade gw build
blade gw deploy
```

or by using

```
gradlew :custom-jquery-extension:build
gradlew :custom-jquery-extension:deploy
```

## Add a Fragment Importing the Code
1. On any site in your running Liferay instance, click Design → Fragments.
2. Click Add (Add icon) to add a new fragment set.
3. Enter `FS` as the name and click Save.
4. Click New to add a new fragment.
5. With Basic Fragment selected, click Next.
6. In the Add Fragment modal, enter `jQuery Counter` Text as the name and click Add.
7. On the fragment design screen, click into the HTML editor and add a paragraph (`<span>`) tag in the existing `div` and `span` with class "counter circle" and text 12345:

```
<div class="fragment_1">
  <span>
   <span class="counter circle">12345</span>
  </span>
</div> 
```
8. Click into the JavaScript editor and add this code to import from your client extension:

```
const jq = await import('jquery'); // dynamic import

// Call your custom function
jq.counter('.counter', { delay: 20, time: 1500 });

// You can still use jQuery normally
jq.default('.counter').css('color', 'blue');
```

9. Click into the CSS editor and add this code:

```
/* Root selector ensures styles apply only inside this fragment */
.fragment_1 {
	margin: 40px 100px 150px;
	font-family: 'Open Sans', sans-serif;
	text-align: center;
}

/* Smooth transitions for all elements inside this fragment */
.fragment_1 * {
	-webkit-transition: all 400ms ease;
	-moz-transition: all 400ms ease;
	-o-transition: all 400ms ease;
	transition: all 400ms ease;
	text-align: center;
	font-family: inherit;
}

/* Counter or text spans */
.fragment_1 span {
	font-size: 33px;
	color: #555;
	margin-bottom: 250px;
	display: inline-block;
	font-weight: 400;
	text-align: center;
}

.fragment_1 span > span {
	margin-bottom: 0;
}

/* Circle style element */
.fragment_1 .circle {
	background: #2980b9;
	width: 200px;
	line-height: 200px;
	display: inline-block;
	color: #fff;
	border-radius: 100%;
}

/* Responsive adjustments */
@media only screen and (max-width: 1024px) {
	.fragment_1 span {
		font-size: 22px;
		margin-bottom: 200px;
	}
}

@media only screen and (max-width: 800px) {
	.fragment_1 div > span {
		font-size: 33px;
		display: block;
		width: 100% !important;
		margin-bottom: 100px;
	}

	.fragment_1 span {
		font-size: 33px;
	}

	.fragment_1 code {
		margin-bottom: 100px;
	}
}
```

## Refrences: 
1. Liferay Documentation -> https://learn.liferay.com/w/dxp/development/customizing-liferays-look-and-feel/bundling-resources-in-a-javascript-import-map-entry-client-extension

2. Counter Up Demo -> https://ciromattia.github.io/jquery.counterup/demo/index.html