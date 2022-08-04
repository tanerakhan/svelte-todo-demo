<script>
  let inputModel;
  let todosLocal = [];
  const todoModel = {
    add: null,
    remove: false,
    done: false,
  };

  const onKeyPress = (/** @type {{ charCode: number; }} */ e) => e.charCode === 13 && handleInput();
  $: duplicateTodo = () => todosLocal.find((key) => key.add === inputModel);

  const handleInput = () => {
    let isDuplicate = duplicateTodo();
    if (!inputModel) return;
    if (typeof isDuplicate === "object") return;

    todosLocal = [
      ...todosLocal,
      {
        ...todoModel,
        add: inputModel,
      },
    ];
  };

  const handleDone = (/** @type {number} */ i) => {
    todosLocal[i] = {
      ...todoModel,
      add: todosLocal[i].add,
      done: true,
    };
  };

  const handleNotDone = (/** @type {number} */ i) => {
    todosLocal[i] = {
      ...todoModel,
      add: todosLocal[i].add,
      done: false,
    };
    console.log('bug fix');
  };
  const handleRemove = (/** @type {number} */ i) => {
    todosLocal = [...todosLocal.slice(0, i), ...todosLocal.slice(i + 1)];
  };

  $: todos = todosLocal;
</script>

<div class="h-screen overflow-hidden flex items-center justify-center">
  <div class="h-100 w-full flex items-center justify-center font-sans">
    <div class="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
      <div class="mb-4">
        <h1 class="text-grey-darkest">Todo List</h1>
        <div class="flex mt-4">
          <input
            bind:value={inputModel}
            on:keypress={onKeyPress}
            type="text"
            class="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
            placeholder="Add Todo"
          />
          <button
            on:click={handleInput}
            class="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal"
            >Add
          </button>
        </div>
      </div>
      <div>
        {#each todos as todo, i}
          {#if !todo.done && !todo.remove}
            <div class="flex mb-4 items-center">
              <p class="w-full text-grey-darkest">{todo.add}</p>
              <button
                on:click={() => handleDone(i)}
                class="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green border-green hover:bg-green"
                >Done</button
              >
              <button
                on:click={() => handleRemove(i)}
                class="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red"
                >Remove</button
              >
            </div>
          {:else if todo.done && !todo.remove}
            <div class="flex mb-4 items-center">
              <p class="w-full line-through text-green">{todo.add}</p>
              <button
                on:click={() => handleNotDone(i)}
                class="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-grey border-grey hover:bg-grey"
                >Not Done</button
              >
              <button
                on:click={() => handleRemove(i)}
                class="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red"
                >Remove</button
              >
            </div>
          {:else if !todo.done && todo.remove}{/if}
        {/each}
      </div>
    </div>
  </div>
</div>
