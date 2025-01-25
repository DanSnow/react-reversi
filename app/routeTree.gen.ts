/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as XstateImport } from './routes/xstate'
import { Route as IndexImport } from './routes/index'

// Create/Update Routes

const XstateRoute = XstateImport.update({
  id: '/xstate',
  path: '/xstate',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/xstate': {
      id: '/xstate'
      path: '/xstate'
      fullPath: '/xstate'
      preLoaderRoute: typeof XstateImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/xstate': typeof XstateRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/xstate': typeof XstateRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/xstate': typeof XstateRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/xstate'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/xstate'
  id: '__root__' | '/' | '/xstate'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  XstateRoute: typeof XstateRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  XstateRoute: XstateRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/xstate"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/xstate": {
      "filePath": "xstate.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
