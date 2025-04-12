# Ollama Browser extension

A Browser extension that allows you to interact with Ollama's AI models directly from your browser. Built with Plasmo and TypeScript, this extension provides a seamless interface for sending prompts to locally running Ollama models and displaying their responses.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
    - [Setting Up Ollama](#setting-up-ollama)
    - [Setting Up the Extension](#setting-up-the-extension)
- [Development](#development)
    - [Project Structure](#project-structure)
    - [Available Commands](#available-commands)
- [Usage](#usage)
- [Why Plasmo](#why-plasmo)
- [Cross-Browser Compatibility](#cross-browser-compatibility)
- [Deployment](#deployment)
    - [Building for Production](#building-for-production)
    - [Publishing to Chrome Web Store](#publishing-to-chrome-web-store)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)


## Overview

Ollama Chrome Assistant is a browser extension that bridges the gap between your browser and locally running Ollama AI models. It provides a simple interface to send prompts to Ollama and display the responses, all without leaving your browser.

## Features

- Clean, intuitive user interface
- Direct integration with locally running Ollama models
- Support for various Ollama models (Llama, Mistral, etc.)
- Real-time streaming responses
- Lightweight and fast performance


## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/), [yarn](https://yarnpkg.com/), or [pnpm](https://pnpm.io/)
- [Ollama](https://ollama.com/) installed on your machine
- Google Chrome browser


## Installation

### Setting Up Ollama

1. Download and install Ollama from the [official website](https://ollama.com/).
2. Pull a model of your choice:

```bash
ollama pull llama3
```

3. **IMPORTANT**: Ollama requires explicit permission to accept requests from Chrome extensions. Start Ollama with the following command:

```bash
OLLAMA_ORIGINS=chrome-extension://* ollama serve
```

> **Note**: On macOS, you may need to set this environment variable permanently:
> ```bash &gt; launchctl setenv OLLAMA_ORIGINS "chrome-extension://*" &gt; ```
> Then restart the Ollama application.

### Setting Up the Extension

1. Clone this repository:

```bash
git clone https://github.com/yourusername/ollama-chrome-assistant.git
cd ollama-chrome-assistant
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Load the extension in Chrome:
    - Navigate to `chrome://extensions/`
    - Enable "Developer mode" (toggle in the top right)
    - Click "Load unpacked" and select the `build/chrome-mv3-dev` directory from your project

## Development

### Project Structure

```
ollama-chrome-assistant/
├── package.json
├── tsconfig.json
├── .gitignore
├── src/
│   ├── popup/
│   │   ├── index.tsx             # Main popup UI
│   │   └── style.css             # Popup UI's designs
│   ├── background.ts             # Background script for API calls
│   ├── components/
│   │   ├── InputForm.tsx         # Input form component
│   │   ├── ResponseDisplay.tsx   # Component to display Ollama's response
│   │   └── LoadingIndicator.tsx  # Loading state component
│   ├── hooks/
│   │   └── useOllama.ts          # Custom hook for Ollama API
│   ├── utils/
│   │   └── api.ts                # API utility functions
│   └── assets/
│       └── icon.png              # Extension icon
└── assets/
    └── icon.png                  # Extension icon (copied to build)
```


### Available Commands

- `npm run dev` - Start the development server with hot reloading
- `npm run build` - Build the extension for production
- `npm run package` - Package the extension for distribution


## Usage

1. Click on the extension icon in your Chrome toolbar
2. Enter your prompt in the text area
3. Click "Generate Response" or press Enter
4. View the response from Ollama


## Why Plasmo

Plasmo is an excellent choice for developing browser extensions for several compelling reasons:

### Streamlined Development Experience

Plasmo significantly reduces the complexity of browser extension development by providing:

- **Zero-config TypeScript support**: Write type-safe code without the hassle of complex configuration files.
- **Declarative Development**: Just write a file, export a component, and Plasmo handles the bundling and mounting automatically.
- **File-based Routing**: Similar to Next.js, Plasmo uses an intuitive file-based routing system for extension components.


### Enhanced Developer Productivity

Plasmo includes features that make development faster and more efficient:

- **Live Reloading \& HMR**: See your changes instantly with framework-native hot module replacement, eliminating the need to manually refresh your extension.
- **Built-in Storage and Messaging Libraries**: Simplifies state management and communication between different parts of your extension.
- **Environment Variable Support**: Built-in support for .env files makes configuration management straightforward.


### React-First Approach

For React developers, Plasmo offers a familiar and comfortable development experience:

- **First-class React Support**: Seamless integration with the React ecosystem.
- **Component-Based Architecture**: Build your extension using reusable, modular components.
- **Style Leakage Prevention**: Automatically creates a shadow DOM to prevent styles from leaking between your extension and web pages.


### Modern Development Stack

Plasmo embraces modern web development practices:

- **TypeScript Integration**: Comprehensive TypeScript support for better code quality and developer experience.
- **Built-in Authentication**: Simplified OAuth and authentication flows, which are often complex in extension development.
- **Modern JavaScript Features**: Full support for the latest JavaScript features and syntax.


## Cross-Browser Compatibility

While this extension is initially built for Chrome, Plasmo makes it straightforward to target multiple browsers with minimal changes. Here's how to adapt this extension for other browsers:

### Firefox Compatibility

To make your extension work in Firefox:

1. **Update the manifest.json**: Firefox uses a slightly different manifest format. Plasmo can handle this automatically with the right configuration:

```javascript
// plasmo.config.ts
import { type PlasmoConfig } from "plasmo"

export const config: PlasmoConfig = {
  browsers: ["chrome", "firefox"]
}
```

2. **API Namespace Considerations**: Firefox uses the `browser.*` namespace instead of Chrome's `chrome.*` namespace. The WebExtension browser API Polyfill can help bridge this gap:

```bash
npm install webextension-polyfill
# or
yarn add webextension-polyfill
```

Then import it in your background scripts and content scripts:

```typescript
import browser from "webextension-polyfill"
```

3. **Asynchronous API Handling**: Firefox uses Promises for asynchronous APIs, while Chrome traditionally uses callbacks. The polyfill mentioned above helps normalize this behavior.

### Microsoft Edge Compatibility

Since Edge is now Chromium-based, most Chrome extensions work with minimal changes:

1. **Update the Plasmo config**:

```javascript
// plasmo.config.ts
import { type PlasmoConfig } from "plasmo"

export const config: PlasmoConfig = {
  browsers: ["chrome", "firefox", "edge"]
}
```

2. **Edge-specific Manifest Keys**: Some manifest keys may be specific to Edge. Plasmo can handle these differences automatically.

### Safari Compatibility

Safari support requires additional considerations:

1. **Safari Web Extension Converter**: After building your extension, you can use Apple's Safari Web Extension Converter to convert it for Safari.
2. **Safari-specific APIs**: Safari may have different API implementations or limitations. Test thoroughly after conversion.

### Building for Multiple Browsers

To build your extension for multiple browsers at once:

```bash
plasmo build --target=chrome,firefox,edge
```

This will generate separate builds for each browser in the `build` directory.

## Deployment

### Building for Production

To create a production build of your extension:

```bash
npm run build
# or
yarn build
# or
pnpm build
```

This will generate a production-ready build in the `build/chrome-mv3-prod` directory.

### Publishing to Chrome Web Store

1. Create a ZIP file of your production build:

```bash
npm run package
# or
yarn package
# or
pnpm package
```

2. Create a developer account on the [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole/)
3. Pay the one-time developer registration fee (if you haven't already)
4. Click "New Item" and upload your ZIP file
5. Fill out the required information:
    - Description
    - Screenshots
    - Icon
    - Category
    - Privacy policy
6. Submit your extension for review

The review process typically takes a few business days. Once approved, your extension will be published to the Chrome Web Store.

## Troubleshooting

### Common Issues

- **403 Forbidden Error**: Make sure Ollama is running with the correct CORS settings:

```bash
OLLAMA_ORIGINS=chrome-extension://* ollama serve
```

- **Connection Refused**: Ensure Ollama is running and accessible at `http://localhost:11434`
- **Model Not Found**: Make sure you've pulled the model you're trying to use:

```bash
ollama pull llama3
```


## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Built with [Plasmo Framework](https://docs.plasmo.com/framework) and [Ollama](https://ollama.com/).

<div>⁂</div>

[^1]: https://docs.plasmo.com/framework

[^2]: https://github.com/GoogleChrome/chrome-extensions-samples/blob/main/README-template.md

[^3]: https://www.cohorte.co/blog/ollama-advanced-use-cases-and-integrations

[^4]: https://www.reddit.com/r/ollama/comments/1ig2g1f/permissions_for_ollama_and_chrome_extensions/

[^5]: https://help.obsidian.md/web-clipper/interpreter

[^6]: https://atlassc.net/2025/01/15/configuring-your-ollama-server

[^7]: https://cloud.google.com/blog/products/chrome-enterprise/publishing-extensions-for-the-enterprise

[^8]: https://circleci.com/blog/continuously-deploy-a-chrome-extension/

[^9]: https://github.com/ollama/ollama/blob/main/docs/faq.md

[^10]: https://developer.chrome.com/docs/webstore

[^11]: https://www.scoutapm.com/blog/integrating-ollama-with-a-ruby-on-rails-application

[^12]: https://github.com/nado1001/plasmo-example

[^13]: https://www.npmjs.com/package/@bingobangobotto/cra-template-chrome-extension

[^14]: https://github.com/ollama/ollama/blob/main/README.md

[^15]: https://github.com/PlasmoHQ/examples

[^16]: https://developer.chrome.com/docs/extensions/samples

[^17]: https://www.reddit.com/r/LocalLLaMA/comments/1fupey2/autoreadme_automatic_readme_generation_with_ai/

[^18]: https://news.ycombinator.com/item?id=41304508

[^19]: https://www.makeareadme.com

[^20]: https://gitlab.informatik.uni-halle.de/ambcj/ollama/-/blob/1b21a22d0efe4fe31ccbbab7201482d59ca56396/README.md

[^21]: https://dev.to/ky6yk/create-a-chrome-extension-with-react-fw-plasmo-4adf

[^22]: https://developer.chrome.com/docs/extensions/get-started

[^23]: https://github.com/jmorganca/ollama/issues/1686

[^24]: https://stackoverflow.com/questions/77911717/issue-with-calling-a-local-ollama-api-from-chrome-extension

[^25]: https://docs.pixiebrix.com/integrations/ollama

[^26]: https://github.com/ollama/ollama/issues/6389

[^27]: https://geshan.com.np/blog/2025/02/ollama-commands/

[^28]: https://harpa.ai/guides/connecting-harpa-ollama-local-llms

[^29]: https://community.wolfram.com/groups/-/m/t/3201543

[^30]: https://www.youtube.com/watch?v=bnzLoIHBnu0

[^31]: https://news.ycombinator.com/item?id=39132766

[^32]: https://gptforwork.com/help/ai-models/ollama/ollama-setup-windows

[^33]: https://chromewebstore.google.com/detail/chatty-for-llms/mnecjkcdjdkgiklbmeodicgdfladfdan

[^34]: https://www.reddit.com/r/ollama/comments/1c4zg15/does_anyone_know_how_to_change_where_your_models/

[^35]: https://developer.chrome.com/docs/extensions/how-to/distribute

[^36]: https://developer.chrome.com/docs/webstore/publish

[^37]: https://support.google.com/chrome/a/answer/6306504

[^38]: https://www.youtube.com/watch?v=XBZ3Hhx-tS8

[^39]: https://www.freecodecamp.org/news/how-to-publish-your-chrome-extension-dd8400a3d53/

[^40]: https://developer.chrome.com/docs/extensions/develop

[^41]: https://support.google.com/chrome/thread/245005115/how-to-upload-an-extension-on-chrome-extension-store

[^42]: https://help.pdq.com/hc/en-us/community/posts/211678787-Deploying-a-chrome-extension

[^43]: https://support.google.com/chrome/a/answer/2714278

[^44]: https://www.youtube.com/watch?v=Nh-wQVBvoD4

[^45]: https://pushsecurity.com/blog/guide-to-secure-browser-extension-deployment/

[^46]: https://www.youtube.com/watch?v=suDy5SNbXsI

[^47]: https://github.com/stylesuxx/google-chrome-extension-template/blob/master/README.md

[^48]: https://www.linkedin.com/posts/copin43_github-soyuz43generate-readme-activity-7185302844701347840-ZJ7y

[^49]: https://www.youtube.com/watch?v=Fa2nFDw-dBw

[^50]: https://www.reddit.com/r/chrome_extensions/comments/1fl7n2x/a_starter_template_for_creating_chrome_extensions/

[^51]: https://github.com/ollama/ollama/issues/2335

[^52]: https://www.restack.io/p/ollama-answer-environment-variables-cat-ai

[^53]: https://github.com/ollama/ollama/issues/2308

[^54]: https://translucentcomputing.github.io/kubert-assistant-lite/ollama.html

[^55]: https://www.ssl2buy.com/wiki/how-to-manually-install-a-chrome-extension-in-2-ways

[^56]: https://github.com/marketplace/actions/publish-chrome-extension-to-chrome-web-store

[^57]: https://stackoverflow.com/questions/15197415/chrome-extension-deployment

[^58]: https://support.cyberfox.com/115002348447-Getting-Started/360024746531-Deploying-the-browser-extension-with-Group-Policy

[^59]: https://services.google.com/fh/files/misc/chrome-browser-deployment-guide.pdf

