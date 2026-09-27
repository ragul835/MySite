import assert from "node:assert/strict";
import test from "node:test";
import { routes, routeOutputPath } from "../scripts/seo-config.mjs";

test("every SEO route has unique canonical output and complete metadata", () => {
  const paths = routes.map((route) => route.path);
  assert.equal(new Set(paths).size, paths.length);
  for (const route of routes) {
    assert.match(route.title, /We Raise Tech/);
    assert.ok(
      route.description.length >= 70,
      `${route.path} description is too short`,
    );
    assert.match(routeOutputPath(route.path), /\.html$/);
  }
});
