/**
 * The navigation tree. This is the only place navigators are declared; features
 * attach screens to them by id (see featureTypes.ts).
 *
 * - `type`: 'stack' or 'tab'.
 * - `initial` (stacks): name of the route opened first.
 * - `headerShown` (stacks): defaults to true.
 * - `mountedIn` + `as`: the navigator is a screen, named `as`, of the `mountedIn`
 *   navigator. Navigators without `mountedIn` are roots.
 *
 * Only the ids and `type` are read so far (they type the `navigator` field of
 * screens); the rest documents the intended structure.
 *
 * Tab order is not declared here: it comes from `tab.index` on each tab screen.
 */
export const navigators = {
  'preLogin.stack': {type: 'stack', initial: 'Login', headerShown: false},
  'postLogin.stack': {type: 'stack', initial: 'MainDashboard'},
  'mainDashboard.tabs': {
    type: 'tab',
    mountedIn: 'postLogin.stack',
    as: 'MainDashboard',
  },
  'secondaryDashboard.tabs': {
    type: 'tab',
    mountedIn: 'postLogin.stack',
    as: 'SecondaryDashboard',
  },
} as const;

export type NavigatorId = keyof typeof navigators;

type IdsOfType<T extends 'stack' | 'tab'> = {
  [K in NavigatorId]: (typeof navigators)[K]['type'] extends T ? K : never;
}[NavigatorId];

export type TabNavigatorId = IdsOfType<'tab'>;
export type StackNavigatorId = IdsOfType<'stack'>;
