
const Todo = require('./todo');
const TodoList = require('./todolist');

describe('TodoList', () => {
  let todo1;
  let todo2;
  let todo3;
  let list;

  beforeEach(() => {
    todo1 = new Todo('Buy milk');
    todo2 = new Todo('Clean room');
    todo3 = new Todo('Go to the gym');

    list = new TodoList("Today's Todos");
    list.add(todo1);
    list.add(todo2);
    list.add(todo3);
  });

  // your tests go here
  test('todolist has a size of 3', () => {
    expect(list.size()).toBe(3);
  });

  test('calling toArray returns the list in array form', () => {
    expect(list.toArray()).toEqual([todo1, todo2, todo3]);
  });

  test('calling first returns the first todo object', () => {
    expect(list.first()).toEqual(todo1);
  });

  test('calling last returns the last todo object', () => {
    expect(list.last()).toEqual(todo3);
  });

  test('shift() removes and returns the first todo object in the list', () => {
    expect(list.shift()).toEqual(todo1);
    expect(list.toArray()).toEqual([todo2, todo3]); // Notice how we use toArray so we can compare the lists.
  });

  test('pop() removes and returns the todo object in the list', () => {
    expect(list.pop()).toEqual(todo3);
    expect(list.toArray()).toEqual([todo1, todo2]);
  });

  test('isDone() returns false if not all todos are done', () => {
    expect(list.isDone()).toBe(false);
  });

  test(`TypeError occurs when add non-Todo object to list`, () => {
    expect(() => list.add(1)).toThrow(TypeError);
    expect(() => list.add('hi')).toThrow(TypeError);
    expect(() => list.add({})).toThrow(TypeError);
  });

  test('itemAt() returns the item at given index', () => {
    expect(list.itemAt(0)).toEqual(todo1);
    expect(list.itemAt(1)).toEqual(todo2);
    expect(list.itemAt(2)).toEqual(todo3);
    expect(() => list.itemAt(3)).toThrow(ReferenceError);
  });

  test('markDoneAt() marks todo at given index as done', () => {
    expect(() => list.markDoneAt(3)).toThrow(ReferenceError);

    list.markDoneAt(0);
    expect(todo1.isDone()).toBe(true);
    expect(todo2.isDone()).toBe(false);
    expect(todo3.isDone()).toBe(false);
  });

  test('markUndoneAt() marks todo at given index as undone', () => {
    expect(() => list.markUndoneAt(3)).toThrow(ReferenceError);

    list.markDoneAt(0);
    list.markDoneAt(1);
    list.markDoneAt(2);

    list.markUndoneAt(0);

    expect(todo1.isDone()).toBe(false);
    expect(todo2.isDone()).toBe(true);
    expect(todo3.isDone()).toBe(true);
  });

  test('markAllDone() marks all todos as done in list', () => {
    list.markAllDone();
    expect(list.isDone()).toBe(true);
  });

  test('markAllUndone() marks all todos as undone in list', () => {
    list.markAllUndone();
    expect(list.isDone()).toBe(false);
  });

  test('removeAt() removes todo at given index ' +
  'and returns array of deleted elements', () => {
    expect(() => list.removeAt(3)).toThrow(ReferenceError);

    expect(list.removeAt(0)).toEqual([todo1]);
    expect(list.toArray()).toEqual([todo2, todo3]);
  });

  test('toString returns string representation of the list', () => {
    let string = `---- Today's Todos ----
[ ] Buy milk
[ ] Clean room
[ ] Go to the gym`;

    expect(list.toString()).toBe(string);
  });

  test('correct string when one todo is done', () => {
    list.markDoneAt(0);

    let string = `---- Today's Todos ----
[X] Buy milk
[ ] Clean room
[ ] Go to the gym`;
    expect(list.toString()).toBe(string);
  });

  test('correct string when all todos are done', () => {
    list.markAllDone();

    let string = `---- Today's Todos ----
[X] Buy milk
[X] Clean room
[X] Go to the gym`;

    expect(list.toString()).toBe(string);
  });

  test('forEach(callback) iterates over all elements in list', () => {
    list.forEach(todo => todo.markDone());
    expect(list.isDone()).toBe(true);
  });

  test('filter returns new TodoList object with filtered todos', () => {
    todo1.markDone();
    todo3.markDone();
    let newList = list.filter(todo => todo.isDone());
    expect(newList.toArray()).toEqual([todo1, todo3]);
  });

  test(`findByTitle(title) returns the first todo object of new 
        list of todos with specific title`, () => {
    expect(list.findByTitle('Clean room')).toEqual(todo2);
  });

  test('allDone() filters todos that are done and returns new list', () => {
    todo1.markDone();
    todo3.markDone();
    expect(list.allDone()).toEqual({title: "Today's Todos", "todos": [todo1, todo3]});
  });

  test(`allNotDone filters todos that aren't done
        and returns new list`, () => {
    todo1.markDone();
    todo3.markDone();
    expect(list.allNotDone()).toEqual({title: "Today's Todos", "todos": [todo2]});
  });


  test('markDone(title) marks todo with title as done', () => {
    list.markDone('Buy milk');
    list.markDone('Clean room');
    list.markDone('Go to the gym');
    list.markDone('HEY YOU');
    expect(list.isDone()).toBe(true);
  });
});