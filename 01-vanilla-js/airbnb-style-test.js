/**
 * Airbnb JavaScript Style Guide 위반 사항 테스트 파일
 *
 * 이 파일은 Airbnb Style Guide의 "bad" 예제들을 포함하여
 * ESLint가 제대로 에러를 감지하는지 확인합니다.
 *
 * 출처: https://github.com/airbnb/javascript
 *
 * 이 파일은 의도적으로 모든 규칙을 위반합니다.
 * ESLint가 제대로 작동하는지 확인하기 위한 테스트 파일입니다.
 */

// =============================================================================
// 2. References
// =============================================================================

// 2.1 - Prefer const (no-var)
// bad
var a = 1;
var b = 2;

// 2.2 - Disallow var (no-var)
// bad
var count = 1;
if (true) {
  count += 1;
}

// =============================================================================
// 3. Objects
// =============================================================================

// 3.1 - No new Object()
// bad
const item = new Object();

// 3.3 - Object method shorthand (object-shorthand)
// bad
const atom = {
  value: 1,
  addValue: function (value) {
    return atom.value + value;
  },
};

// 3.4 - Property value shorthand (object-shorthand)
// bad
const lukeSkywalker = 'Luke';
const obj = {
  lukeSkywalker: lukeSkywalker,
};

// 3.6 - Quote props (quote-props)
// bad
const bad = {
  'foo': 3,
  'bar': 4,
  'data-blah': 5,
};

// 3.8 - Prefer object spread (prefer-object-spread)
// very bad
const original = { a: 1, b: 2 };
const copy = Object.assign(original, { c: 3 });

// =============================================================================
// 4. Arrays
// =============================================================================

// 4.1 - Array literal syntax (no-array-constructor)
// bad
const items = new Array();

// 4.2 - Array.push() (no-array-constructor)
// bad
const someStack = [];
someStack[someStack.length] = 'abracadabra';

// 4.3 - Array spreads
// bad
const itemsCopy = [];
let i;
for (i = 0; i < items.length; i += 1) {
  itemsCopy[i] = items[i];
}

// 4.5 - Array-like conversion
// bad
const arrLike = { 0: 'a', 1: 'b', length: 2 };
const arr = Array.prototype.slice.call(arrLike);

// =============================================================================
// 6. Strings
// =============================================================================

// 6.1 - Use single quotes (quotes)
// bad
const name = "Bob Howell";

// 6.3 - Template literals (prefer-template)
// bad
const sayHi = (name) => {
  return 'How are you, ' + name + '?';
};

// =============================================================================
// 7. Functions
// =============================================================================

// 7.1 - Function declarations (func-style)
// bad
function foo() {
  // ...
}

// 7.10 - Never use arguments (prefer-rest-params)
// bad
function concatenateAll() {
  const args = Array.prototype.slice.call(arguments);
  return args.join('');
}

// =============================================================================
// 8. Arrow Functions
// =============================================================================

// 8.2 - Arrow body style (arrow-body-style)
// bad
const badArrow = () => {
  return 'value';
};

// 8.4 - Confusing arrow function syntax
// bad - missing parens around object
const badObject = () => {
  return { x: 1 };
};

// =============================================================================
// 9. Classes & Constructors
// =============================================================================

// 9.1 - Use class keyword (no-new-object)
// bad
function Queue(contents = []) {
  this.queue = [...contents];
}
Queue.prototype.pop = function () {
  const value = this.queue[0];
  this.queue.splice(0, 1);
  return value;
};

// =============================================================================
// 15. Comparison Operators & Equality
// =============================================================================

// 15.1 - Use === and !== (eqeqeq)
// bad
const testValue = 5;
if (testValue == '5') {
  console.log('bad');
}

// =============================================================================
// 16. Blocks
// =============================================================================

// 16.1 - Braces with control statements (curly)
// bad
if (testValue) console.log('no braces');

// bad
if (testValue)
  console.log('no braces');

// =============================================================================
// 13. Variables
// =============================================================================

// 13.2 - One const/let per declaration (one-var)
// bad
const itemsVar = getItems(),
      goSportsTeam = true,
      dragonball = 'z';

// 13.3 - Unused variables (no-unused-vars)
// bad
const unusedVar = 42;

// =============================================================================
// 20. Commas
// =============================================================================

// 20.2 - Trailing commas (comma-dangle) - actually GOOD in airbnb
// Note: Airbnb recommends trailing commas, so this is actually good
const withTrailingComma = {
  foo: 'bar',
  baz: 'qux',
};

// =============================================================================
// 21. Semicolons
// =============================================================================

// 21.1 - Semicolons required (semi)
// bad - 이건 prettier가 자동으로 고칠 것임
const x = 1
const y = 2

// =============================================================================
// 23. Naming Conventions
// =============================================================================

// 23.1 - Avoid single letter names (개념적 위반)
// bad
const q = () => {
  // ...
};

// 23.2 - Use camelCase (camelcase)
// bad
const this_is_bad = 'underscore';
const OBJEcttsssss = {};

// =============================================================================
// Export (required for module)
// =============================================================================

export default {
  a,
  b,
  item,
  atom,
  obj,
  bad,
  copy,
  items,
  itemsCopy,
  name,
  foo,
  concatenateAll,
  badArrow,
  badObject,
  Queue,
  withTrailingComma,
  x,
  y,
  q,
  this_is_bad,
  OBJEcttsssss,
};
