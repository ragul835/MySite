# Graph Report - .  (2026-09-27)

## Corpus Check
- 114 files · ~198,079 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 650 nodes · 889 edges · 64 communities (34 shown, 30 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 3 edges (avg confidence: 0.6)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Community 0
- Community 1
- Community 2
- Community 3
- Community 4
- Community 5
- Community 6
- Community 7
- Community 8
- Community 9
- Community 10
- Community 11
- Community 12
- Community 13
- Community 14
- Community 15
- Community 16
- Community 17
- Community 18
- Community 19
- Community 20
- Community 21
- Community 22
- Community 23
- Community 24
- Community 25
- Community 26
- Community 27
- Community 28
- Community 29
- Community 30
- Community 32
- Community 33
- Community 34
- Community 35
- Community 36
- Community 37
- Community 38
- Community 39
- Community 40
- Community 41
- Community 42
- Community 43
- Community 44
- Community 45
- Community 46
- Community 47
- Community 48
- Community 49
- Community 50
- Community 51
- Community 52
- Community 53
- Community 54
- Community 55
- Community 56
- Community 57
- Community 58
- Community 60

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 22 edges
2. `useDocumentTitle()` - 21 edges
3. `cn()` - 20 edges
4. `Container()` - 15 edges
5. `GradientButton()` - 12 edges
6. `customFetch()` - 11 edges
7. `compilerOptions` - 9 edges
8. `SectionHeader()` - 8 edges
9. `parseErrorBody()` - 8 edges
10. `scripts` - 7 edges

## Surprising Connections (you probably didn't know these)
- `AboutPage()` --calls--> `useDocumentTitle()`  [EXTRACTED]
  artifacts/agency-site/src/pages/about.tsx → artifacts/agency-site/src/hooks/useDocumentTitle.ts
- `BlogPage()` --calls--> `useDocumentTitle()`  [EXTRACTED]
  artifacts/agency-site/src/pages/blog.tsx → artifacts/agency-site/src/hooks/useDocumentTitle.ts
- `ServicesPage()` --calls--> `useDocumentTitle()`  [EXTRACTED]
  artifacts/agency-site/src/pages/services.tsx → artifacts/agency-site/src/hooks/useDocumentTitle.ts
- `RouteLogger()` --calls--> `trackPageView()`  [EXTRACTED]
  artifacts/agency-site/src/App.tsx → artifacts/agency-site/src/lib/analytics.ts
- `Container()` --calls--> `cn()`  [EXTRACTED]
  artifacts/agency-site/src/components/layout/Container.tsx → artifacts/agency-site/src/lib/utils.ts

## Import Cycles
- None detected.

## Communities (64 total, 30 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.07
Nodes (36): app, origin(), origins, allowedOrigins(), trustProxyHops(), validateRuntimeConfig(), port, server (+28 more)

### Community 1 - "Community 1"
Cohesion: 0.08
Nodes (41): ApiError, applyBaseUrl(), AuthTokenGetter, BodyType, buildErrorMessage(), customFetch(), CustomFetchOptions, ErrorType (+33 more)

### Community 2 - "Community 2"
Cohesion: 0.07
Nodes (32): AboutPage, App(), BlogPage, BlogPostPage, ContactPage, HomePage, NotFound, PrivacyPage (+24 more)

### Community 3 - "Community 3"
Cohesion: 0.14
Nodes (19): Container(), ContainerProps, Props, State, GradientButton(), GradientButtonProps, useDocumentTitle(), BlogPostPage() (+11 more)

### Community 4 - "Community 4"
Cohesion: 0.07
Nodes (27): devDependencies, esbuild, esbuild-plugin-pino, pino-pretty, thread-stream, @types/cookie-parser, @types/cors, @types/express (+19 more)

### Community 5 - "Community 5"
Cohesion: 0.07
Nodes (27): drizzle-kit, drizzle-zod, dependencies, drizzle-orm, drizzle-zod, pg, zod, devDependencies (+19 more)

### Community 6 - "Community 6"
Cohesion: 0.09
Nodes (13): TabsContent, TabsList, TabsTrigger, faqCategories, faqData, FAQItem, mobileMetrics, mobileProofPoints (+5 more)

### Community 7 - "Community 7"
Cohesion: 0.08
Nodes (24): workspace, compilerOptions, alwaysStrict, customConditions, isolatedModules, lib, module, moduleResolution (+16 more)

### Community 8 - "Community 8"
Cohesion: 0.11
Nodes (17): Input, Label, labelVariants, SelectContent, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton (+9 more)

### Community 9 - "Community 9"
Cohesion: 0.08
Nodes (23): compilerOptions, allowImportingTsExtensions, jsx, lib, moduleResolution, noEmit, paths, resolveJsonModule (+15 more)

### Community 10 - "Community 10"
Cohesion: 0.14
Nodes (17): MOBILE_COMPANY_LINKS, MOBILE_SERVICES, NAV_LINKS, Navbar(), Button, ButtonProps, buttonVariants, SheetContent (+9 more)

### Community 11 - "Community 11"
Cohesion: 0.14
Nodes (16): AnimatedItem(), AnimateOnScroll(), AnimateOnScrollProps, containerVariants, itemVariants, SectionHeader(), SectionHeaderProps, AboutPage() (+8 more)

### Community 12 - "Community 12"
Cohesion: 0.10
Nodes (21): dependencies, cookie-parser, cors, drizzle-orm, express, express-rate-limit, helmet, pino (+13 more)

### Community 13 - "Community 13"
Cohesion: 0.12
Nodes (16): aliases, components, hooks, lib, ui, utils, rsc, $schema (+8 more)

### Community 14 - "Community 14"
Cohesion: 0.21
Nodes (12): dist, escapeHtml(), render(), replaceMeta(), articles, DEFAULT_IMAGE, routeOutputPath(), routes (+4 more)

### Community 15 - "Community 15"
Cohesion: 0.12
Nodes (16): devDependencies, prettier, typescript, license, name, private, scripts, build (+8 more)

### Community 16 - "Community 16"
Cohesion: 0.14
Nodes (13): compilerOptions, composite, declarationMap, emitDeclarationOnly, lib, outDir, rootDir, extends (+5 more)

### Community 17 - "Community 17"
Cohesion: 0.15
Nodes (12): compilerOptions, composite, declarationMap, emitDeclarationOnly, outDir, rootDir, types, extends (+4 more)

### Community 18 - "Community 18"
Cohesion: 0.15
Nodes (12): devDependencies, tsx, @types/node, @types/node, name, private, scripts, hello (+4 more)

### Community 19 - "Community 19"
Cohesion: 0.17
Nodes (11): name, private, scripts, build, dev, seo:validate, serve, test (+3 more)

### Community 20 - "Community 20"
Cohesion: 0.17
Nodes (11): dependencies, @tanstack/react-query, exports, react, name, peerDependencies, react, private (+3 more)

### Community 21 - "Community 21"
Cohesion: 0.18
Nodes (10): compilerOptions, outDir, rootDir, types, extends, include, node, src (+2 more)

### Community 22 - "Community 22"
Cohesion: 0.18
Nodes (10): compilerOptions, composite, declarationMap, emitDeclarationOnly, outDir, rootDir, extends, include (+2 more)

### Community 23 - "Community 23"
Cohesion: 0.20
Nodes (9): compilerOptions, outDir, rootDir, types, extends, include, node, src (+1 more)

### Community 24 - "Community 24"
Cohesion: 0.22
Nodes (9): devDependencies, class-variance-authority, clsx, react, react-icons, react, class-variance-authority, clsx (+1 more)

### Community 25 - "Community 25"
Cohesion: 0.22
Nodes (8): devDependencies, orval, name, private, scripts, codegen, version, orval

### Community 26 - "Community 26"
Cohesion: 0.22
Nodes (8): dependencies, zod, exports, zod, name, private, type, version

### Community 27 - "Community 27"
Cohesion: 0.33
Nodes (5): compileOnSave, extends, files, ./tsconfig.base.json, references

### Community 28 - "Community 28"
Cohesion: 0.40
Nodes (3): apiClientReactSrc, apiZodSrc, root

## Knowledge Gaps
- **316 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+311 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **30 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `Community 24` to `Community 19`, `Community 32`, `Community 33`, `Community 34`, `Community 35`, `Community 36`, `Community 37`, `Community 38`, `Community 39`, `Community 40`, `Community 41`, `Community 42`, `Community 43`, `Community 44`, `Community 45`, `Community 46`, `Community 47`, `Community 48`, `Community 49`, `Community 50`, `Community 51`, `Community 52`, `Community 53`, `Community 54`, `Community 55`, `Community 56`, `Community 57`, `Community 58`?**
  _High betweenness centrality (0.012) - this node is a cross-community bridge._
- **Why does `cn()` connect `Community 10` to `Community 11`, `Community 8`, `Community 3`, `Community 6`?**
  _High betweenness centrality (0.007) - this node is a cross-community bridge._
- **Why does `Container()` connect `Community 3` to `Community 2`, `Community 6`, `Community 8`, `Community 10`, `Community 11`?**
  _High betweenness centrality (0.006) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _316 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.06704260651629072 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.08140610545790934 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.06765327695560254 - nodes in this community are weakly interconnected._