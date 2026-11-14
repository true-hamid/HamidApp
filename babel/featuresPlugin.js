/**
 * Babel plugin: inlines the feature list from features.json at build time.
 *
 * features.json:
 *   { "include": ["./src/features/home/feature"], "exclude": [] }
 *
 * - Every feature is listed explicitly by its path (relative to the project
 *   root, extension optional). Wildcards are rejected.
 * - A path that doesn't resolve to a file fails the build, in either list.
 * - A feature is bundled when it is in `include` and not in `exclude`.
 *   Order is irrelevant: tab order comes from `tab.index` in each manifest.
 *
 * Replaces the global identifier `__FEATURE_LOADERS__` with:
 *
 *   [{id: '<folder name>', load: () => require('<rel path>').default}, ...]
 *
 * - `id` is the name of the folder containing the feature file (`home` for
 *   `./src/features/home/feature`). It is the feature's i18n namespace. Two
 *   features with the same folder name fail the build.
 * - Each entry is a static `require` literal, so Metro bundles exactly the
 *   listed features.
 * - Each `require` sits inside a function, so evaluation is deferred until the
 *   loader is called (relies on Metro `inlineRequires`, the RN default).
 *
 * Note: Metro caches transforms per source file, so after editing
 * features.json restart Metro with `--reset-cache`.
 */
const fs = require('fs');
const path = require('path');

const MARKER = '__FEATURE_LOADERS__';
const EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx'];

function stripExt(file) {
  const ext = EXTENSIONS.find(e => file.endsWith(e));
  return ext ? file.slice(0, -ext.length) : file;
}

/** Resolves an explicit entry to an extension-less absolute module path. */
function resolveEntry(root, entry) {
  if (entry.includes('*')) {
    throw new Error(
      `features.json: wildcards are not allowed ("${entry}"); list each feature explicitly`,
    );
  }
  const base = path.resolve(root, entry);
  const found = [base, ...EXTENSIONS.map(ext => base + ext)].find(
    c => fs.existsSync(c) && fs.statSync(c).isFile(),
  );
  if (!found) {
    throw new Error(`features.json: cannot resolve "${entry}" (looked from ${root})`);
  }
  return stripExt(found);
}

function readConfig(configPath) {
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  for (const key of Object.keys(config)) {
    if (key !== 'include' && key !== 'exclude') {
      throw new Error(`features.json: unknown key "${key}"`);
    }
  }
  for (const key of ['include', 'exclude']) {
    const list = config[key] ?? [];
    if (!Array.isArray(list) || list.some(e => typeof e !== 'string')) {
      throw new Error(`features.json: "${key}" must be an array of path strings`);
    }
  }
  return {include: config.include ?? [], exclude: config.exclude ?? []};
}

function selectFeatures(root, {include, exclude}) {
  const excluded = new Set(exclude.map(entry => resolveEntry(root, entry)));
  const selected = [];
  include.forEach(entry => {
    const resolved = resolveEntry(root, entry);
    if (!excluded.has(resolved) && !selected.includes(resolved)) {
      selected.push(resolved);
    }
  });
  return selected;
}

module.exports = function featuresPlugin({types: t}, options) {
  const {root, configPath} = options;

  return {
    name: 'feature-loaders',
    visitor: {
      Identifier(nodePath, state) {
        if (
          nodePath.node.name !== MARKER ||
          nodePath.scope.hasBinding(MARKER) ||
          !nodePath.isReferencedIdentifier()
        ) {
          return;
        }

        const fromDir = path.dirname(state.filename);
        const ids = new Set();
        const loaders = selectFeatures(root, readConfig(configPath)).map(abs => {
          const id = path.basename(path.dirname(abs));
          if (ids.has(id)) {
            throw new Error(`features.json: two features share the id "${id}"`);
          }
          ids.add(id);
          let rel = path.relative(fromDir, abs).split(path.sep).join('/');
          if (!rel.startsWith('.')) {
            rel = './' + rel;
          }
          return t.objectExpression([
            t.objectProperty(t.identifier('id'), t.stringLiteral(id)),
            t.objectProperty(
              t.identifier('load'),
              t.arrowFunctionExpression(
                [],
                t.memberExpression(
                  t.callExpression(t.identifier('require'), [
                    t.stringLiteral(rel),
                  ]),
                  t.identifier('default'),
                ),
              ),
            ),
          ]);
        });

        nodePath.replaceWith(t.arrayExpression(loaders));
      },
    },
  };
};
