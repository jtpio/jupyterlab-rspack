# JupyterLab Rspack

[![npm](https://img.shields.io/npm/v/jupyterlab-rspack.svg)](https://www.npmjs.com/package/jupyterlab-rspack)

> [!WARNING]
> This is still a work in progress

Build JupyterLab extensions with Rspack (Rust powered Webpack).

https://github.com/jtpio/jupyterlab-rspack-tmp/assets/591645/61f3619f-03b4-4c4b-aaad-9fbe7762d825

## Install

With `npm`:

```bash
npm i --save-dev jupyterlab-rspack
```

With `pnpm`:

```bash
pnpm i --save-dev jupyterlab-rspack
```

With `yarn`:

```bash
yarn add --dev jupyterlab-rspack
```

## Usage

If you created your extension from the JupyterLab extension template (https://github.com/jupyterlab/extension-template), replace the `jupyter labextension build` command with `jupyterlab-rspack`.

You will need JupyterLab to be installed. We recommend creating a new virtual environment and installing JupyterLab with `pip` or `conda`. `jupyterlab-rspack` will look for JupyterLab to be installed in the environment, to properly populate the list of `shared` modules when building the extension.

> [!WARNING]
> Some features might still be missing, please check the list of open issues to know more

## Context

`rspack` is a Rust powered alternative to Webpack. It also supports Module Federation, which is used by the JupyterLab extension system.

This means it is possible to use `rspack` for building extensions, while JupyterLab still uses `webpack` internally.

For reference the switch to `rspack` is also being discussed in this issue: https://github.com/jupyterlab/jupyterlab/issues/15035

## Future work

This package was created to more easily test building third-party extensions with Rspack, without having to change the existing JupyterLab build system.

In the coming weeks, we will be looking into integrating this in JupyterLab core directly, so building with Rspack becomes the default.
